# 3050 Wetterdaten App - Ausführung über http://localhost:5173/

## Voraussetzungen

- [Node.js](https://nodejs.org/en/download/) sollte installiert sein (Version: siehe `.nvmrc`).
  Wenn du `nvm` verwendest, kannst du die richtige Version mit folgendem Befehl installieren:

  ```bash
  nvm install
  ```

  Danach setze die Version (node v23.0.0 (npm v10.9.0)) mit:

  ```bash
  nvm use
  ```

## Schritte zur Installation:

1. Klone das Repository:
   ```bash
   git clone https://github.com/naethu/3050_wetterdaten-app.git
   ```
2. Gehe in den Backend-Ordner im Projektordner:
   ```bash
   cd 3050_wetterdaten-app/backend
   ```
3. Aktiviere die virtuelle Umgebung:
   ```bash
   source venv/bin/activate  # macOS/Linux
   # oder
   venv\Scripts\activate     # Windows
   # falls Anaconda benutzt wird kannst du die base deaktivieren mit:
   conda deactivate
   ```
4. Installiere die Abhängigkeiten:
   ```bash
   pip install -r requirements.txt
   ```
5. Gehe in den Frontend-Ordner im Projektordner:
   ```bash
   cd ../frontend
   ```
6. Installiere die npm-Abhängigkeiten:
    ```bash
   yarn
   ```

## Anwendung starten

  Für das Backend mit Uvicorn:

  ```bash
  cd ../backend
  uvicorn main:app --reload
  ```

  Für das Frontend (neues Terminal öffnen):

  ```bash
  cd frontend
  yarn start
  ```