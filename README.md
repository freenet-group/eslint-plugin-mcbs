# ESLint Plugin für MCBS

Dieses ESLint-Plugin stellt Regeln bereits, welche einen einheitlichen Code-Stil für die Entwicklung von MCBS-Projekten vorschreiben.

## Installation

### Lokale Installation

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

### Renovate

Damit per Renovate auf das Plugin zugegriffen werden kann, muss die `renovate.json` eine entsprechende Konfiguration enthalten:

```json
{
  "npmrc": "registry=https://registry.npmjs.org/\n@freenet-group:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken={{ secrets.RENOVATE_GH_R_PACKAGES }}"
}
```

Das Secret entspricht hier nicht einem GitHub Secret, sondern muss über die [Renovate Admin Seite](https://developer.mend.io/) im Repo oder in der Organization hinterlegt werden.

Alternativ kann auch von unserem Node-Preset abgeleitet werden, da dies bereits dort konfiguriert ist:

```json
{
  "extends": ["github>freenet-group/mcbscore-renovate:node"]
}
```

### GitHub Workflows

Auch ein GitHub Workflow muss auf die Registry zugreifen können. Hierzu ist ein GitHub Secret anzulegen und in den Workflows entsprechend zu verwenden:

```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: 20.x
    cache: 'npm'
    registry-url: 'https://npm.pkg.github.com/'

- name: Dependencies installieren
  run: npm ci
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GH_R_PACKAGES }}
```

## Konfiguration

Füge das Plugin zu deiner ESLint-Konfiguration hinzu:

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
    "@freenet-group/mcbs/error-message-punctuation": "error"
  }
}
```

### Regeln

- `@freenet-group/mcbs/error-message-punctuation`: Stellt sicher, dass Fehlermeldungen mit einem Satzzeichen enden.
  - `--fix`: Fügt automatisch einen Punkt "." am Ende der Fehlermeldung hinzu.
