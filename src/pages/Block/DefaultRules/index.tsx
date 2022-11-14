import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { memo, useState } from 'react';
import './style.less'

const top = [
    { label: 'logo', value: '.m-logo' },
    { label: '识曲', value: '.j-listentosong' },
    { label: '头像区域', value: '.user.j-flag' },
    { label: 'VIP', value: '.tovip' },
    { label: '消息', value: '.itm.itm2.msg.j-flag' },
    { label: 'mini模式', value: '.icn.fix' },
]
const bottom = [
    { label: '播放顺序', value: '.type.f-cp' },
    { label: '歌词', value: '.word.f-cp' },
    { label: '音质', value: '.brt.f-vc' },
    { label: '打开音效', value: '.audioEffect' },
    { label: '一起听', value: '.listenTogether' },
    { label: '播放列表', value: '.list.f-vc.f-cp' },
    { label: '全屏', value: '.playfull' },
]
const side = [
    { label: '发现', value: '[data-id="/m/disc/"]' },
    { label: '播客', value: '[data-id="/m/podcast/"]' },
    { label: '视频', value: '.mv.j-flag' },
    { label: '关注', value: '.j-friend-entrant' },
    { label: '直播', value: '.look.j-flag' },
    { label: 'FM', value: '.fm.j-flag' },
    { label: '本地', value: '[data-id="/m/offline/"]' },
    { label: '最近', value: '[data-id="/m/history/"]' },
    { label: '云盘', value: '.cloud.j-flag' },
    { label: '我的播客', value: '.rdi.j-flag' },
    { label: '收藏', value: '.mix.j-flag' },
    { label: '歌单', value: '.j-hostplst' },
]
const find = [
    { label: '推荐tab', value: '.m-tabwrap' },
    { label: '顶部banner', value: '.m-banner' },
    { label: '热门播客', value: '[data-nej-selector*=__nProgram]' },
    { label: '听见好书', value: '[data-nej-selector*=__nAudioBook]' },
    { label: '独家放送', value: '[data-nej-selector*=__nExclusive]' },
    { label: '最新音乐', value: '[data-nej-selector*=__nNewSong]' },
    { label: '主题播客', value: '[data-nej-selector=__nThemePodcastContainer]' },
    { label: '推荐MV', value: '[data-nej-selector*=__nRecMV]' },
    { label: '听听', value: '[data-nej-selector*=__nVoiceLive]' },
    { label: '看看', value: '[data-nej-selector*=__nVoiceLive]' },
    { label: '调整顺序', value: '.m-adjustbar' },
]
const cd = [
    { label: '直播广告', value: '.g-singlec-live' },
    { label: '评论+推荐', value: '.g-bd2.f-cb' },
    { label: '评论', value: '.g-mn2.j-flag' },
    { label: '推荐', value: '.g-sd2.recommend.j-flag' },
    { label: '发评论', value: '.g-singlec-comment-detail' },
    { label: '返回顶部', value: '.g-singlec-comment-top' },
]

const DefaultRules = ({setDefaultRules}: {setDefaultRules: (strs: string[]) => void}) => {
    const changeCustom = (value: Array<CheckboxValueType>) => {
        localStorage.setItem('miku-block-default', JSON.stringify(value));
        setDefaultRules(value as string[])
    }
    const getCheckBoxes = (config: {label:string;value:string;}[], title: string) => {
        return (
            <div className="defaultRulesWrap">
                <div className="title">{title}</div>
                <div className="rules">
                    {
                        config.map(({ label, value }) => (
                            <Checkbox value={value}>{label}</Checkbox>
                        ))
                    }
                </div>
            </div>
        )
    }
    return (
        <Checkbox.Group
            defaultValue={JSON.parse(localStorage.getItem('miku-block-default') || '[]')}
            onChange={changeCustom}
        >
            {getCheckBoxes(top, '顶部')}
            {getCheckBoxes(bottom, '底部')}
            {getCheckBoxes(side, '侧边栏')}
            {getCheckBoxes(find, '发现音乐')}
            {getCheckBoxes(cd, 'cd页')}
        </Checkbox.Group>
    );
};

export default memo(DefaultRules);
