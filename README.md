# frontend — Dashboard Grupo Cordillera
**DSY1106 Desarrollo Fullstack III · DuocUC 2026**

Panel de control web para monitoreo de KPIs, datos organizacionales y reportes de negocio. Implementa acceso basado en roles (RBAC): cada rol obtiene una vista y permisos distintos. Se comunica con el backend exclusivamente a través del API Gateway (`localhost:9090`).

---

## Stack tecnológico

| Componente | Tecnología |
|---|---|
| Framework | React 19.2.5 |
| Lenguaje | JavaScript (JSX) |
| Build tool | Vite 8.0.10 |
| Routing | React Router DOM 7.14.2 |
| Estilos | Tailwind CSS 4.2.4 |
| HTTP Client | Axios 1.16.0 |
| Gestión de estado | React Context API |

---

## Estructura del proyecto

```
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── axios.js                  # Instancia Axios con interceptor JWT
│   ├── assets/                       # Recursos estáticos
│   ├── components/
│   │   ├── features/
│   │   │   ├── datos/
│   │   │   │   ├── DatoForm.jsx      # Formulario de registro de datos
│   │   │   │   └── DatosTable.jsx    # Tabla de datos organizacionales
│   │   │   ├── kpi/
│   │   │   │   ├── KpiCalculatorForm.jsx  # Formulario de cálculo de KPI
│   │   │   │   └── KpiTable.jsx      # Tabla de KPIs
│   │   │   ├── reportes/
│   │   │   │   └── ReportesTable.jsx # Tabla de reportes
│   │   │   └── CircuitBreakerStatus.jsx   # Estado de microservicios
│   │   ├── layout/
│   │   │   ├── Layout.jsx            # Layout principal con sidebar
│   │   │   └── Navbar.jsx            # Barra superior
│   │   ├── ui/
│   │   │   ├── Badge.jsx             # Etiqueta inline con color configurable
│   │   │   ├── Button.jsx            # Botón con variantes
│   │   │   ├── Card.jsx              # Contenedor genérico
│   │   │   ├── Input.jsx             # Campo de formulario con label
│   │   │   ├── Modal.jsx             # Diálogo modal
│   │   │   ├── StatCard.jsx          # Tarjeta de estadística
│   │   │   └── Table.jsx             # Tabla reutilizable
│   │   ├── ProtectedRoute.jsx        # Guarda de rutas por autenticación y rol
│   │   └── Sidebar.jsx               # Navegación lateral según rol
│   ├── context/
│   │   └── AuthContext.jsx           # Context global de autenticación
│   ├── pages/
│   │   ├── DashboardAdminGeneral.jsx # Vista ADMIN_GENERAL
│   │   ├── DashboardAdminSucursal.jsx # Vista ADMIN_SUCURSAL
│   │   ├── DashboardVendedor.jsx     # Vista VENDEDOR
│   │   ├── Login.jsx                 # Formulario de login
│   │   ├── Register.jsx              # Formulario de registro
│   │   └── Unauthorized.jsx          # Acceso denegado
│   ├── App.jsx                       # Definición de rutas
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Dependencias (package.json)

### Producción
| Paquete | Versión | Uso |
|---|---|---|
| `react` | ^19.2.5 | Framework UI |
| `react-dom` | ^19.2.5 | Renderizado en el DOM |
| `react-router-dom` | ^7.14.2 | Routing SPA |
| `axios` | ^1.16.0 | Cliente HTTP con interceptores |

### Desarrollo
| Paquete | Versión | Uso |
|---|---|---|
| `vite` | ^8.0.10 | Build tool y servidor de desarrollo |
| `@vitejs/plugin-react` | ^6.0.1 | Soporte JSX/React en Vite |
| `tailwindcss` | ^4.2.4 | Utilidades CSS |
| `@tailwindcss/vite` | ^4.2.4 | Integración Tailwind + Vite |
| `eslint` | ^10.2.1 | Linter de código |

---

## Scripts disponibles

| Script | Comando | Descripción |
|---|---|---|
| Desarrollo | `npm run dev` | Inicia servidor con hot reload en `localhost:5173` |
| Build | `npm run build` | Compila para producción en `dist/` |
| Preview | `npm run preview` | Sirve el build de producción localmente |
| Lint | `npm run lint` | Ejecuta ESLint sobre el código fuente |

---

## Variables de entorno

La URL base del API Gateway se configura mediante la variable de entorno `VITE_API_URL`, leída en `src/api/axios.js`:

```js
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9090/'
```

| Variable | Valor por defecto | Descripción |
|---|---|---|
| `VITE_API_URL` | `http://localhost:9090/` | URL base del API Gateway |

Para apuntar a otro entorno, crear un archivo `.env` en la raíz del proyecto (`frontend/`) con:

