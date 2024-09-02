# ESLint Plugin für MCBS

Dieses ESLint-Plugin stellt Regeln bereits, welche einen einheitlichen Code-Stil für die Entwicklung von MCBS-Projekten vorschreiben.

## Installation

Bevor du das Plugin installieren kannst, musst du das GitHub npm-Registry-Repository zu deiner npm-Konfiguration hinzufügen.
Füge dazu die folgende Zeile zu deiner `.npmrc`-Datei unter Home hinzu und ersetze `YOUR_GITHUB_TOKEN` mit deinem GitHub-Token:

```bash
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@freenet-group:registry=https://npm.pkg.github.com
```

Installiere das Plugin über npm:

```bash
npm install --save-dev @freenet-group/eslint-plugin-mcbs
```

## Konfiguration

Füge das Plugin zu deiner ESLint-Konfiguration hinzu:

### .eslintrc oder .eslintrc.json (eslint < 9)

```json
{
  "plugins": ["@freenet-group/eslint-plugin-mcbs"],
  "extends": ["plugin:@freenet-group/eslint-plugin-mcbs/recommended"]
}
```

Anpassung des Error-Levels:

```json
{
  "rules": {
    "@freenet-group/mcbs/error-message-punctuation": "warn"
  }
}
```

###

### Regeln

- `@freenet-group/mcbs/error-message-punctuation`: Stellt sicher, dass Fehlermeldungen mit einem Satzzeichen enden.
  - `--fix`: Fügt automatisch einen "." am Ende der Fehlermeldung hinzu.
