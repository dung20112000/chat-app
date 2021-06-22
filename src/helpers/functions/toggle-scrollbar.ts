export function toggleScrollbar(refNode: any) {
    let timer: any;
    // @ts-ignore
    refNode.onscroll = function () {
        // @ts-ignore
        this.classList.add("pr-0")
        clearTimeout(timer);
        timer = setTimeout(() => {
            // @ts-ignore
            this.classList.remove("pr-0")
        }, 100)
    }
}