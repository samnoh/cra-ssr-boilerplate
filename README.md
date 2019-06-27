# CRA + SSR Boilerplate

-   create-react-app (ejected)
-   express
-   code splitting (@loadable/component)
-   redux-saga
-   react-router-dom
-   react-helmet

## Install Packages

```shell
npm install
```

## Build

```shell
npm run build
npm run build:server
```

## Start

```shell
npm run start:server
```

## SSR

-   `<Preloader resolve={dispatch()} />`
-   If you do not want SSR for specific pages, just do not add `<Preloader .../>

```javascript
import { Preloader } from '../lib/preloaderContext'
...
<User user={user} loading={loading} />
<Preloader resolve={() => getUser(id)} />
```
