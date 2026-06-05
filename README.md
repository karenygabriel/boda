# Invitación de Boda - React + Vite + TypeScript

Esta es una versión moderna de la invitación de boda, construida con React, Vite y TypeScript.

## Características

- **Video Slider:** Fondo de video elegante con overlay.
- **Diseño Premium:** Colores crema, tipografía refinada (Playfair Display) y animaciones suaves.
- **Formulario RSVP:** Confirmación de asistencia con selección de menú (Entrante y Plato Principal).
- **TypeScript:** Tipado fuerte para un desarrollo más robusto.

## Desarrollo Local

1. Instala las dependencias:
   ```bash
   npm install
   ```P
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre `http://localhost:5173` en tu navegador.

## Despliegue a GitHub Pages

1. Crea un repositorio en GitHub.
2. Empuja el código a la rama `main`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<TU_USUARIO>/<TU_REPO>.git
   git branch -M main
   git push -u origin main
   ```
3. El flujo de trabajo de GitHub Actions (`.github/workflows/gh-pages.yml`) se encargará de construir y desplegar automáticamente la aplicación en la rama `gh-pages`.
4. Asegúrate de configurar el `base` en `vite.config.ts` si el repositorio no está en la raíz del dominio:
   ```typescript
   export default defineConfig({
     base: '/<NOMBRE_DEL_REPO>/',
     plugins: [react()],
   })
   ```

## Personalización

- **Contenido:** Edita `src/components/VideoSlider.tsx` y `src/components/RsvpForm.tsx`.
- **Estilos:** Ajusta los colores y fuentes en `src/index.css` y los archivos CSS de los componentes.
- **Video:** Cambia la URL del video en `src/components/VideoSlider.tsx`.

---P

¡Felicidades por tu boda! 🥂
