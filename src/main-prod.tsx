// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.less';
import './style/index.less';
import './style/normalize.less';
import './style/cd.less';
import { BrowserRouter } from 'react-router-dom';
import { btnClick } from './utils';

plugin.onAllPluginsLoaded(async function (plugins) {
    await plugins.StylesheetLoader.loadStylesheet(plugin, this.pluginPath + '/main-prod.css', 'miku-plugin', {});
});

// 点击cd唱头时播放/暂停
// 需要将唱头的默认css属性修改为 pointer-events: auto;
betterncm.utils.waitForElement('.cdrun').then(() => {
    const clickE = document.createEvent('MouseEvents');
    clickE.initEvent('click', true, true);
    const playBtn = document.querySelector('.btnp');
    const cdClick = () => {
        
        playBtn.dispatchEvent(clickE);
    };
    
    document.querySelector('.cdrun').addEventListener('click', cdClick);
});

// 点击发现音乐直接播放推荐音乐
// betterncm.utils.waitForElement('.u-cover-daily').then(() => {
//     const clickE = document.createEvent('MouseEvents');
//     clickE.initEvent('click', true, true);
//     const dailyBtn = document.body.appendChild(document.querySelector('.u-cover-daily').querySelector('.ply'));
//     dailyBtn.style.display = 'none';
//     let targetBtn = null;
//     try {
//         document.querySelectorAll('.fsection').forEach(item => {
//             if (item.dataset.id === '/m/disc/') {
//                 targetBtn = item;
//                 throw new Error();
//             }
//         });
//     } catch (e) {
//         console.log(e);
//     }
//     const targetClick = e => {
//         e.preventDefault();
//         dailyBtn.dispatchEvent(clickE);
//     };
//     targetBtn.addEventListener('click', targetClick, true);
// });

// cd可以转动
betterncm.utils.waitForElement('.cdwrap').then(() => {
    const cd = document.querySelector('.cdwrap');
    const cdbox = document.querySelector('.cdbox');
    const cdimg = document.querySelector('.cdimg');
    let isMove = false;
    const getDragAngle = (event) => {
        const element = cdbox;
        const startAngle = parseFloat(element.dataset.angle) || 0;
        const center = {
            x: parseFloat(element.dataset.centerX) || 0,
            y: parseFloat(element.dataset.centerY) || 0
        };
        const angle = Math.atan2(center.y - event.clientY, center.x - event.clientX);
        return angle - startAngle;
    }
    cd.addEventListener('mousedown', (event) => {
        const element = cdbox;
        const rect = element.getBoundingClientRect();
        const angle = getDragAngle(event)
        cdbox.dataset.centerX = rect.left + rect.width / 2;
        cdbox.dataset.centerY = rect.top + rect.height / 2;
        cdbox.dataset.angle = angle;
        cdimg.dataset.centerX = rect.left + rect.width / 2;
        cdimg.dataset.centerY = rect.top + rect.height / 2;
        cdimg.dataset.angle = angle;
        isMove = true;
    })
    cd.addEventListener('mousemove', (event) => {
        if (isMove) {
            const angle = getDragAngle(event);
            cdbox.style.transform = 'rotate(' + angle + 'rad)';
            cdimg.style.transform = 'translate3d(-50%, -50%, 0) rotate(' + angle + 'rad)';
        }
    });
    cd.addEventListener('mouseup', (event) => {
        isMove = false;
        cdbox.dataset.angle = getDragAngle(event);
        cdimg.dataset.angle = getDragAngle(event);
    });
    cd.addEventListener('mouseout', (event) => {
        isMove = false;
        cdbox.dataset.angle = getDragAngle(event);
        cdimg.dataset.angle = getDragAngle(event);
    });

});

betterncm.utils.waitForElement('.g-mn').then(() => {
    const reactRoot:HTMLDivElement = document.querySelector('#root') || document.createElement('div');
    reactRoot.id = 'root';
    
    const root = document.body.appendChild(reactRoot);
    root.style.display = 'none'

    const sys = document.querySelector('.sys');
    const btn = sys!.appendChild(document.createElement('li'));
    btn.className = 'fx j-flag fsection pluginManage';
    btn.appendChild(document.createElement('a'));
    
    btn.children[0].innerText = '插件管理';
    btn.addEventListener('click', btnClick);
    ReactDOM.createRoot(root as HTMLElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
})
