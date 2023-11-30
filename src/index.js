// SCSS
import "./stylesheets/style.scss";
// JS
import Menu from "./menu/menu";
import FetchData from "./fetchData/fetchData";
import Cards from "./cards/cards";
// JSON
import devData from "./devData.json";

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

Object.entries(devData).forEach(([content, data]) => {
    // Fetch data
    const sheet = FetchData.fetchObject(
        data.sourceLinks.jsonUrl,
        `${data.name}, fetch from jsonUrl`,
    );
    const idToLink = FetchData.fetchObject(
        data.sourceLinks.idToLinkUrl,
        `${data.name}, fetch from idToLinkUrl`,
    );

    // Create cards
    Promise.all([sheet, idToLink]).then((results) => {
        Cards.createCards(results[0], results[1], content);
    });
});
// Note: 'content' means: articles, paintings...

/*
To be able to extract google sheet data, I followed video: https://www.youtube.com/watch?v=uJDLT8nh2ps
Those are the links I ended up creating the 'jsonUrl's
*/
