import { useCallback, useState } from 'react';
import './style/App.less';
import { Layout, Menu } from 'antd';
import {  CloseCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  useNavigate, NavLink as Link, Outlet, Routes, Route } from 'react-router-dom';
import Block from './pages/Block';
import About from './pages/About';
import { btnClick } from './utils';

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
    getItem('屏蔽', '/block',  <SafetyCertificateOutlined />),
    getItem('关于', '/about', <div className='miku'></div>),
    getItem('关闭', '/close', <CloseCircleOutlined />)
];

function App() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true);
    const menuClick = useCallback((item: any) => {
        if (item.key === '/close') {
            btnClick()
            return
        }
        navigate(item.key)
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
                        <Route path='/' element={<Block/>} />
                        <Route path='/block' element={<Block/>} />
                        <Route path='/about' element={<About/>} />
                        <Route path='*' element={<Block/>} />
                    </Routes>
                    <Outlet />
                </Layout>
            </Layout>

        </div>
    );
}

export default App;
