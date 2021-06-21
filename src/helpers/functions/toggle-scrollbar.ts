export function toggleScrollbar(refNode: any) {
    let timer: any;
    // @ts-ignore
    refNode.onscroll = function () {
        // @ts-ignore
        this.classList.add("scrolling")
        clearTimeout(timer);
        timer = setTimeout(() => {
            // @ts-ignore
            this.classList.remove("scrolling")
        }, 100)
    }
}