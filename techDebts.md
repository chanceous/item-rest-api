# 🔧 Deuda Técnica

Este documento detalla las mejoras y tareas pendientes que yo considero que dejarian mejor al challenge con más tiempo.

### Implementar autenticación JWT
- **Descripción:** Asegurar la comunicación entre el backend y frontend mediante tokens JWT

- **Tareas:**
    - [ ] Configurar middleware de autenticación en el backend
    - [ ] Implementar generación y validación de tokens JWT
    - [ ] Crear interceptors en el frontend para manejo de tokens
    - [ ] Implementar refresh token

## 🎨 Frontend & UX

### Mejorar la consistencia visual
- **Descripción:** Asimilar más los estilos a la página principal y mejorar la experiencia de usuario
- **Tareas:**
    - [ ] Crear un sistema de design tokens consistente
    - [ ] Implementar componentes reutilizables siguiendo el diseño
    - [ ] Revisar y unificar la paleta de colores
    - [ ] Mejorar la tipografía y espaciado
    - [ ] Implementar estados de loading y error más atractivos
    - [ ] Agregar animaciones y transiciones suaves

## 📚 Documentación

### Implementar Swagger/OpenAPI
- **Descripción:** Generar documentación automática de la API
- **Tareas:**
    - [ ] Instalar y configurar @nestjs/swagger
    - [ ] Documentar todos los endpoints con decoradores
    - [ ] Agregar ejemplos de request/response
    - [ ] Configurar schemas y DTOs con validaciones
    - [ ] Implementar autenticación en Swagger UI
    - [ ] Generar documentación exportable

## 🧪 Testing

### Implementar tests y snapshots en frontend
- **Descripción:** Agregar cobertura de pruebas completa en el lado del cliente
- **Tareas:**
    - [ ] Configurar Jest y React Testing Library
    - [ ] Crear tests unitarios para componentes principales
    - [ ] Implementar snapshot testing para componentes UI
    - [ ] Agregar tests de integración para flujos críticos
    - [ ] Configurar coverage reporting
    - [ ] Implementar tests E2E básicos

## 🔍 Calidad de Código

### Configurar linter y herramientas de calidad
- **Descripción:** Implementar herramientas para mantener consistencia en el código
- **Tareas:**
    - [ ] Configurar ESLint con reglas strictas
    - [ ] Implementar Prettier para formateo automático
    - [ ] Agregar Husky para pre-commit hooks
    - [ ] Configurar lint-staged
    - [ ] Implementar SonarQube o herramienta similar
    - [ ] Agregar reglas específicas para TypeScript