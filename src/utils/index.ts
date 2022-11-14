let display = false;
// @ts-ignore
export const btnClick = () => {
    const root = document.querySelector('#root') as HTMLDivElement;
    if (display) {
        root.style.display = 'none';
    }
    else {
        root.style.display = 'block';
    }
    display = !display;
}
