import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import { LessPluginRemoveAntdGlobalStyles } from 'less-plugin-remove-antd-global-styles'

export default defineConfig({
    plugins: [
        react(),
        vitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    style: name => `antd/es/${name}/style`
                }
            ]
        })
    ],
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
