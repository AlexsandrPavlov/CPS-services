## Commands/Команды:

### Install template/Установка шаблона

```shell
git clone "last version template"
npm i
```

### Starting a server for development/Запуск локального сервера для разработки

```shell
npm run serve
```

### Building a project without optimization/Сборка проекта без оптимизации

```shell
npm run build:dev
```

### Build the project with optimization/Сборка проекта с оптимизацией

```shell
npm run build:prod
```

### Deploy on Github pages/Опубликовать на Github Pages

```shell
npm run deploy
```

### Пути

```shell
 Переменные SCSS выставляются в src/scss/abstracts/__var.scss
```

```shell
 Медизапросы SCSS выставляются в src/scss/abstracts/__mix.scss
```

```shell
 Файловая система:
 Папка для шрифтов src/fonts подключение src/scss/base/__fonts.scss
 Картинки src/img и иконки src/icons
 JS src/js
 Базовые стили src/scss/base
 Компоненты по БЭМ src/scss/components
 Блоки по БЭМ src/scss/layout
 HTML  src/index.html
 SCSCC src/main.scss
 Точка входа src/main.js
 Собранные файлы build
```
