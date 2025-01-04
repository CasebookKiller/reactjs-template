# Шаблон Telegram Mini Apps на React

Этот шаблон демонстрирует, как разработчики могут реализовать одностраничное приложение на платформе Telegram Mini Apps, используя следующие технологии и библиотеки:

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
- [@telegram-apps SDK](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk)
- [Telegram UI](https://github.com/Telegram-Mini-Apps/TelegramUI)
- [Supabase](https://supabase.com/)
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

В папке проекта создайте файл .env.local и добавьте в него переменную:

```bash
VITE_BOT_TOKEN='<ваш BOT_TOKEN>'
```

## Настройка Supabase

### 1. Создание нового проекта Supabase

Зарегистрируйтесь в Supabase - [https://app.supabase.com](https://app.supabase.com) и [https://supabase.com/dashboard/projects](создайте новый проект). Подождите пока база данных будет готова к использованию.

### 2. Запуск "User Management" Quickstart (Быстрый запуск)

Как только ваша база данных будет запущена, перейдите в `SQL Editor` вашего проекта. На странице `SQL editor` вставьте следующий код:

```sql
-- Create the table
create table ids (
  id bigint primary key generated always as identity,
  tgid text not null,
  created_at timestamp with time zone not null default now()
);

alter table ids enable row level security;
```

Сделайте данные в вашей таблице общедоступными, добавив политики RLS:
```sql
create policy "public can read ids"
on public.ids
for select to anon
using (true);
```

```sql
create policy "paublic can insert ids"
on public.ids
for insert to anon
using (true)
with check (true);
```

### 3. Создание TypeScript-типов для Supabase

Для удобства работы с Supabase в TypeScript можно использовать типы, которые автоматически генерируются на основе вашей базы данных. Вы можете использовать [Supabase Types](https://supabase.com/docs/guides/api/rest/generating-types) для создания типов для вашей базы данных.

### 4. Получение URL-адрес и Ключ

Перейдите в настройки проекта (значок шестеренки), откройте вкладку API и найдите свой URL API и ключ `anon`, они понадобятся вам на следующем шаге.

Ключ `anon` - это ваш API-ключ на стороне клиента. Он обеспечивает "анонимный доступ" к вашей базе данных до тех пор, пока пользователь не выполнит вход в систему. Как только пользователь выполнит вход, ключи будут заменены на собственный токен входа пользователя. Это обеспечивает защиту ваших данных на уровне строк. Подробнее об этом читайте [ниже](#postgres-row-level-security).

![image](https://user-images.githubusercontent.com/10214025/88916245-528c2680-d298-11ea-8a71-708f93e1ce4f.png)

**_ПРИМЕЧАНИЯ_**: Ключ `service_role` предоставляет полный доступ к вашим данным в обход любых политик безопасности. Эти ключи должны храниться в секрете и предназначены для использования в серверных средах и никогда - на клиенте или в браузере.

### 5. Настройка секретов (и переменных среды)

На предыдущих шагах вы создали проект Supabase с базой данных и таблицу `profiles`. Вы также получили URL-адрес и ключ для вашего проекта. Теперь они будут предоставлены в качестве конфигурации для проекта.

Для развертывания в облаке: Создайте [зашифрованные секретные данные для вашего репозитория](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository), используя следующие имена:

- `VITE_SUPABASE_URL` для URL вашего проекта.
- `VITE_SUPABASE_ANON_KEY` для ключа `anon` вашего проекта.

### 6. Отредактуируте SupabasePage.tsx

В папке `src/pages/SupabasePage` отредактируйте файл `SupabasePage.tsx`.

## Запуск

Несмотря на то, что мини-приложения предназначены для открытия в [приложениях Telegram](https://docs.telegram-mini-apps.com/platform/about#supported-applications), вы все равно можете разрабатывать и тестировать их за пределами Telegram.

Перед запуском проекта в режиме разработки отредактируйте файл src/mockEnv.ts, для корректной работы лучше использовать данные настоящего пользователя.

Для работы шаблона достаточно указать в нем ID пользователя, которого вы хотите использовать в приложении,  в переменной `VITE_MOCK_USER_ID` в файле `.env.local`.

```ts
  const initDataRaw = new URLSearchParams([
    ['user', JSON.stringify({
      id: import.meta.env.VITE_MOCK_USER_ID || 99281932,
      first_name: 'Ivan',
      last_name: 'Petrov',
      username: 'petrov',
      language_code: 'ru',
      is_premium: true,
      allows_write_to_pm: true,
    })],
    ['signature', 'wP0hiNsZtrjRu_f8IE9rbgjic-lnFm4MoSBPKhMvOtZgJDqA8SSQN421SsnqxQResAsZaShR4eUuL4WKUAQLCQ'],
    ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
    ['auth_date', '1716922846'],
    ['start_param', 'debug'],
    ['chat_type', 'sender'],
    ['chat_instance', '8428209589180549439'],
  ]).toString();
```

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

Вы можете найти более подробную информацию о настройке развертывания c `gh-pages` в [docs](https://github.com/tschaub/gh-pages?tab=readme-ov-file#github-pages-project-sites).

#### До развертывания

Перед развертыванием приложения убедитесь, что вы его собрали, и приступайте к развертыванию новых статических файлов:

```bash
npm run build
```

Затем запустите процесс развертывания, используя сценарий `deploy`:

```Bash
npm run deploy
```

После успешного завершения развертывания перейдите на страницу с данными, указанными в соответствии с вашим именем пользователя и названием хранилища. Вот пример ссылки на страницу с использованием указанных выше данных: 
https://telegram-mini-apps.github.io/is-awesome

### Рабочий процесс GitHub (Workflow)

Чтобы упростить процесс развертывания, этот шаблон включает предварительно настроенный [GitHub Workflow](.github/workflows/github-pages-deploy.yml), который автоматически развертывает проект, когда изменения передаются в ветку `master`.

Чтобы включить этот рабочий процесс, создайте новую среду (или отредактируйте существующую) в
настройках репозитория GitHub и назовите ее `github-pages`. Затем добавьте ветку `master` в список ветвей
развертывания.

Вы можете найти настройки среды, используя этот URL-адрес: `https://github.com/{username}/{repository}/settings/environments`.

![img.png](.github/deployment-branches.png)

Если вы не хотите делать это автоматически или не используете GitHub в качестве кодовой базы проекта, удалите каталог `.github`.

### Веб-интерфейс GitHub

В качестве альтернативы разработчики могут настроить автоматическое развертывание с помощью веб-интерфейса GitHub. Для этого перейдите по ссылке: `https://github.com/{username}/{repository}/settings/pages`.

### (Необязательно) Сохраните исходный код приложения React на GitHub

На предыдущем шаге пакет npm `gh-pages` отправил распространяемую версию приложения React в ветку с именем `gh-pages` в репозитории GitHub. Однако _source code_ приложения React еще не сохранен на GitHub.

На этом шаге я покажу вам, как вы можете сохранить исходный код приложения React на GitHub.

* Зафиксируйте изменения, которые вы внесли, следуя этому руководству, в ветке `master` локального репозитория Git; затем переместите эту ветку в ветку `master` репозитория GitHub.

  ```shell
  $ git add .
  $ git commit -m "Configure React app for deployment to GitHub Pages"
  $ git push origin master
  ```

  На этом этапе я рекомендую изучить репозиторий GitHub. У него будет две ветки: `master` и `gh-pages`. Ветка `master` будет содержать исходный код приложения React, в то время как ветка `gh-pages` будет содержать распространяемую версию приложения React.

  После обновления и для сохранения новой версии исходного кода используйте:

  ```shell
  $ git add .
  $ git commit -m "Some text describing the update"
  $ git push
  ```

## TON Connect

В этом шаблоне используется проект [TO Connect](https://docs.ton.org/develop/apps/to-connect/overview), чтобы продемонстрировать, как разработчики могут интегрировать функциональность, связанную с криптовалютой TON.

Манифест ДЛЯ подключения, используемый в этом шаблоне, хранится в папке `public`, где находятся все общедоступные статические файлы. Не забудьте [configure](https://docs.ton.org/develop/apps/to-connect/manifest) этот файл в соответствии с информацией о вашем проекте.

## Полезные ссылки

- [Документация по платформе](https://docs.telegram-mini-apps.com/)
- [Документация @telegram-apps/sdk-react](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk-react)
- [Чат сообщества разработчиков Telegram](https://t.me/devs)
