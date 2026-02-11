# 💬 Foro de Debate: Analizando el Doble Hackeo de Uber

**Diplomado en Ciberseguridad • Anáhuac Online • Módulo 2, Unidad 4**

Foro de debate interactivo con IA que simula la experiencia de participar en un foro académico con compañeros virtuales.

## 🎯 Objetivo

Identificar vulnerabilidades y estrategias de respuesta a incidentes cibernéticos, reflexionando sobre el factor humano en la seguridad digital y la transparencia.

## 🚀 Despliegue en Railway

### Paso 1: Sube los archivos a GitHub

Crea un nuevo repositorio y sube todos los archivos. La estructura debe ser:
```
tu-repositorio/
├── server.js
├── package.json
├── railway.json
├── nixpacks.toml
├── .gitignore
├── README.md
└── public/
    └── index.html
```

### Paso 2: Despliega en Railway

1. Ve a [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Selecciona tu repositorio

### Paso 3: Configura la variable de entorno

En Railway → tu proyecto → **Variables**, agrega:

| Variable | Valor |
|----------|-------|
| `ANTHROPIC_API_KEY` | Tu API key de Anthropic |

### Paso 4: Genera el dominio público

1. Ve a **Settings** → **Networking**
2. Click **"Generate Domain"**
3. ¡Listo! Tu foro estará disponible en la URL generada

## 📋 Características

- ✅ Registro de participantes
- ✅ Simulación de compañeros virtuales con IA
- ✅ Evaluación formativa automática con rúbrica de 5 criterios
- ✅ Interfaz responsive y profesional
- ✅ Diseño institucional Anáhuac Online

## 🔧 Desarrollo local
```bash
npm install
ANTHROPIC_API_KEY=tu-api-key node server.js
```

Abre http://localhost:3000

---

**Anáhuac Online** • Diplomado en Ciberseguridad • 2026