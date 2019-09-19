# About

Web-application gets json data from api and display in table.

     http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}hone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}

There is an opportunity to search by Id, First Name and Last Name.

Click on row to get more person info in modal.


Создаем package.json файл для управления зависимостями проекта

  yarn init -y   -

Устанавливаем локальный webpack

  yarn add webpack -D

Устанавливаем файл конфигурации для webpack, где будем писать инструкции

  touch webpack.config.js

Задаем скрипты

  "scripts": {
    "start": "webpack"
  },

Устанавливаем html плагин

  yarn add html-webpack-plugin -D

Флаг -D сохраняет зависимость в devDependencies
В файл webpack.config.js добавили
<!--
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const PATHS = {
      source: path.join(__dirname, 'source'),
      build: path.join(__dirname, 'build')
  };
  module.exports = {
      entry: PATHS.source + '/index.js',
      output: {
          path: PATHS.build,
          filename: '[name].js'
      },
      plugins: [
          new HtmlWebpackPlugin({
              title: 'Webpack app'
          })
      ]
  }; -->

Установим простой локальный сервер, чтобы посмотерть работу webpack в браузере

  yarn add node-static -D

Добавим новый npm скрипт, котор будет запускать локальный сервер в папке bulid

  "scripts": {
    "start": "webpack",
    "serv": "static build"
  },

Запустить лок сервер

  yarn run serv

Webpack может следить за изменением файлов и аавтоматически пересобирать бандл

  "scripts": {
  "start": "webpack --watch",
  "serv": "static build"
  },

В разных окнах терминала запустим

  yarn run start  для отслеживания изменений и выводв     резульатов
  yarn run serv запускаем сервер, но пока нет живой преезагрузки браузера
