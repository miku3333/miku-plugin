import { useCallback, useEffect, useRef, useState } from 'react';
import './style/App.less';
import { Layout, Menu, MenuProps } from 'antd';
import { CloseCircleOutlined, HighlightOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate, NavLink as Link, Outlet, Routes, Route } from 'react-router-dom';
import Block from './pages/Block';
import About from './pages/About';
import { btnClick } from './utils';
import Style from './pages/Style';
import { PERFIX, setStyleDom, styleDom } from './constant';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label: <Link to={`${key}`}>{label}</Link>
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('屏蔽', '/block', <SafetyCertificateOutlined />),
    getItem('样式', '/style', <HighlightOutlined />),
    getItem('关于', '/about', <div className='miku'></div>),
    getItem('关闭', '/close', <CloseCircleOutlined />)
];

function App() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true);
    const menuClick = useCallback((item: any) => {
        if (item.key === '/close') {
            btnClick();
            return;
        }
        navigate(item.key);
    }, []);

    // Style页面的effect需要在首页时立即执行, 而不能进入页面后才执行
    useEffect(() => {
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        const styleSheet = document.head.appendChild(style);
        setStyleDom(styleSheet);
        let styleInner = '';
        let placeholder = '';
        [
            {
                label: '字体',
                name: 'font-family',
                placeholder: '字体的中文名或英文名(可在word中查看)'
            },
            {
                label: '字体颜色',
                name: 'color',
                placeholder: '16进制#39c5bb[cc](中括号内为透明度, 可选)或rgb(57, 197, 187)或rgba(57, 197, 187, 0.8)'
            }
        ].forEach(({ name }) => {
            const value = localStorage.getItem(`${PERFIX}-${name}`) || '';
            styleInner += `${name}: ${value} !important;`;
            if (name === 'color') {
                styleInner += `fill: ${value} !important;`
                placeholder = `input::placeholder{color: ${value} !important;}`
            }
        });
        styleSheet.innerHTML = `*{${styleInner}}${placeholder}`;
    }, []);

    return (
        <div className='App'>
            <Layout style={{ height: '100%' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <div className='logo' />
                    <Menu onClick={menuClick} theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
                </Sider>
                <Layout className='mikuContent' style={{ padding: '20px' }}>
                    <Routes>
                        <Route path='/' element={<Block />} />
                        <Route path='/block' element={<Block />} />
                        <Route path='/style' element={<Style />} />
                        <Route path='/about' element={<About />} />
                        <Route path='*' element={<Block />} />
                    </Routes>
                    <Outlet />
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
