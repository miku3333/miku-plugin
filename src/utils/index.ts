// @ts-ignore
export const btnClick = () => {
    const root = document.querySelector('#root') as HTMLDivElement;
    if (root.style.display === 'none') {
        root.style.display = 'block';
    } else {
        root.style.display = 'none';
    }
}
