import Filter from "./filters/filter";
import MenuDom from "./menuDom";

const Menu = (function Menu() {
    // Callback for '<content>-selector's when they're clicked
    const clickSwitchContent = (target) => {
        const switchTo = target.getAttribute("data-content");
        console.log("Show content for: ", switchTo);
        Filter.switchToContent(switchTo);
    };

    // INIT
    const init = (firstShow = "articles") => {
        Filter.init(firstShow);
        MenuDom.init(clickSwitchContent);
    };

    return {
        init,
    };
})();

export default Menu;
