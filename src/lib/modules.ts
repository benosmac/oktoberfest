export function scrollTargetToCenter(url: URL) {
    const target = document.querySelector(url.hash)?.firstElementChild;
    target?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
    });

}

