/*

TODO:
I want all the backend functions to be here
    so for example
        cards.getMatchingLink(), cardsDom.getImageItself(), cardsDom:errorImg

(These are all accessed through the GeneralRedirector by the way)

Also, i want to implement an articleIdToLink thing for the paintings
    So i need to save all the fetched data as files in /src/data

Maybe put all the 'data' files and folders inside of a 'backend' folder

*/

import devData from "../devData.json";

const DataFunctions = (function DataFunctions() {

    const getMatchingLink = (id, idToLinkObj, contentType) => {
        // Each article/painting/... is supposed to have an accompanying img/pdf (a link of it is found inside of 'idToLinkObj')
        if (idToLinkObj[id] === undefined) {
            console.log(`NOTE: In ${contentType}, missing image for ${id}`);
            return "";
        }
        // Found link
        return idToLinkObj[id].link;
    };

    const getMatchingExt = (id, idToLinkObj, contentType) => {
        // Each article/painting/... is supposed to have an accompanying img/pdf (a link of it is found inside of 'idToLinkObj')
        if (idToLinkObj[id] === undefined) {
            console.log(`NOTE: In ${contentType}, missing image for ${id}`);
            return "";
        }
        // Found extension
        return idToLinkObj[id].extension;
    };

    const getCardContainerId = (contentType) => devData[contentType].dom.cardsContainerId;

    const fromDataGetCardsCreationParameters = (data, idToLinkObj, contentType) => {
        let cardsCreationParams = {};
        const cardContainerId = getCardContainerId(contentType);
        const {cardsText} = devData[contentType];
        // Create card parameters
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i += 1) {
            const idOfItem = keys[i];
            const matchingLink = getMatchingLink(idOfItem, idToLinkObj, contentType);
            const extension = getMatchingExt(idOfItem, idToLinkObj, contentType);
            // For each card we create (dom), we need to use these values
            cardsCreationParams[idOfItem] = {
                cardData: data[idOfItem],       // ex: title: [], language: [], author: [], ...
                imageLink: matchingLink,        // ex: "https://[image-of-card]"
                extension: extension,           // ex: ".jpg"
                containerId: cardContainerId,   // ex: "articles-cards-container"
                cardsText: cardsText            // ex: title: [], author: [], ...
            }
        }
        return cardsCreationParams;
    }

    const prefixThumbnail = "https://drive.google.com/thumbnail?id=";
    const errorImg =
        "https://drive.google.com/uc?export=view&id=1CRo72lZ3iGl28hoDaUmSkv7ojBTxUipa";

    const getThumbnailImg = (imageLink) => prefixThumbnail + imageLink;
    const getErrorImg = () => errorImg;

    return {
        fromDataGetCardsCreationParameters,
        getThumbnailImg,
        getErrorImg
    };
})();

export default DataFunctions;