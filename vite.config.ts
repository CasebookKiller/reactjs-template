import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/reactjs-template',
  plugins: [
    // Позволяет использовать React dev server наряду с созданием приложения React с помощью Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Позволяет использовать свойство compiler Options.paths в файле tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    // Позволяет использовать самозаверяющие сертификаты для запуска сервера разработки по протоколу HTTPS.
    // https://www.npmjs.com/package/@vitejs/plugin-basic-ssl
    // basicSsl(),
  ],
  publicDir: './public',
  server: {
    // Предоставляет доступ к вашему серверу разработки и делает его доступным для устройств в той же сети.
    host: true,
  },
});

