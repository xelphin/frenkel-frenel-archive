import CardsDom from "./cardsDom";
import CardsExpandedDom from "./cardsExpandedDom";
import devData from "../devData.json";

const Cards = (function Cards() {
    // ------------------------------
    //       HELPER FUNCTIONS
    // ------------------------------

    // ------------------------------
    //      EXPORTED FUNCTIONS
    // ------------------------------

    const createCards = (cardsParam, dataFunctionsMod) => {
        CardsDom.init(dataFunctionsMod);
        CardsExpandedDom.init(dataFunctionsMod);
        // Create card
        const keys = Object.keys(cardsParam);
        for (let i = 0; i < keys.length; i += 1) {
            const idOfItem = keys[i];
            CardsDom.cardCreator(
                cardsParam[idOfItem],
                CardsExpandedDom.openExpandedCard,
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
    };

    return {
        createCards,
        showCardsFor,
    };
})();

export default Cards;
