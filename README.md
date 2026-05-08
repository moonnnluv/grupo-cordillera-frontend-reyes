# cordillera-frontend — Frontend React
**Grupo Cordillera** · DSY1106 Desarrollo Fullstack III · DuocUC

## Descripción
Interfaz de usuario construida con React 19 + Vite. Consume la API REST
del backend a través del API Gateway. Implementa autenticación JWT con
redirección automática según rol de usuario.

## Stack
- React 19 · Vite 8
- React Router DOM 7
- Axios
- Tailwind CSS 4

## Requisitos previos
- Node.js 20+
- npm 9+
- Backend corriendo en `http://localhost:9090`

## Instalación
```bash
cd frontend
npm install
```

## Ejecución
```bash
npm run dev
```
Corre en `http://localhost:5173`

## Build producción
```bash
npm run build
```

## Módulo NPM
Este proyecto está configurado como módulo NPM publicable:
- `"name": "cordillera-frontend"`
- `"private": false`
- `"main": "src/main.jsx"`

## Roles y dashboards
| Rol | Dashboard | Acceso |
|-----|-----------|--------|
| `ADMIN_GENERAL` | `/dashboard/admin-general` | Todos los datos, CRUD, KPIs |
| `ADMIN_SUCURSAL` | `/dashboard/admin-sucursal` | Datos de su sucursal |
| `VENDEDOR` | `/dashboard/vendedor` | Solo KPIs de ventas |

## Estructura
```
src/
  api/          ← cliente axios con interceptor JWT
  components/
    ui/          ← Card, Button, Badge, Input, StatCard, Table, Modal
    layout/      ← Layout, Navbar
    features/    ← DatosTable, DatoForm, KpiTable, KpiCalculatorForm,
                   ReportesTable, CircuitBreakerStatus
  context/      ← AuthContext (login, logout, isAuthenticated)
  pages/        ← Login, Register, Dashboards por rol, Unauthorized
```

## Validaciones implementadas
- Login: username mínimo 3 caracteres, password mínimo 6
- Register: email con formato válido, rol seleccionable
- Formularios de datos y KPI con validación antes de POST
