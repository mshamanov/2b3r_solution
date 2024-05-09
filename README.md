# Сервис конвертации валют

### Требования:

<p align="justify">
Необходимо разработать одностраничный сервис для конвертации валют. 
Для получения актуальной информации нужно воспользоваться открытым API, например, 
<a href="https://www.exchangerate-api.com/docs/free/" title="exchangerate-api">этим</a>.  
У пользователя должна быть возможность выбрать пару валют и ввести сумму конвертации. 
При вводе чисел должен происходить реактивный перерасчет.
Важным условием этой задачи является наличие двух полей для ввода. Пользователь может ввести в произвольное и тогда значение в другом должно поменяться.
</p>

## Технологии/зависимости

В рамках проекта используется:<br>
![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### Среда разработки

Можно использовать [VS Code](https://code.visualstudio.com), либо любую другую
совместимую с
вышеуказанными технологиями среду разработки.

## Запуск приложения

Для запуска приложения, необходимо сначала скачать его:

```
git clone https://github.com/mshamanov/currency_converter.git
```

Далее, перейти в папку с исходными файлами и запустить команду:

```
npm install
```

Данная команда установит все необходимые зависимости для запуска приложения.<br>
После этого, можно запустить vite в режиме разработчика командой:

```
npm run dev
```

Далее перейти по адресу, указанному в вашем терминале/консоле. <br>
В том случае, если никакие исходные настройки не менялись, адрес будет
таким:<br>
http://localhost:5173/currency_converter

Для того, чтобы создать сборку проекта из исходных файлов, необходимо запустить
команду:

```
npm run build
```

## Демо

Для того, чтобы посмотреть работу приложения, необязательно что-либо скачивать и
устанавливать, можно просто перейти по
ссылке: https://mshamanov.github.io/currency_converter

## Лицензия

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)