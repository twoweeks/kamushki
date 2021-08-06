# kamushki-client

Клиентская часть приложения.

Стек: [React](https://reactjs.org), [Redux Toolkit](https://redux-toolkit.js.org), [Vite](https://vitejs.dev)

### Окружение

Для работы капчи необходимо получить клиентский ключ reCAPTCHA v2, и установить его в файле `.env` (скопируйте `.env.example` и переименуйте).

Запустить сервер разработчика можно командой `npm start`. В этом режиме запросы не идут напрямую на бекенд `kamushki-server`, а проксируются (для нормальной работы кук).

Все настройки Vite можно найти в файле `vite.config.ts`.

### Сборка

-   `npm run build`
