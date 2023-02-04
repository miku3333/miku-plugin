const btnClick = () => {
    const root = document.querySelector('#root');
    if (root.style.display === 'none') {
        root.style.display = 'block';
    } else {
        root.style.display = 'none';
    }
};

betterncm.utils.waitForElement('.g-mn').then(() => {
    const btn = document.createElement('li');
    btn.className = 'fx j-flag fsection pluginManage';
    const a = btn.appendChild(document.createElement('a'));
    a.style.paddingLeft = '30px';
    btn.children[0].innerHTML =
        '<svg width="26" height="26" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4L18 10H10V18L4 24L10 30V38H18L24 44L30 38H38V30L44 24L38 18V10H30L24 4Z" fill="none" stroke="#ffffffcc" stroke-width="4" stroke-linejoin="round"/><path d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z" fill="none" stroke="#ffffffcc" stroke-width="4" stroke-linejoin="round"/></svg>插件管理';
    btn.addEventListener('click', btnClick);
    const sys = document.querySelector('.sys');

    if (localStorage.getItem(`miku-plugin-menu-visable`) === 'false') {
        btn.style.display = 'none';
    } else {
        btn.style.display = 'block';
    }

    sys.appendChild(btn);
});

plugin.onConfig(() => {
    const element = document.createElement('div');
    element.innerHTML = '点击这行文本关闭/打开侧边栏的插件管理';
    element.addEventListener('click', () => {
        const ele = document.querySelector('.fx.j-flag.fsection.pluginManage');
        if (ele) {
            if (ele.style.display === 'none') {
                localStorage.setItem('miku-plugin-menu-visable', 'true');
                ele.style.display = 'block';
            } else {
                localStorage.setItem('miku-plugin-menu-visable', 'false');
                ele.style.display = 'none';
            }
        }
    });
    return element;
});
