# API


## Créer et utiliser des environnements virtuels

- Voir la documentation :

    - https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#create-and-use-virtual-environments

    - https://fastapi.tiangolo.com/virtual-environments/#activate-the-virtual-environment

- Créer python env : ```python -m venv .venv```

- Accès à l'environnement python :
    - Windows : ```.venv/Scripts/activate``` ou ```.venv\Scripts\activate```

    - Unix/macOS : ```source .venv/bin/activate```

## Configurer le projet

- Voir la documentation : ```https://fastapi.tiangolo.com```

- Installer les dépendances : ```pip install -r requirements.txt```

- Lancer le projet : ```fastapi dev main.py```

- API docs :

    - http://127.0.0.1:8000/docs

    - http://127.0.0.1:8000/redoc