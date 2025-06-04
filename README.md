# suivi-prod

Placer les fichier contenant les données des ateliers dans le dossier /data.
Ce dossier doit contenir seulement 2 fichiers: actuel.csv et ancien.csv
A chaque mise à jour, supprimer le fichier ancien.csv, puis renommer le fichier restant en ancien.csv. Ajoutez enfin le fichier à jour et nommez-le actuel.csv.

## Prépartation

```sh
npm install
```

### Développement

```sh
npm run dev
```

### Compilation et empaquetage pour production

```sh
npm run build
```