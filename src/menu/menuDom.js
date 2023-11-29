const MenuDom = (function MenuDom() {
    const allContentSelectorContainer = document.querySelector(
        "#content-selector-container",
    );

    const applyClickListenerForContentSelectors = (callback) => {
        const { children } = allContentSelectorContainer;

        for (let i = 0; i < children.length; i += 1) {
            const child = children[i];
            child.addEventListener("click", (event) =>
                callback(event.currentTarget),
            );
        }
    };

    // INIT
    const init = (contentSelectorClickCallback) => {
        applyClickListenerForContentSelectors(contentSelectorClickCallback);
    };

    return {
        init,
    };
})();

export default MenuDom;
