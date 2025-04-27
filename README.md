# Symulator Połączenia iPhone - Negro Garca

Prosta aplikacja internetowa symulująca próbę połączenia telefonicznego z Negro Garca na iPhone.

## Instalacja

1. Upewnij się, że masz zainstalowany Node.js w systemie
2. Sklonuj to repozytorium
3. Zainstaluj zależności:
```bash
npm install
```

## Uruchamianie Aplikacji

Aby uruchomić w trybie deweloperskim z automatycznym przeładowywaniem:
```bash
npm run dev
```

Aby uruchomić w trybie produkcyjnym:
```bash
npm start
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

## Konfiguracja

Możesz modyfikować ustawienia w pliku `config/config.env`:
- PORT: Numer portu, na którym działa serwer
- NODE_ENV: Środowisko (development/production)
- CALLER_NAME: Imię i nazwisko osoby, do której dzwonimy
- PHONE_MODEL: Model iPhone'a 