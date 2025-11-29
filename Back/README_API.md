# API de Gestión de Tareas - Documentación

API REST para gestionar tareas usando Node.js, Express y TiDB Cloud (MySQL).

## 🚀 Configuración Inicial

### 1. Instalar Dependencias

Las dependencias ya están definidas en `package.json`. Solo necesitas ejecutar:

```bash
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz de la carpeta `Back` con tus credenciales de TiDB Cloud:

```env
PORT=3000
NODE_ENV=development

# Credenciales de TiDB Cloud
DB_HOST=tu-host.tidbcloud.com
DB_PORT=4000
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tasks_db
DB_SSL=true
```

### 3. Configurar Base de Datos en TiDB Cloud

1. Accede a [TiDB Cloud](https://tidbcloud.com)
2. Crea un nuevo cluster (o usa uno existente)
3. Ve a la sección SQL Editor
4. Ejecuta el script `database.sql` que se encuentra en esta carpeta
5. Copia las credenciales de conexión a tu archivo `.env`

### 4. Iniciar el Servidor

**Modo desarrollo (con auto-reload):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📚 Endpoints de la API

### Base URL
```
http://localhost:3000/api/tasks
```

### 1. Obtener todas las tareas

**GET** `/api/tasks`

**Query Parameters (opcionales):**
- `status=completed` - Solo tareas completadas
- `status=pending` - Solo tareas pendientes

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "title": "Configurar TiDB Cloud",
      "description": "Crear cuenta y configurar cluster",
      "completed": true,
      "created_at": "2025-11-29T12:00:00.000Z",
      "updated_at": "2025-11-29T12:00:00.000Z"
    }
  ]
}
```

**Ejemplos:**
```bash
# Todas las tareas
curl http://localhost:3000/api/tasks

# Solo completadas
curl http://localhost:3000/api/tasks?status=completed

# Solo pendientes
curl http://localhost:3000/api/tasks?status=pending
```

---

### 2. Obtener una tarea por ID

**GET** `/api/tasks/:id`

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Configurar TiDB Cloud",
    "description": "Crear cuenta y configurar cluster",
    "completed": true,
    "created_at": "2025-11-29T12:00:00.000Z",
    "updated_at": "2025-11-29T12:00:00.000Z"
  }
}
```

**Respuesta error (404):**
```json
{
  "success": false,
  "message": "Tarea no encontrada"
}
```

**Ejemplo:**
```bash
curl http://localhost:3000/api/tasks/1
```

---

### 3. Crear una nueva tarea

**POST** `/api/tasks`

**Body (JSON):**
```json
{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea (opcional)"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Tarea creada exitosamente",
  "data": {
    "id": 6,
    "title": "Nueva tarea",
    "description": "Descripción de la tarea",
    "completed": false
  }
}
```

**Respuesta error (400):**
```json
{
  "success": false,
  "message": "El título es requerido"
}
```

**Ejemplo:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Aprender TiDB Cloud","description":"Completar tutorial básico"}'
```

---

### 4. Actualizar una tarea

**PUT** `/api/tasks/:id`

**Body (JSON):**
```json
{
  "title": "Título actualizado",
  "description": "Nueva descripción",
  "completed": true
}
```

Todos los campos son opcionales. Solo se actualizarán los campos enviados.

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Tarea actualizada exitosamente",
  "data": {
    "id": 1,
    "title": "Título actualizado",
    "description": "Nueva descripción",
    "completed": true
  }
}
```

**Ejemplo:**
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

---

### 5. Cambiar estado de completado

**PATCH** `/api/tasks/:id/toggle`

Alterna el estado de `completed` (true ↔ false).

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Estado de tarea actualizado",
  "data": {
    "id": 1,
    "title": "Configurar TiDB Cloud",
    "description": "Crear cuenta y configurar cluster",
    "completed": false,
    "created_at": "2025-11-29T12:00:00.000Z",
    "updated_at": "2025-11-29T12:10:00.000Z"
  }
}
```

**Ejemplo:**
```bash
curl -X PATCH http://localhost:3000/api/tasks/1/toggle
```

---

### 6. Eliminar una tarea

**DELETE** `/api/tasks/:id`

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Tarea eliminada exitosamente"
}
```

**Respuesta error (404):**
```json
{
  "success": false,
  "message": "Tarea no encontrada"
}
```

**Ejemplo:**
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

---

## 🗂️ Estructura del Proyecto

```
Back/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de conexión a TiDB
│   ├── controllers/
│   │   └── task.controller.js   # Lógica de negocio
│   ├── models/
│   │   └── task.model.js        # Modelo de datos
│   └── routes/
│       └── task.routes.js       # Definición de rutas
├── .env                         # Variables de entorno (NO subir a Git)
├── .env.example                 # Ejemplo de variables de entorno
├── database.sql                 # Script SQL para TiDB Cloud
├── index.js                     # Punto de entrada
├── package.json                 # Dependencias y scripts
└── README_API.md               # Esta documentación
```

---

## 🧪 Probar la API

### Opción 1: Navegador
Para peticiones GET, simplemente abre:
- `http://localhost:3000/api/tasks`

### Opción 2: Thunder Client (VS Code)
1. Instala la extensión "Thunder Client"
2. Crea una nueva colección
3. Agrega las peticiones según los endpoints documentados

### Opción 3: Postman
Importa esta colección o crea las peticiones manualmente.

### Opción 4: curl (Terminal)
Usa los ejemplos proporcionados en cada endpoint.

---

## ⚠️ Manejo de Errores

Todos los endpoints devuelven respuestas en formato JSON con la siguiente estructura:

**Éxito:**
```json
{
  "success": true,
  "message": "Mensaje descriptivo",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos (solo en desarrollo)"
}
```

**Códigos de estado HTTP:**
- `200` - OK
- `201` - Creado
- `400` - Petición incorrecta
- `404` - No encontrado
- `500` - Error del servidor

---

## 🔒 Seguridad

### Variables de Entorno
- **NUNCA** subas el archivo `.env` a Git
- Usa `.env.example` como plantilla
- Las credenciales de TiDB Cloud son sensibles

### CORS
El servidor está configurado para aceptar peticiones desde cualquier origen. En producción, configura CORS específicamente:

```javascript
app.use(cors({
  origin: 'https://tu-frontend.com'
}));
```

---

## 📊 Próximos Pasos

1. ✅ Backend completado
2. ⏳ Crear frontend con React
3. ⏳ Conectar frontend con backend
4. ⏳ Desplegar en producción

---

## 🆘 Troubleshooting

### Error: "Cannot connect to TiDB Cloud"
- Verifica tus credenciales en `.env`
- Asegúrate de que el cluster esté activo
- Verifica que tu IP esté en la whitelist de TiDB Cloud

### Error: "Table 'tasks' doesn't exist"
- Ejecuta el script `database.sql` en TiDB Cloud

### Error: "Port 3000 already in use"
- Cambia el puerto en `.env`: `PORT=3001`
- O cierra la aplicación que está usando el puerto 3000

---

¡Tu API está lista para usarse! 🎉
