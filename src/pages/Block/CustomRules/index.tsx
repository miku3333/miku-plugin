import TextArea from 'antd/lib/input/TextArea';
import { ChangeEventHandler, memo } from 'react';
import "./style.less"

const CustomRules = ({setCustomRules}: {setCustomRules: (str: string) => void}) => {
    const changeCustom: ChangeEventHandler<HTMLTextAreaElement> = e => {
        const str = e.target.value;
        localStorage.setItem('miku-block-custom', str);
        setCustomRules(str);
    }
    return (
        <div>
            <a className='article' href="https://www.jianshu.com/p/99173afa8800?utm_campaign=maleskine...&utm_content=note&utm_medium=seo_notes">自己写css选择器, 按行分隔, 每行的"/"及其后面内容会被识别为注释, 不会的可以查看这个链接</a>
            <div id='train'>试试清除这行文字以及下面的顶针和丽丽吧!</div>
            <img
                className='YiGeLiNaMi'
                src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.dtstatic.com%2Fuploads%2Fblog%2F202103%2F01%2F20210301202406_589cb.thumb.400_0.png&refer=http%3A%2F%2Fc-ssl.dtstatic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671028554&t=5cd1bda123c386a0fb6bafcc75c21e2c'
            />
            <img
                className='WoCeNiMenMa'
                src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14644773746%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671028634&t=d3c2bef1ca9c580a351a94f8e2a7f3a8'
            />
            <TextArea autoSize placeholder='输入你的过滤规则' onChange={changeCustom} defaultValue={localStorage.getItem('miku-block-custom') || ''} />
        </div>
    );
};

export default memo(CustomRules);
