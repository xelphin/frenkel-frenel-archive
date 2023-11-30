import Filter from "./filters/filter";
import MenuDom from "./menuDom";

const Menu = (function Menu() {
    let GeneralRedirector;

    // Callback for '<content>-selector's when they're clicked
    const clickSwitchContent = (target) => {
        const newContentType = target.getAttribute("data-content");
        Filter.switchToContent(newContentType);
        GeneralRedirector.showCardsFor(newContentType);
    };

    // INIT
    const init = (generalRedirectorModule, firstShow = "articles") => {
        GeneralRedirector = generalRedirectorModule;
        Filter.init(firstShow);
        MenuDom.init(clickSwitchContent);
    };

    return {
        init,
    };
})();

export default Menu;
