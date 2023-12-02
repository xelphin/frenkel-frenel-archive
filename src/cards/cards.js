import CardsDom from "./cardsDom";
import devData from "../devData.json";

const Cards = (function Cards() {

    // ------------------------------
    //       HELPER FUNCTIONS
    // ------------------------------

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

    // ------------------------------
    //      EXPORTED FUNCTIONS
    // ------------------------------

    const createCards = (data, idToLinkObj, contentType) => {
        const cardCreatorFunction =
            devData[contentType].functions.cardCreationFunc;
        const cardContainerId = devData[contentType].dom.cardsContainerId;
        // Create card
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            const matchingLink = getMatchingLink(key, idToLinkObj, contentType);
            const extension = getMatchingExt(key, idToLinkObj, contentType);
            CardsDom[cardCreatorFunction](
                data[key],
                matchingLink,
                extension,
                cardContainerId,
            );
        }
    };

    const showCardsFor = (contentType) => {
        const keys = Object.keys(devData);
        for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            const containerId = devData[keys[i]].dom.cardsContainerId;
            if (key !== contentType) {
                CardsDom.hideCardsContainer(containerId);
            } else {
                CardsDom.showCardsContainer(containerId);
            }
        }
    }

    

    return {
        createCards,
        showCardsFor
    };
})();

export default Cards;
