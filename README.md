# frontend — Dashboard Grupo Cordillera

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

## Puerto de desarrollo

`http://localhost:5173` (servidor de desarrollo Vite)

---

## Variables de entorno

No se usan archivos `.env`. La URL base del API Gateway está definida en `src/api/axios.js`:

```js
baseURL: 'http://localhost:9090/'
```

El token JWT y el objeto de usuario se persisten en `localStorage`:

| Clave | Contenido |
|---|---|
| `token` | JWT emitido por ms-auth |
| `user` | Objeto JSON con `username`, `email` y `role` |

> Para apuntar a otro entorno, editar la `baseURL` en `src/api/axios.js`.

---

## Instalación y ejecución local

### Prerrequisitos
- Node.js 20+
- npm 9+
- API Gateway corriendo en `http://localhost:9090`

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa del build de producción
npm run preview

# Ejecutar linter
npm run lint
```

---

## Rutas de la aplicación

| Ruta | Componente | Acceso | Roles permitidos |
|---|---|---|---|
| `/login` | `Login.jsx` | Público | — |
| `/register` | `Register.jsx` | Público | — |
| `/dashboard` | `DashboardRouter` | Autenticado | Redirige según rol |
| `/dashboard/admin-general` | `DashboardAdminGeneral.jsx` | Autenticado | `ADMIN_GENERAL` |
| `/dashboard/admin-sucursal` | `DashboardAdminSucursal.jsx` | Autenticado | `ADMIN_SUCURSAL` |
| `/dashboard/vendedor` | `DashboardVendedor.jsx` | Autenticado | `VENDEDOR` |
| `/unauthorized` | `Unauthorized.jsx` | Público | — |
| `/*` | Redirect | — | Redirige a `/login` |

### Vistas por rol

| Rol | Funcionalidades |
|---|---|
| `ADMIN_GENERAL` | Dashboard global, CRUD de datos organizacionales, cálculo de KPIs, reportes, estado de Circuit Breakers |
| `ADMIN_SUCURSAL` | Dashboard filtrado por sucursal (SANTIAGO), lectura de datos, KPIs y reportes de esa sucursal |
| `VENDEDOR` | Vista de solo lectura de KPIs de tipo `VENTAS` |

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
| `POST` | `/api/kpi/calcular` | `DashboardAdminGeneral.jsx` | Calcular y registrar un KPI |
| `GET` | `/api/kpi/tipo/VENTAS` | `DashboardVendedor.jsx` | KPIs de ventas para el vendedor |

El token JWT se inyecta automáticamente en todos los requests mediante un interceptor de Axios:

```
Authorization: Bearer <token>
```

---

## Estructura de componentes

### Páginas (`src/pages/`)

| Archivo | Descripción |
|---|---|
| `Login.jsx` | Formulario de autenticación con validación |
| `Register.jsx` | Formulario de registro con selector de rol |
| `DashboardAdminGeneral.jsx` | Dashboard completo: tablas, modales de creación, estado de servicios |
| `DashboardAdminSucursal.jsx` | Dashboard filtrado por sucursal |
| `DashboardVendedor.jsx` | Vista de solo lectura de KPIs de ventas |
| `Unauthorized.jsx` | Página de acceso denegado |

### Componentes UI (`src/components/ui/`)

| Componente | Descripción |
|---|---|
| `Button.jsx` | Botón con variantes: `primary`, `secondary`, `ghost`, `danger` |
| `Input.jsx` | Campo de formulario con label e indicador de requerido |
| `Card.jsx` | Contenedor genérico |
| `StatCard.jsx` | Tarjeta de estadística con icono, valor, etiqueta y subtítulo |
| `Badge.jsx` | Etiqueta inline con color configurable |
| `Modal.jsx` | Diálogo con cabecera, botón de cierre y ancho configurable |
| `Table.jsx` | Tabla reutilizable con estados de carga y vacío |

### Componentes de funcionalidades (`src/components/features/`)

| Componente | Descripción |
|---|---|
| `DatosTable.jsx` | Tabla de datos organizacionales (indicador, valor, sucursal, fecha) |
| `DatoForm.jsx` | Formulario de registro de datos con validación |
| `KpiTable.jsx` | Tabla de KPIs con acento de color configurable |
| `KpiCalculatorForm.jsx` | Formulario de cálculo de KPI por tipo (VENTAS, PRODUCCION, CALIDAD, LOGISTICA, FINANCIERO) |
| `ReportesTable.jsx` | Tabla de reportes generados |
| `CircuitBreakerStatus.jsx` | Badges de estado para ms-datos, ms-kpi, ms-reportes, ms-auth, ms-bff y api-gateway |

### Infraestructura (`src/`)

| Archivo | Descripción |
|---|---|
| `context/AuthContext.jsx` | Context de autenticación: `user`, `token`, `login`, `logout`, `isAuthenticated` |
| `components/ProtectedRoute.jsx` | Wrapper que valida autenticación y rol antes de renderizar la ruta |
| `components/layout/Layout.jsx` | Layout principal con barra superior, sidebar y menú hamburguesa responsive |
| `components/Sidebar.jsx` | Navegación lateral con ítems según rol y perfil de usuario |
| `api/axios.js` | Instancia de Axios con `baseURL` e interceptor de token |

---

## Patrones implementados

| Patrón | Descripción |
|---|---|
| **RBAC (Role-Based Access Control)** | Tres roles con vistas y permisos diferenciados; `ProtectedRoute` rechaza acceso no autorizado redirigiendo a `/unauthorized` |
| **JWT Auth con Context API** | Token almacenado en `localStorage`, distribuido globalmente via `AuthContext`, inyectado en requests via interceptor de Axios |
| **Protected Routes** | `ProtectedRoute` envuelve rutas privadas; redirige a `/login` si no hay sesión o a `/unauthorized` si el rol no coincide |
| **BFF Consumption** | El frontend realiza una sola llamada a `/bff/dashboard` en lugar de llamar a tres servicios por separado |
| **Modal-based CRUD** | Operaciones de creación (datos, KPIs) se presentan en modales sin cambio de ruta |
| **Validación client-side** | Formularios validan campos requeridos, longitud mínima (username ≥ 3, password ≥ 6) y formato de email antes de enviar |
| **Loading & Empty States** | Todas las tablas muestran spinner de carga y mensaje de vacío |
| **Responsive Design** | Layout mobile-first con menú hamburguesa; columnas y tarjetas adaptadas a pantalla |
| **Theming por rol** | Esquemas de color distintos: índigo (`ADMIN_GENERAL`), esmeralda (`ADMIN_SUCURSAL`), ámbar (`VENDEDOR`) |
