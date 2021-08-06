# kamushki-server

Серверная часть приложения.

Стек: [Fastify](https://www.fastify.io), [MongoDB Node Driver](https://docs.mongodb.com/drivers/node/current/), а также [esbuild](https://esbuild.github.io) (для сборки)

### Окружение

Все переменные окружения, необходимые для работы приложения, необходимо указать в файле `.env` (скопируйте `.env.example` и переименуйте).

Для работы капчи необходимо получить серверный ключ reCAPTCHA v2, и установить в переменную `API_RECAPTCHA_SERVER_KEY`.

Ключ авторизации (по которому можно авторизоваться в админке) также задаётся через переменную `SERVER_AUTH_KEY`.

Для работы MongoDB, необходимо указать переменные `DB_CONNECTION_STRING` в формате [Connection String URI](https://docs.mongodb.com/manual/reference/connection-string/), а также `DBNAME`, содержаший имя базы данных.

На продакшен-сервере эти переменные также должны присутствовать в окружении.

Запуск сервера осуществляется командой `npm start`, но перед этим его надо собрать.

### Cборка

Сборка осуществляется командой `npm run build`.

При сборке, модули `fastify-swagger` (для работы Swagger) и `saslprep` (чтобы MongoDB [не ругался](https://www.mongodb.com/community/forums/t/suppress-saslprep-warning/13354)) объявляются как "внешние", поэтому они перечислены в файле `package-dist.json` (копируется в `dist` как `package.json`) как зависимости. На сервере, где вы будете разворачивать приложение, будет необходимо выполнить `npm install`, чтобы их доставить.

Также, при сборке осуществляется копирование в `dist` директории со статикой `src/static`.

При полной сборке приложения, в директорию `dist/client-files` копируются файлы собранного клиента `kamushki-client`.