```
VITE_API_URL=http://localhost:9090/
```

Ver `.env.example` como plantilla. Vite expone automáticamente las variables prefijadas con `VITE_` vía `import.meta.env`; si no se define `.env`, se usa el valor por defecto `http://localhost:9090/`.

El token JWT y el objeto de usuario se persisten en `localStorage`:

| Clave | Contenido |
|---|---|
| `token` | JWT emitido por ms-auth |
| `user` | Objeto JSON con `username`, `email` y `role` |

---

## Instalación y ejecución local

### Prerrequisitos
- Node.js 20+
- npm 9+
- Backend completo corriendo (`docker compose up` desde el repositorio backend)
- API Gateway disponible en `http://localhost:9090`

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

---

## Inicio desde cero

Sigue estos pasos en orden para levantar el frontend partiendo desde cero, con el backend ya corriendo.

> **Prerrequisito:** el backend debe estar levantado y seedeado. Sigue la sección **Inicio desde cero (reset completo)** del README del repositorio backend antes de continuar.

**Paso 1 — Instalar dependencias (solo la primera vez)**

```bash
npm install
```

**Paso 2 — Iniciar el servidor de desarrollo**

```bash
npm run dev
```

El frontend queda disponible en `http://localhost:5173`.

---

## Cómo probar los componentes

> **Prerrequisito:** el backend debe estar levantado con `docker compose up` y las bases de datos pobladas con `datos_iniciales.sql`.

### 1. Login — `Login.jsx`

1. Abrir `http://localhost:5173`
2. Ingresar las credenciales de un usuario de prueba:

| Username | Password | Rol esperado |
|---|---|---|
| `admin` | `Admin123!` | ADMIN_GENERAL |
| `jefa.santiago` | `Admin123!` | ADMIN_SUCURSAL |
| `vendedor1` | `Admin123!` | VENDEDOR |

3. Verificar que redirige automáticamente al dashboard correspondiente al rol.
4. Verificar que con credenciales incorrectas aparece mensaje de error.

---

### 2. Dashboard Admin General — `DashboardAdminGeneral.jsx`

Acceder con `admin` / `Admin123!`.

**Datos organizacionales:**
- La tabla debe mostrar los registros del seed (ventas de abril 2026, inventario, etc.)
- Hacer clic en "Nuevo Dato" → completar el formulario → verificar que aparece en la tabla

**KPIs:**
- La tabla debe mostrar los KPIs del seed
- Hacer clic en "Calcular KPI" → seleccionar tipo `VENTAS`, ingresar un valor base (ej: `100000`) → el resultado calculado debe ser `35000` (35%)
- Tipos válidos y sus fórmulas:

| Tipo | Fórmula | Unidad |
|---|---|---|
| `VENTAS` | valorBase × 0.35 | % |
| `RENTABILIDAD` | valorBase × 1.15 | CLP |
| `INVENTARIO` | valorBase / 30 | unidades/día |

**Reportes:**
- La tabla debe mostrar los reportes del seed

**Circuit Breaker:**
- Los badges de estado de microservicios deben aparecer como activos si el backend está corriendo

---

### 3. Dashboard Admin Sucursal — `DashboardAdminSucursal.jsx`

Acceder con `jefa.santiago` / `Admin123!`.

- Verificar que el dashboard muestra solo datos filtrados por sucursal `SANTIAGO`
- Verificar que NO aparecen opciones de creación (solo lectura)
- Intentar acceder a `/dashboard/admin-general` → debe redirigir a `/unauthorized`

---

### 4. Dashboard Vendedor — `DashboardVendedor.jsx`

Acceder con `vendedor1` / `Admin123!`.

- Verificar que solo se muestran KPIs de tipo `VENTAS`
- Verificar que no hay formularios de creación ni edición
- Intentar acceder a `/dashboard/admin-general` → debe redirigir a `/unauthorized`

---

### 5. Registro de usuario — `Register.jsx`

1. Ir a `http://localhost:5173/register`
2. Completar el formulario con un nuevo username, email y contraseña
3. Seleccionar rol
4. Verificar respuesta `201 Created` y redirección a `/login`

---

### 6. Protección de rutas — `ProtectedRoute.jsx`

- Abrir una ventana de incógnito y navegar a `http://localhost:5173/dashboard/admin-general` → debe redirigir a `/login`
- Iniciar sesión como `vendedor1` y navegar a `/dashboard/admin-general` → debe mostrar `/unauthorized`

---

## Rutas de la aplicación

