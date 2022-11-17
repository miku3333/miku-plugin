// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.less';
import './style/index.less';
import './style/normalize.less';
import './style/cd.less';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);