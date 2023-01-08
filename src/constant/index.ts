export const PERFIX = 'miku-style'
export const IS_DEV = location.href.includes('127.0.0.1') || location.href.includes('localhost');
export let styleDom: HTMLStyleElement | null;
export const setStyleDom = (dom: HTMLStyleElement | null) => {
    if (dom) {
        styleDom = dom;
    }
};
export const setStyleDomContent = (str: string) => {
    if (styleDom) {
        styleDom.innerHTML = str;
    }
};