| Ruta | Componente | Acceso | Roles permitidos |
|---|---|---|---|
| `/login` | `Login.jsx` | Público | — |
| `/register` | `Register.jsx` | Público | — |
| `/dashboard` | Redirige según rol | Autenticado | Todos |
| `/dashboard/admin-general` | `DashboardAdminGeneral.jsx` | Autenticado | `ADMIN_GENERAL` |
| `/dashboard/admin-sucursal` | `DashboardAdminSucursal.jsx` | Autenticado | `ADMIN_SUCURSAL` |
| `/dashboard/vendedor` | `DashboardVendedor.jsx` | Autenticado | `VENDEDOR` |
| `/unauthorized` | `Unauthorized.jsx` | Público | — |
| `/*` | Redirect | — | Redirige a `/login` |

---

## Endpoints consumidos

Todos los requests pasan por el API Gateway en `http://localhost:9090/`.

| Método | Ruta | Componente | Descripción |
|---|---|---|---|
| `POST` | `/api/auth/login` | `Login.jsx` | Autenticación de usuario |
| `POST` | `/api/auth/register` | `Register.jsx` | Registro de nuevo usuario |
| `GET` | `/bff/dashboard` | `DashboardAdminGeneral.jsx` | Datos, KPIs y reportes globales |
| `GET` | `/bff/dashboard/sucursal/{sucursal}` | `DashboardAdminSucursal.jsx` | Datos, KPIs y reportes por sucursal |
| `POST` | `/api/datos` | `DashboardAdminGeneral.jsx` | Registrar nuevo dato organizacional |
| `PUT` | `/api/datos/{id}` | `DashboardAdminGeneral.jsx` | Editar un dato organizacional existente |
| `DELETE` | `/api/datos/{id}` | `DashboardAdminGeneral.jsx` | Eliminar un dato organizacional |
| `POST` | `/api/kpi/calcular` | `DashboardAdminGeneral.jsx` | Calcular y registrar un KPI |
| `DELETE` | `/api/kpi/{id}` | `DashboardAdminGeneral.jsx` | Eliminar un KPI |
| `GET` | `/api/kpi/tipo/VENTAS` | `DashboardVendedor.jsx` | KPIs de ventas para el vendedor |
| `POST` | `/api/reportes` | `ReportesTable.jsx` | Crear un nuevo reporte |
| `DELETE` | `/api/reportes/{id}` | `ReportesTable.jsx` | Eliminar un reporte |

El token JWT se inyecta automáticamente en todos los requests mediante un interceptor de Axios:

```
Authorization: Bearer <token>
```

---

## Patrones implementados

| Patrón | Archivo(s) | Justificación |
|---|---|---|
| **RBAC (Role-Based Access Control)** | `ProtectedRoute.jsx`, `App.jsx` | Grupo Cordillera tiene tres perfiles de usuario con necesidades distintas. RBAC garantiza que cada rol solo acceda a su vista correspondiente sin necesidad de lógica condicional dispersa en cada componente |
| **Context API (Auth)** | `AuthContext.jsx` | El token JWT y los datos del usuario deben estar disponibles en toda la aplicación sin prop-drilling. Context centraliza el estado de sesión y expone las acciones `login` y `logout` a cualquier componente |
| **Interceptor de Axios** | `api/axios.js` | Inyecta el JWT automáticamente en cada request sin repetir el header manualmente en cada llamada. Si el token cambia, solo se modifica el interceptor |
| **BFF Consumption** | `DashboardAdminGeneral.jsx`, `DashboardAdminSucursal.jsx` | El frontend realiza una sola llamada a `/bff/dashboard` en lugar de tres llamadas paralelas. Reduce la complejidad del cliente y desacopla al frontend de la topología interna del backend |
| **Protected Routes** | `ProtectedRoute.jsx` | Centraliza la lógica de guarda en un único componente wrapper. Redirige a `/login` si no hay sesión, o a `/unauthorized` si el rol no tiene permiso, sin duplicar esta lógica en cada página |
| **Componentes UI reutilizables** | `src/components/ui/` | Estandariza el aspecto visual de botones, tarjetas, tablas e inputs. Cualquier cambio de diseño se aplica en un solo archivo y se propaga a toda la aplicación |
| **Modal-based CRUD** | `Modal.jsx`, dashboards | Las operaciones de creación (datos, KPIs) se presentan en modales sin cambio de ruta, manteniendo el contexto del dashboard y evitando navegación innecesaria |
| **Theming por rol** | Dashboards | Esquemas de color distintos por rol (índigo para `ADMIN_GENERAL`, esmeralda para `ADMIN_SUCURSAL`, ámbar para `VENDEDOR`) permiten al usuario identificar visualmente su nivel de acceso |
| **Loading & Empty States** | `Table.jsx` | Todas las tablas muestran spinner de carga y mensaje de vacío, evitando que el usuario interprete una tabla vacía como un error |
| **Validación client-side** | `Login.jsx`, `Register.jsx`, formularios | Valida campos requeridos y formatos antes de enviar al servidor, reduciendo llamadas fallidas y mejorando la experiencia de usuario |
