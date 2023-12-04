import CardsDom from "./cardsDom";

const CardsExpandedDom = (function CardsExpandedDom() {

    const card = document.querySelector("#card-expanded");
    const closeBtn = document.querySelector("#card-expanded-close");
    const thumbnail = document.querySelector("#card-expanded-thumbnail");
    const textDiv = document.querySelector("#card-expanded-text-container");
    let dataFunctionsMod;

    const closeExpandedCard = () =>  {
        card.close();
    }

    const addThumbnail = (cardParam) => {
        const paramThumbnail = cardParam.imageLink;
        const paramExtension = cardParam.extension;
        if (
            paramThumbnail !== "" &&
            (paramExtension === "jpg" || paramExtension === "jpeg" || paramExtension === "png" || paramExtension === "pdf")
        ) {
            thumbnail.src = dataFunctionsMod.getThumbnailImg(paramThumbnail);
        } else {
            thumbnail.src = dataFunctionsMod.getErrorImg();
        }
    }

    const addId = (cardParam) => { // TODO: can refactor (put it in cardsDom)
        const idText = document.createElement("h3");
        idText.textContent = `ID: ${cardParam.cardData.id}`;
        textDiv.appendChild(idText);
    }

    const fillCardWithParams = (cardParam) => {
        textDiv.textContent = "";
        addThumbnail(cardParam);
        addId(cardParam);
        const {cardData} = cardParam;
        const {cardsText} = cardParam;
        CardsDom.addContentSpecificText(textDiv, cardData, cardsText, false);
    }

    // ------------------------------
    //      EXPORTED FUNCTIONS
    // ------------------------------

    const openExpandedCard = (cardParam) => {
        console.log("expanding card: ", cardParam);
        card.showModal();
        fillCardWithParams(cardParam);
    };

    const init = (dataFunctions) => {
        closeBtn.addEventListener("click", () =>
            closeExpandedCard(),
        );
        dataFunctionsMod = dataFunctions;
    }

    return {
        openExpandedCard,
        init
    };
})();

export default CardsExpandedDom;
