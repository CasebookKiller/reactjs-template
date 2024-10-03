# Шаблон Telegram Mini Apps на React

Этот шаблон демонстрирует, как разработчики могут реализовать одностраничное приложение на платформе Telegram Mini Apps, используя следующие технологии и библиотеки:

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
- [@telegram-apps SDK](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk)
- [Telegram UI](https://github.com/Telegram-Mini-Apps/TelegramUI)
- [Vite](https://vitejs.dev/)

> Шаблон создан с использованием [npm](https://www.npmjs.com/). Поэтому требуется использовать
> его и для этого проекта. Используя другие менеджеры пакетов, вы получите соответствующую ошибку.

## Установка Зависимостей

Если вы только что клонировали этот шаблон, вам следует установить зависимости проекта с помощью команды:


```Bash
npm install
```

## Скрипты

Этот проект содержит следующие скрипты:

- `dev`. Запускает приложение в режиме разработки.
- `build`. Создаёт рабочее приложение.
- `lint`. Запускает [eslint](https://eslint.org/), чтобы убедиться, что качество кода соответствует требуемым стандартам.
- `deploy`. Развертывает приложение на GitHub Pages.

Для запуска скрипта используйте команду `npm run`:

```Bash
npm run {script}
# Пример: npm run build
```

## Создание бота и мини-приложения

Прежде чем вы начнёте, у вас уже должен быть создан Телеграм Бот. Здесь [исчерпывающее руководство](https://docs.telegram-mini-apps.com/platform/creating-new-app) как это сделать.

## Запуск

Несмотря на то, что мини-приложения предназначены для открытия в [приложениях Telegram](https://docs.telegram-mini-apps.com/platform/about#supported-applications), вы все равно можете разрабатывать и тестировать их за пределами Telegram.

Чтобы запустить приложение в режиме разработки, используйте скрипт `dev`:

```bash
npm run dev
```

После этого вы увидите аналогичное сообщение в своем терминале:

```bash
VITE v5.2.12  ready in 237 ms

➜  Local:   http://localhost:5173/reactjs-template
➜  Network: http://172.18.16.1:5173/reactjs-template
➜  Network: http://172.19.32.1:5173/reactjs-template
➜  Network: http://192.168.0.171:5173/reactjs-template
➜  press h + enter to show help
```

Здесь вы можете увидеть ссылку `Local`, доступную локально, и ссылку `Network`, доступную для всех устройств в той же сети, что и текущее устройство.

Чтобы просмотреть приложение, вам необходимо открыть ссылку `Local` (в данном примере `http://localhost:5173/reactjs-template`) в вашем браузере:

![Приложение](assets/application.png)

Важно отметить, что некоторые библиотеки в этом шаблоне, такие как `@telegram-apps/sdk`, не предназначены для использования за пределами Telegram.

Тем не менее, они, по-видимому, функционируют должным образом. Это связано с тем, что файл `src/mock Env.ts`, который импортируется в точку входа приложения (`src/index.ts`), использует функцию `mockTelegramEnv` для имитации среды Telegram. Этот трюк убеждает приложение в том, что оно запущено в среде Telegram. Поэтому будьте осторожны и не используйте эту функцию в рабочем режиме, если вы полностью не понимаете ее последствий.

### Запуск внтури Telegram

Несмотря на то, что приложение можно запускать и за пределами Telegram, рекомендуется разрабатывать его внутри Telegram для наиболее точного представления его реальной функциональности.

Чтобы запустить приложение внутри Telegram, [@BotFather](https://t.me/botfather) требуется наличие HTTPS-ссылки.

Этот шаблон уже предоставляет решение.

Перейдите к файлу `video.config.ts` и раскомментируйте использование функции `basic Ssl`. Эта функция использует плагин [@vitejs/plugin-basic-ssl](https://www.npmjs.com/package/@vitejs/plugin-basic-ssl), который позволяет создавать HTTPS-ссылку. Обратите внимание, что этот плагин генерирует самозаверяющий сертификат, который браузеры распознают как небезопасный, что приводит к выдаче предупреждения при доступе к приложению.

После раскомментирования функции снова запустите скрипт `dev` и понаблюдайте за выводом в вашем терминале:

```bash
VITE v5.2.12  ready in 265 ms

➜  Local:   https://localhost:5173/reactjs-template
➜  Network: https://172.18.16.1:5173/reactjs-template
➜  Network: https://172.19.32.1:5173/reactjs-template
➜  Network: https://192.168.0.171:5173/reactjs-template
➜  press h + enter to show help
```

Перейдя по ссылке `Local` (в данном примере `https://localhost:5173/reactjs-template`) в своем браузере, вы увидите следующее предупреждение:

![SSL Warning](assets/ssl-warning.png)

Это обычное предупреждение браузера, и его можно спокойно игнорировать, пока сайт защищен. Нажмите кнопку `Перейти на локальный хостинг (небезопасный)`, чтобы продолжить и просмотреть приложение.

Как только приложение отобразится правильно, отправьте одну из ссылок `Network` в качестве ссылки на мини-приложение по адресу [@BotFather](https://t.me/botfather). Затем перейдите по ссылке [https://web.telegram.org/k/](https://web.telegram.org/k/), найдите свой сайт и запустите мини-приложение Telegram. Такой подход обеспечивает полный опыт разработки.

> **Важно**
>
> Поскольку мы используем самозаверяющие SSL-сертификаты, приложения Telegram для Android и iOS не смогут отображать приложение. В этих операционных системах применяются более строгие меры безопасности, что предотвращает загрузку мини-приложения. Чтобы устранить эту проблему, обратитесь к [этому руководству](https://docs.telegram-mini-apps.com/platform/getting-app-link#remote).

## Развёртывание

В этом шаблоне для внешнего размещения приложения используются GitHub Pages. GitHub Pages предоставляет CDN, который позволит вашим пользователям быстро получать приложение. В качестве альтернативы вы можете воспользоваться такими сервисами, как [Heroku](https://www.heroku.com/) или [Vercel](https://vercel.com).

### Ручное развёртывание

В этом шаблоне используется инструмент [gh-pages](https://www.npmjs.com/package/gh-pages), который позволяет развернуть ваше приложение прямо с вашего ПК.

#### Конфигурирование

Перед запуском процесса развертывания убедитесь, что вы выполнили следующие действия:

1. Заменилb значение `homepage` d `package.json`. Инструмент развертывания страниц на GitHub использует это значение для определения соответствующего проекта на GitHub.
2. Заменили значение `base` в `vite.config.ts` и присвоил ему имя вашего репозитория на GitHub. Vite будет использовать это значение при создании путей к статическим ресурсам.

Например, если ваше имя пользователя на GitHub - `telegram-mini-apps`, а имя репозитория - `is-awesome`, значение в поле `homepage` должно быть следующим:

```json
{
  "homepage": "https://telegram-mini-apps.github.io/is-awesome"
}
```

И `vite.config.ts` должен содержать следующее содержимое:

```ts
export default defineConfig({
  base: '/is-awesome/',
  // ...
});
```

You can find more information on configuring the deployment in the `gh-pages` [docs](https://github.com/tschaub/gh-pages?tab=readme-ov-file#github-pages-project-sites).
Вы можете найти более подробную информацию о настройке развертывания c `gh-pages` в [docs](https://github.com/tschaub/gh-pages?tab=readme-ov-file#github-pages-project-sites).

#### До развертывания

Before deploying the application, make sure that you've built it and going to deploy the fresh static files:

```bash
npm run build
```

Then, run the deployment process, using the `deploy` script:

```Bash
npm run deploy
```

After the deployment completed successfully, visit the page with data according to your
username and repository name. Here is the page link example using the data mentioned above:
https://telegram-mini-apps.github.io/is-awesome

### GitHub Workflow

To simplify the deployment process, this template includes a
pre-configured [GitHub workflow](.github/workflows/github-pages-deploy.yml) that automatically
deploys the project when changes are pushed to the `master` branch.

To enable this workflow, create a new environment (or edit the existing one) in the GitHub
repository settings and name it `github-pages`. Then, add the `master` branch to the list of
deployment branches.

You can find the environment settings using this
URL: `https://github.com/{username}/{repository}/settings/environments`.

![img.png](.github/deployment-branches.png)

In case, you don't want to do it automatically, or you don't use GitHub as the project codebase,
remove the `.github` directory.

### GitHub Web Interface

Alternatively, developers can configure automatic deployment using the GitHub web interface. To do
this, follow the link: `https://github.com/{username}/{repository}/settings/pages`.

## TON Connect

This boilerplate utilizes the [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
project to demonstrate how developers can integrate functionality related to TON cryptocurrency.

The TON Connect manifest used in this boilerplate is stored in the `public` folder, where all
publicly accessible static files are located. Remember
to [configure](https://docs.ton.org/develop/dapps/ton-connect/manifest) this file according to your
project's information.

## Useful Links

- [Platform documentation](https://docs.telegram-mini-apps.com/)
- [@telegram-apps/sdk-react documentation](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk-react)
- [Telegram developers community chat](https://t.me/devs)
