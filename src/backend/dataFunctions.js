/*

TODO:

Also, i want to implement an articleIdToLink thing for the paintings
    So i need to save all the fetched data as files in /src/data

*/

import devData from "../devData.json";

// IMPORTANT: Don't add module imports or be very careful, this is a PUB module, like a utility,
//            shouldn't import things from front-end

const DataFunctions = (function DataFunctions() {
    let allFetchedData;

    const getIdToLinkObjForIdThroughObject = (id, idToLinkObj, contentType) => {
        // Each article/painting/... is supposed to have an accompanying img/pdf (a link of it is found inside of 'idToLinkObj')
        if (idToLinkObj[id] === undefined) {
            console.log(`NOTE: In ${contentType}, missing image for ${id}`);
            return undefined;
        }
        return idToLinkObj[id];
    };

    const getIdToLinkObjForId = (id, contentType) => {
        const idToLinkObj = allFetchedData[contentType].idToLink;
        return getIdToLinkObjForIdThroughObject(id, idToLinkObj, contentType);
    };

    const getMatchingLinkId = (id, idToLinkObj, contentType) => {
        const idToLinkObjAtId = getIdToLinkObjForIdThroughObject(
            id,
            idToLinkObj,
            contentType,
        );
        if (idToLinkObjAtId === undefined) return "";
        // Found link
        return idToLinkObjAtId.link;
    };

    const getMatchingExt = (id, idToLinkObj, contentType) => {
        const idToLinkObjAtId = getIdToLinkObjForIdThroughObject(
            id,
            idToLinkObj,
            contentType,
        );
        if (idToLinkObjAtId === undefined) return "";
        // Found link
        return idToLinkObjAtId.extension;
    };

    const getMatchingDriveLink = (id, contentType) => {
        const idToLinkObjAtId = getIdToLinkObjForId(id, contentType);
        if (idToLinkObjAtId === "") return "";
        // Found link
        const prefix = "https://drive.google.com/file/d/";
        const postfix = "/view?usp=drive_link";
        return prefix + idToLinkObjAtId.link + postfix;
    };

    const getMatchingWebsiteLink = (id, contentType) => {
        if ("websiteLink" in allFetchedData[contentType].sheet[id]) {
            return allFetchedData[contentType].sheet[id].websiteLink;
        }
        return "";
    };

    const getCardContainerId = (contentType) =>
        devData[contentType].dom.cardsContainerId;

    const fromDataGetCardsCreationParameters = (
        data,
        idToLinkObj,
        contentType,
    ) => {
        const cardsCreationParams = {};
        const cardContainerId = getCardContainerId(contentType);
        const { cardsText } = devData[contentType];
        // Create card parameters
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i += 1) {
            const idOfItem = keys[i];
            const matchingLink = getMatchingLinkId(
                idOfItem,
                idToLinkObj,
                contentType,
            );
            const extension = getMatchingExt(
                idOfItem,
                idToLinkObj,
                contentType,
            );
            // For each card we create (dom), we need to use these values
            cardsCreationParams[idOfItem] = {
                contentType, // ex: "articles"
                cardData: data[idOfItem], // ex: title: [], language: [], author: [], ...
                imageLink: matchingLink, // ex: "https://[image-of-card]"
                extension, // ex: ".jpg"
                containerId: cardContainerId, // ex: "articles-cards-container"
                cardsText, // ex: title: [], author: [], ...
            };
        }
        return cardsCreationParams;
    };

    const prefixThumbnail = "https://drive.google.com/thumbnail?id=";
    const errorImg =
        "https://drive.google.com/uc?export=view&id=1CRo72lZ3iGl28hoDaUmSkv7ojBTxUipa";

    const getThumbnailImg = (imageLink) => prefixThumbnail + imageLink;
    const getErrorImg = () => errorImg;

    const init = (allFetchedDataObj) => {
        allFetchedData = allFetchedDataObj;
    };

    return {
        getMatchingDriveLink,
        getMatchingWebsiteLink,
        fromDataGetCardsCreationParameters,
        getThumbnailImg,
        getErrorImg,
        init,
    };
})();

export default DataFunctions;
