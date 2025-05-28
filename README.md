# Creador de horarios escolares personalizados
Puedes hacer uso de está aplicación en el enlace público de GitHub Pages de éste mismo repositorio [https://stariluz.github.io/hours-schedule-creator-react/](https://stariluz.github.io/hours-schedule-creator-react/).

Sin embargo, si deseas hacer uso de esta aplicación de manera local para lo cual no necesitas internet, puedes hacerlo siguiendo esta guía.

## Prerequisitos
- Tener instalada alguna versión de [node.js](https://nodejs.org/es) 22. De preferencia instala la LTS o cualquier subversión a partir de la 22.13.
- Este tutorial se realiza sobre una terminal tipo shell y no bash como la consola nativa de windows. Si algún comando no funciona, puedes investigarlo en internet, o instalar una terminal tipo shell como [git bash](https://git-scm.com/downloads) que viene incluída al descargar git.

## Descarga e instalación
Puedes descargar este repositorio utilizando git, o por el contrario, descargar el .zip del repositorio desde este [enlace](https://github.com/stariluz/hours-schedule-creator-react/archive/refs/heads/development.zip).

Descomprime el archivo y abre una terminal que apunte a la carpeta donde se descomprimió este archivo. Por ejemplo en mi caso debo ejecutar:

```sh
cd ~/Documents/Code/hours-schedule-creator-react
```

A partir de aqui requieres node. En el directorio actual ejecutarás el comando 

```sh
npm install
```

El cual procederá a instalar todos los paquetes de npm de los que la aplicación hace uso.

Con ello ya completaste la instalación. Queda compilar el proyecto y ejecutar.

## Compilar y ejecutar

Para compilar la aplicación haz uso del comando:

```sh
npm run build
```

Este generará los archivos compilados de la aplicación, con los cuales podremos ejecutarla.

Y por consiguiente ejecuta la aplicación con el comando:

```sh
npm start
```

El cual generará un servidor local con la aplicación corriendo. 
Usualmente el puerto será el 4173 pero puede variar.
Con este puerto la url de la aplicación es [http://localhost:4173/](http://localhost:4173/).

Listo, ¡ya puedes empezar a crear tus horarios!

## ¿Dudas?
Escribeme a im.stariluz@gmail.com, soy Adora González, con mucho gusto te atenderé.