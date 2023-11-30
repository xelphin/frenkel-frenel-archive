// SCSS
import "./stylesheets/style.scss";
// JS
import Menu from "./menu/menu";
import FetchData from "./fetchData/fetchData";

// GENERAL REDIRECTOR for the various modules
const GeneralRedirector = (function GeneralRedirector() {
    const showCardsFor = (newContentType) => {
        console.log("TODO: Show cards for: ", newContentType);
        // TODO: implement
    };

    return {
        showCardsFor,
    };
})();

// INIT

Menu.init(GeneralRedirector);

FetchData.fetchArticlesSheet();
FetchData.fetchPaintingsSheet();
FetchData.fetchArticlesIdToLink();
FetchData.fetchPaintingIdToLink();
