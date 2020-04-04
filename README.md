# Clinical Record Web

## INSTALL

1. Crear una carpeta principal (por ejemplo, **`Clinical`**)

2. Dentro de la carpeta, clonar el [**`frontend`**](https://github.com/FMGordillo/clinical-web) y [**`backend`**](https://github.com/FMGordillo/clinical-backend).

3. Dentro de la carpeta principal del paso 1, también anexá un archivo según tu sistema operativo:

### Windows

**`run.ps1`**

```
npx concurrently 'cd clinical-backend && npm run dev' 'cd clinical-web && npm run dev'
```

### Linux / Mac

**`run.sh`**

```
#!/bin/bash

npx concurrently "cd clinical-backend && npm run dev" "cd clinical-web && npm run dev"```

## Project Structure

```
├── pages
|    └──  index              # Landing ahre
└──
```
