# kamushki

Веб-приложение для проведения конкурса Two Weeks Game.

Изначально разработано для конкурса [TWG 2.0](https://20.twg.host).

---

## Описание

Данный репозиторий является монорепозиторием. Для работы с ним используется [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces), доступные только с 7 версии npm.

Приложение написано на TypeScript.

### [kamushki-client](packages/client)

Клиентская часть приложения.

Стек: [React](https://reactjs.org), [Redux Toolkit](https://redux-toolkit.js.org), [Vite](https://vitejs.dev)

### [kamushki-server](packages/server)

Серверная часть приложения.

Стек: [Fastify](https://www.fastify.io), [MongoDB Node Driver](https://docs.mongodb.com/drivers/node/current/), а также [esbuild](https://esbuild.github.io) (для сборки)

---

## Сборка

Полная сборка приложения осуществляется командой `npm run assemble`.

Сначала выполняется сборка клиента (`kamushki-client`), затем бекенда (`kamushki-server`). Файлы клиента копируются в `dist`-директорию бэкенда.

Деплой осуществляется через Github Pages. Для работы необходимо указать в репозитории секреты `FTP_HOSTNAME`, `FTP_USERNAME` и `FTP_PASSWORD`. Также, необходимо в секретах прописать клиентский ключ от reCAPTCHA v2 (переменная `RECAPTCHA_V2_CLIENT_KEY`).

-   Workflow находится здесь: `.github/workflows/build-and-deploy.yml`

В качестве места размещения рекомендуется [хостинг от NetAngels](https://www.netangels.ru/hosting/?p_ref=u71045), он позволяет развернуть всё нужное для приложения окружение. В дальнейшем, будет написана инструкция по "быстрому старту" для работы с приложением.

---

## Лицензия

[Лицензия MIT](LICENSE.txt).
