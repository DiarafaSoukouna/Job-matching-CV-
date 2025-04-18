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

- SQLModel documentation : ```https://sqlmodel.tiangolo.com```

- Model validators documentation : ```https://docs.pydantic.dev/latest/concepts/validators```

- Installer les dépendances : ```pip install -r requirements.txt```

- Lancer le projet : ```fastapi dev app/main.py```

- API docs :

    - http://127.0.0.1:8000/docs

    - http://127.0.0.1:8000/redoc

- Mise à jour les migrations de la base de données :

    - Voir les docs :

        - ```https://medium.com/@sachinwuds/how-to-add-new-field-and-migrate-it-in-fastapi-c6575116b6f7```

        - ```https://stackoverflow.com/questions/68932099/how-to-get-alembic-to-recognise-sqlmodel-database-model```

        - ```https://alembic.sqlalchemy.org/en/latest/tutorial.html```

    - ```pip install alembic```

    - ```alembic init alembic```

    - Modifier le fichier ```alembic.ini``` pour ajouter la base de données :

        - ```sqlalchemy.url = sqlite:///./database.db```
    
    - Maintenant, mettez à jour le fichier ``env.py`` dans le dossier ``alembic`` pour inclure les métadonnées du modèle:

        - ```from models import Job```

        - ```target_metadata = Job.metadata```

    - ```alembic revision --autogenerate -m "message"```

    - ```alembic upgrade head```

## Déployer FastAPI sur Docker

- Voir la documentation : ```https://fastapi.tiangolo.com/deployment/docker```

- Créer l'image : ```docker build -t <image_name> .```

    - Ex: ```docker build -t test-fastapi .```

- Lancer le conteneur : ```docker run -d -p 8000:80 <image_name>```

    - Ex: ```docker run -d -p 8000:80 test-fastapi```

- Pusher l'image sur Docker Hub :

    - ```docker tag <image_name> <dockerhub_username>/<image_name>:<tag>```

    - ```docker push <dockerhub_username>/<image_name>:<tag>```

    - Ex:
        - ```docker tag test-fastapi:latest tiemoko/test-fastapi:latest```
        
        - ```docker push tiemoko/test-fastapi:latest```