# Git Commands Manager

Aplicación web para gestionar y organizar comandos de Git de forma rápida y visual.

El objetivo del proyecto es centralizar comandos de Git frecuentes para tenerlos siempre disponibles, permitiendo organizarlos fácilmente y copiarlos al portapapeles con un solo clic.

## Características

- Crear nuevos comandos de Git.
- Editar comandos existentes.
- Eliminar comandos.
- Reordenar comandos mediante Drag and Drop.
- Copiar comandos al portapapeles con un clic.
- Interfaz simple y enfocada en productividad.
- Búsqueda y filtrado de comandos.

## Tecnologías utilizadas

- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Hello Pangea DnD
- React Query

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

Ingresa al proyecto:

```bash
cd tu-repositorio
```

Instala las dependencias:

```bash
npm install
```

Inicia la aplicación:

```bash
npm run dev
```

## Uso

1. Agrega comandos de Git mediante el formulario de creación.
2. Organiza los comandos arrastrándolos a la posición deseada.
3. Utiliza el buscador para encontrar comandos rápidamente.
4. Haz clic sobre un comando para copiarlo automáticamente al portapapeles.

## Ejemplos de comandos

```bash
git status
git pull origin main
git checkout -b feature/nueva-funcionalidad
git commit -m "feat: nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

## Funcionalidades principales

### Gestión de comandos

Permite crear, editar y eliminar comandos de Git para construir una biblioteca personalizada.

### Organización visual

Los comandos pueden reordenarse mediante Drag and Drop para priorizar los más utilizados.

### Copia rápida

Al seleccionar un comando, este se copia automáticamente al portapapeles para agilizar el flujo de trabajo.

### Búsqueda

Filtra los comandos almacenados para encontrarlos de forma rápida.

## Capturas de pantalla

### Página principal

![Home Page](public/image1.png)

### Crear comando

![Create Command](public/image2.png)

### Modal para eliminar un comando

![Modal](public/image3.png)
