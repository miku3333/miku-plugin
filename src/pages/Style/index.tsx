import { Form, Input } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PERFIX } from '../../constant';
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
const initialValues = STYLE_CONFIG.reduce((pre: { [key: string]: any }, { name }) => {
    pre[name] = localStorage.getItem(`${PERFIX}-${name}`) || '';
    return pre;
}, {});

const Style = () => {
    const styleSheet = useRef<any>(null);
    useEffect(() => {
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        styleSheet.current = document.head.appendChild(style);
        let styleInner = '';
        STYLE_CONFIG.forEach(({ name }) => {
            const value = localStorage.getItem(`${PERFIX}-${name}`) || '';
            styleInner += `${name}: ${value} !important;`;
        });
        styleSheet.current.innerHTML = `*{${styleInner}}`;
    }, []);

    const [formValue, setFormValue] = useState({});
    const [form] = Form.useForm();
    const formChange = useCallback((_: any, allValues: any) => {
        setFormValue(allValues);
    }, []);
    useEffect(() => {
        let style = '';
        Object.keys(formValue).forEach(name => {
            const value = formValue[name as keyof typeof formValue];
            localStorage.setItem(`${PERFIX}-${name}`, value);
            style += `${name}: ${value} !important;`;
        });
        styleSheet.current.innerHTML = `*{${style}}`;
    }, [formValue]);

    const [pickerVisable, setPickerVisable] = useState(false);
    const changePickerVisable = useCallback(() => setPickerVisable(pickerVisable => !pickerVisable), []);
    const [pickerColor, setPickerColor] = useState('');
    const pickerColorChange = useCallback((color: ColorResult) => {
        setPickerColor(color.hex);
        setFormValue({ ...formChange, color: color.hex });
    }, []);

    return (
        <div>
            <Form form={form} labelCol={{ span: 2 }} initialValues={initialValues} onValuesChange={formChange}>
                <Item key='font-family' name='font-family' label='字体'>
                    <Input allowClear placeholder='字体的中文名或英文名' />
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
