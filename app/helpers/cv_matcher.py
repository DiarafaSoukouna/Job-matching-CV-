import os
from sentence_transformers import SentenceTransformer, util
from transformers import pipeline
from PyPDF2 import PdfReader

# Initialisation du modèle de transformation BERT
cv_model = SentenceTransformer("BAAI/bge-large-en-v1.5")
ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", grouped_entities=True)

# Fonction d'extraction de texte depuis un fichier PDF
def extract_text_from_pdf(file_path: str) -> str:
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Le fichier {file_path} n'existe pas.")
    
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text.strip()
    except Exception as e:
        raise RuntimeError(f"Erreur lors de l'extraction du texte depuis le PDF: {str(e)}")

# Fonction de matching entre un CV et une description de poste
def match_cv_to_job(cv_file_path: str, job_description: str) -> float:
    job_embedding = cv_model.encode(job_description, convert_to_tensor=True)
    cv_text = extract_text_from_pdf(cv_file_path)
    cv_embedding = cv_model.encode(cv_text, convert_to_tensor=True)
    similarity_score = util.pytorch_cos_sim(job_embedding, cv_embedding).item()
    return round(similarity_score * 100, 2)

# Fonction pour extraire les entités nommées (mots-clés)
def extract_named_entities(text: str):
    entities = ner_pipeline(text)
    keywords = [
        ent["word"].replace("##", "").strip()
        for ent in entities
        if ent["entity_group"] in ["ORG", "MISC"]
    ]
    return sorted(set(keywords))
