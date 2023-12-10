import Filter from "./filters/filter";
import MenuDom from "./menuDom";

const Menu = (function Menu() {
    let showCardsFor;

    // Callback for '<content>-selector's when they're clicked
    const clickSwitchContent = (target) => {
        const newContentType = target.getAttribute("data-content");
        Filter.switchToContent(newContentType);
        Search.updateOnContent(newContentType);
        showCardsFor(newContentType);
    };

    // INIT
    const init = (showCardsForCallback, firstShow = "articles") => {
        showCardsFor = showCardsForCallback;
        Filter.init(firstShow);
        MenuDom.init(clickSwitchContent);
    };

    return {
        init,
    };
})();

export default Menu;
