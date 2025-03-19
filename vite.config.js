import { defineConfig, loadEnv } from 'vite'
const { resolve } = require('path')
import createVitePlugins from './vite/plugins'
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE } = env
  return defineConfig({
    base: VITE_APP_BASE,
    devServer: {
      port: 8080,
      proxy: {
        "/apis": {
          target: "https://app.quanshixintuo.com/",
          ws: true,
          pathRewrite: {
            "^/apis": "/apis",
          },
        },
      },
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        "@": resolve(__dirname, "./src"),
        "components": resolve(__dirname, "./src/components"),
        "styles": resolve(__dirname, "./src/styles"),
        "utils": resolve(__dirname, "./src/utils"),
      }
    },
    plugins: createVitePlugins(env, command === 'build'),
  })
}
