import Filter from "./filters/filter";
import MenuDom from "./menuDom";

const Menu = (function Menu() {
    // let switchContentCallback = [receive as argument from Menu.init()]

    // Callback for '<content>-selector's when they're clicked
    const clickSwitchContent = (target) => {
        const switchTo = target.getAttribute("data-content");
        console.log("Show content for: ", switchTo);
        Filter.switchToContent(switchTo);
        // TODO
        // Menu.init() will also get a callback declared in index.js
        //      it will switch between the cards to show (article cards, painting cards...)
        //      it will be called here: switchContentCallback()
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
