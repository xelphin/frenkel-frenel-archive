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
        Cards.showCardsFor(newContentType);
    };

    return {
        showCardsFor,
    };
})();

// ------------------------------
//      FETCH DATABSE DATA
// ------------------------------
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
Using the above menthos, i created the: 'jsonUrl's
*/

// ------------------------------
//             INIT
// ------------------------------
Menu.init(GeneralRedirector, Object.keys(devData)[0]);
GeneralRedirector.showCardsFor(Object.keys(devData)[0]); // Note: This is why it's important to hard code the containers in index.html
