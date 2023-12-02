const CardsDom = (function CardsDom() {

    // ------------------------------
    //       HELPER FUNCTIONS
    // ------------------------------

    // https://drive.google.com/uc?export=view&id=[image_id]
    // const prefixImg = "https://drive.google.com/uc?export=view&id=";
    // https://drive.google.com/thumbnail?id=[pdf_id]
    const prefixThumbnail = "https://drive.google.com/thumbnail?id=";
    const errorImg =
        "https://drive.google.com/uc?export=view&id=1CRo72lZ3iGl28hoDaUmSkv7ojBTxUipa";

    const getImageItself = (imageLink) => {
        return prefixThumbnail + imageLink;
    }
    
    const createImageNode = (imageLink, ext) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("card-image-container");
        const img = document.createElement("img");
        img.classList.add("card-image");
        if (imageLink !== "" && (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "pdf")) {
            img.src = getImageItself(imageLink);
            
        } else {
            img.src = errorImg;
        }
        imgContainer.appendChild(img);
        return imgContainer;
    };

    const addContentSpecificText = (textDiv,cardData, cardsText) => {
        const keys = Object.keys(cardsText);
        for (let i = 0; i < keys.length; i += 1) {
            const textElem = document.createElement("h3");
            const key = keys[i];                                            // "year"
            const showLabelName = cardsText[key]["label-text"];             // "Year"
            const databaseLabelName = cardsText[key]["database-name"];      // "yearStart"
            const textValue = cardData[databaseLabelName];                  // "1950"
            if (textValue == "" && cardsText[key]["dont-show-if-empty"] == true) {
                textElem.textContent = "-";
            } else {
                textElem.textContent = `${showLabelName}: ${textValue}`;
            }
            textDiv.appendChild(textElem);
        }
    }

    const createTextNode = (cardData, cardsText) => {
        const textDiv = document.createElement("div");
        textDiv.classList.add("card-text-container");
        const idText = document.createElement("h3");
        idText.textContent = `ID: ${cardData.id}`;
        addContentSpecificText(textDiv,cardData, cardsText);
        textDiv.appendChild(idText);
        return textDiv;
    };

    // ------------------------------
    //      EXPORTED FUNCTIONS
    // ------------------------------

    const cardCreator = (cardData, imageLink, extension, containerId, cardsText) => {
        const container = document.querySelector(`#${containerId}`);
        const card = document.createElement("div");
        card.id = cardData.id;
        card.classList.add("card");
        card.appendChild(createImageNode(imageLink, extension));
        card.appendChild(createTextNode(cardData, cardsText));
        container.appendChild(card);
        return card;
    };

    const hideCardsContainer = (containerId) => {
        console.log("Container ID, hiding: ", containerId);
        const container = document.querySelector(`#${containerId}`);
        container.style.display = "none";
    }

    const showCardsContainer = (containerId) => {
        console.log("Container ID, showing: ", containerId);
        const container = document.querySelector(`#${containerId}`);
        container.style.display = "flex";
    }



    return {
        hideCardsContainer,
        showCardsContainer,
        cardCreator
    };
})();

export default CardsDom;
