import CardsDom from "./cardsDom";

const CardsExpandedDom = (function CardsExpandedDom() {
    const card = document.querySelector("#card-expanded");
    const closeBtn = document.querySelector("#card-expanded-close");
    const thumbnail = document.querySelector("#card-expanded-thumbnail");
    const textDiv = document.querySelector("#card-expanded-text-container");
    let dataFunctionsMod;

    const closeExpandedCard = () => {
        card.close();
        document.body.classList.remove('dialog-open');
    };

    const addThumbnail = (cardParam) => {
        const paramThumbnail = cardParam.imageLink;
        const paramExtension = cardParam.extension;
        if (
            paramThumbnail !== "" &&
            (paramExtension === "jpg" ||
                paramExtension === "jpeg" ||
                paramExtension === "png" ||
                paramExtension === "pdf")
        ) {
            thumbnail.src = dataFunctionsMod.getThumbnailImg(paramThumbnail);
        } else {
            thumbnail.src = dataFunctionsMod.getErrorImg();
        }
    };

    const addDriveLink = (cardParam, parentDiv) => {
        let link;
        if (
            !("websiteLink" in cardParam.cardData) ||
            cardParam.cardData.websiteLink === ""
        ) {
            // Drive Link
            link = dataFunctionsMod.getMatchingDriveLink(
                cardParam.cardData.id,
                cardParam.contentType,
            );
            console.log("Appending drive link");
        } else {
            console.log("No drive link and no website link.");
            return;
        }
        const linkDom = document.createElement("a");
        linkDom.href = link;
        linkDom.target = "_blank";
        linkDom.textContent = "Document";
        parentDiv.appendChild(linkDom);
    };

    const fillCardWithParams = (cardParam) => {
        textDiv.textContent = "";
        addThumbnail(cardParam);
        const { cardData } = cardParam;
        const { cardsText } = cardParam;
        textDiv.appendChild(CardsDom.createIdText(cardData));
        CardsDom.addContentSpecificText(textDiv, cardData, cardsText, false);
        addDriveLink(cardParam, textDiv);
    };

    // ------------------------------
    //      EXPORTED FUNCTIONS
    // ------------------------------

    const openExpandedCard = (cardParam) => {
        console.log("expanding card: ", cardParam);
        card.showModal();
        document.body.classList.add('dialog-open');
        fillCardWithParams(cardParam);
    };

    const init = (dataFunctions) => {
        closeBtn.addEventListener("click", () => closeExpandedCard());
        dataFunctionsMod = dataFunctions;
    };

    return {
        openExpandedCard,
        init,
    };
})();

export default CardsExpandedDom;
