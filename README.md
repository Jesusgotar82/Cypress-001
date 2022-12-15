# Cypress-001

## Requisitos

Es necesario tener instalado nodejs:

* [NodeJS](https://nodejs.org/en/download/)

para validar si ya lo tienes instalado puedes usar el comando 
```
$ node -v
```

## IDE

En el caso de Cypress se pueden utilizar múltiples IDE diferetes, pero recomendamos el us de Visual Studio Code:

* [Visual Studio Code](https://code.visualstudio.com/download)

## Plugins recomendados

* [Cypress Helper](https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper)
* [Run Cypress](https://marketplace.visualstudio.com/items?itemName=coreylight.run-cy)
* [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)

## Instalación
Al estar basado en el motor npm, para instalar este framework solo se requiere ejecutar el siguiente comando, el cual procederá a instalar todas las dependencias almaceadas en el archivo packaje.json:
```
$ npm install
```

## Ejecución
Para ejecutar solo necesitamos el siguiente comando:
```
$ npx cypress run
```

Para iniciar el entorno gráfico de lanzamiento 
```
$ npx cypress open
```

## Ejecucion en Saucelabs
Para poder ejecutar en saucelabs, primero se debe instalar saucectl de manera global
```
$ npm install -g saucectl
```
luego generar el fichero config.yml que detalla la manera en que se debe ejecutar el proyecto y las librerías a ser utillizadas y el archivo .sauceignore que detalla cuales archivos no es necesario subir a saucelabs (agiliza la ejecuciónn)
```
$ saucectl init
```

configurar las credenciales de acceso a saucelabs
```
$ saucectl configure
```

configurar un archivo .sauceignore con todo lo que no debe subirse a saucelabs


y por último lanzar usando el comando
```
$ saucectl run
```

## Reporteria
Como reporteria usamos mochawesome reportes ya que es bastate configurable, fácil de instalar y nos genera un reporte en formato HTML de un solo archivo que podemos almacenar donde deseemos

* [Mochawesome reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)
