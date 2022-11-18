import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import { LessPluginRemoveAntdGlobalStyles } from 'less-plugin-remove-antd-global-styles'
import { swcReactRefresh } from 'vite-plugin-swc-react-refresh'

export default defineConfig({
    plugins: [
        swcReactRefresh(),
        vitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    style: name => `antd/es/${name}/style`
                }
            ]
        })
    ],
    esbuild: {
        jsx: 'automatic'
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                plugins: [new LessPluginRemoveAntdGlobalStyles()],
            }
        }
    },
    build: {
        outDir: '../test',
        rollupOptions: {
            input: 'src/main-prod.tsx',
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`,
                format: 'umd'
            },
        }
    }
});
