import { GithubOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { useState } from 'react';
import './style.less';


const About = () => {
    return (
        <div className="about">
            <a target="_blank" href="https://github.com/miku3333/ncm-plugin" className="github">
                <GithubOutlined />
                有想要的功能欢迎来提Issue, 顺便点个star
            </a>
            <div className="title">目前拥有的功能</div>
            <Checkbox defaultChecked disabled>禁用不想要的组件</Checkbox>
            <Checkbox defaultChecked disabled>点击cd唱头时播放/暂停</Checkbox>
            <Checkbox defaultChecked disabled>cd可以转动</Checkbox>
            <Checkbox defaultChecked disabled>自定义字体</Checkbox>
            <Checkbox defaultChecked disabled>自定义颜色</Checkbox>
            <div className="title">将要做的功能</div>
        </div>
    );
};

export default About;
