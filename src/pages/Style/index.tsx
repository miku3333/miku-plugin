import { Form, Input, Select } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IS_DEV, PERFIX, setStyleDomContent } from '../../constant';
import { SketchPicker, ColorResult } from 'react-color';
import { BgColorsOutlined } from '@ant-design/icons';
import "./style.less"
const { Item } = Form;

const STYLE_CONFIG = [
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
];

const Style = () => {
    // const styleSheet = useRef<HTMLStyleElement | null>(styleDom);
    // useEffect(() => {
    //     const style = document.createElement('style');
    //     style.setAttribute('type', 'text/css');
    //     styleSheet.current = document.head.appendChild(style);
    //     let styleInner = '';
    //     STYLE_CONFIG.forEach(({ name }) => {
    //         const value = localStorage.getItem(`${PERFIX}-${name}`) || '';
    //         styleInner += `${name}: ${value} !important;`;
    //     });
    //     styleSheet.current.innerHTML = `*{${styleInner}}`;
    //     styleDom?.remove();
    // }, []);
    const initialValues = useRef(STYLE_CONFIG.reduce((pre: { [key: string]: any }, { name }) => {
        pre[name] = localStorage.getItem(`${PERFIX}-${name}`) || '';
        return pre;
    }, {}));

    const [fonts, setFonts] = useState<string[]>(JSON.parse(localStorage.getItem(`${PERFIX}-fonts`) || '[]'));
    const fontOptions = useMemo(() => fonts.map(item => ({ value: item, label: item })), [fonts]);
    const updateFonts = useCallback(() => {
        const clickE = document.createEvent('MouseEvents');
        clickE.initEvent('click', true, true);
        document.querySelector('.itm.itm2.set')!.dispatchEvent(clickE);
        const timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            // @ts-ignore
            const fonts = [...document.querySelector('.u-select-fonts').querySelector('.select').children].map(item => item.innerText)
            // 删除默认字体
            fonts.shift();
            localStorage.setItem(`${PERFIX}-fonts`, JSON.stringify(fonts));
            setFonts(fonts);
        }, 500)
    }, []);
    useEffect(() => {
        !IS_DEV && updateFonts();
    }, []);

    const [formValue, setFormValue] = useState({});
    const [form] = Form.useForm();
    const formChange = useCallback((_: any, allValues: any) => {
        setFormValue(allValues);
        setPickerColor(allValues.color);
    }, []);
    const init = useRef(true);
    useEffect(() => {
        if (init.current) {
            init.current = false
        }
        else {
            let style = '';
            Object.keys(formValue).forEach(name => {
                const value = formValue[name as keyof typeof formValue];
                localStorage.setItem(`${PERFIX}-${name}`, value);
                style += `${name}: ${value} !important;`;
                if (name === 'color') {
                    style += `fill: ${value} !important;`
                }
            });
            setStyleDomContent(`*{${style}}`)
        }
    }, [formValue]);

    const [pickerVisable, setPickerVisable] = useState(false);
    const changePickerVisable = useCallback(() => setPickerVisable(pickerVisable => !pickerVisable), []);
    const [pickerColor, setPickerColor] = useState('');
    const pickerColorChange = useCallback((color: ColorResult) => {
        setPickerColor(color.hex);
        setFormValue({ ...formValue, color: color.hex });
        form.setFieldsValue({ ...formValue, color: color.hex })
    }, [formValue]);

    return (
        <div>
            <Form form={form} labelCol={{ span: 2 }} initialValues={initialValues.current} onValuesChange={formChange}>
                <Item key='font-family' name='font-family' label='字体'>
                    <Select
                        showSearch
                        allowClear
                        placeholder="字体的中文名或英文名"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={fontOptions}
                    />
                </Item>
                <Item key='color' name='color' label='字体颜色'>
                    <Input.Search
                        onSearch={changePickerVisable}
                        enterButton={(
                            <div>
                                <BgColorsOutlined />取色器
                            </div>
                        )}
                        allowClear
                        placeholder='16进制#39c5bb[cc](中括号内为透明度, 可选)或rgb(57, 197, 187)或rgba(57, 197, 187, 0.8)'
                    />
                </Item>
                <div className="pickerOuter">
                    {pickerVisable && (
                        <div className="picker">
                            <SketchPicker color={pickerColor} onChange={pickerColorChange} />
                        </div>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default Style;
