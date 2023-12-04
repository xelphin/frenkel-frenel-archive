// SCSS
import "./stylesheets/style.scss";
// JS
import Menu from "./menu/menu";
import FetchData from "./backend/fetchData";
import Cards from "./cards/cards";
import DataFunctions from "./backend/dataFunctions";
// JSON
import devData from "./devData.json";

// ------------------------------
//             INIT
// ------------------------------

const allFetchedData = {};

// FETCH DATA
const fetchedAllData = Object.entries(devData).map(([content, data]) => {
    const sheet = FetchData.fetchObject(
        data.sourceLinks.jsonUrl,
        `${data.name}, fetch from jsonUrl`,
    );
    const idToLink = FetchData.fetchObject(
        data.sourceLinks.idToLinkUrl,
        `${data.name}, fetch from idToLinkUrl`,
    );

    return Promise.all([sheet, idToLink]).then((results) => {
        const cardsParams = DataFunctions.fromDataGetCardsCreationParameters(
            results[0],
            results[1],
            content,
        );
        allFetchedData[content] = {
            sheet: results[0],
            idToLink: results[1],
            cardsParams,
        };
    });
});

// RENDER DATA
Promise.all(fetchedAllData).then(() => {
    DataFunctions.init(allFetchedData);
    //
    Object.entries(allFetchedData).forEach(([content, data]) => {
        console.log("Creating cards for: ", content);
        // CREATE CARDS
        Cards.createCards(data.cardsParams, DataFunctions);
    });
});

// Note: 'content' means: articles, paintings...

/*
To be able to extract google sheet data, I followed video: https://www.youtube.com/watch?v=uJDLT8nh2ps
Using the above menthod, i created the: 'jsonUrl's
*/

//  COSTUMIZE DOM (that can be done before all data was fetched)
Menu.init(Cards.showCardsFor, Object.keys(devData)[0]);
Cards.showCardsFor(Object.keys(devData)[0]); // Note: This is why it's important to hard code the containers in index.html
