import Filter from "./filters/filter";
import MenuDom from "./menuDom";

const Menu = (function Menu() {
    let showCardsFor;

    // Callback for '<content>-selector's when they're clicked
    const clickSwitchContent = (target) => {
        const newContentType = target.getAttribute("data-content");
        Filter.switchToContent(newContentType);
        showCardsFor(newContentType);
    };

    // INIT
    const init = (cardsCallbacks, firstShow = "articles") => {
        showCardsFor = cardsCallbacks.showCardsFor;
        Filter.init(cardsCallbacks, firstShow);
        MenuDom.init(clickSwitchContent);
    };

    return {
        init,
    };
})();

export default Menu;
