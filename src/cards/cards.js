import CardsDom from "./cardsDom";
import devData from "../devData.json";

const Cards = (function Cards() {
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
        // Found link
        return idToLinkObj[id].extension;
    };

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

    // INIT
    const init = () => {};

    return {
        init,
        createCards,
    };
})();

export default Cards;
