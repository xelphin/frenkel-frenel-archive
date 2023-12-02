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
        const img = document.createElement("img");
        img.classList.add("card-image");
        if (imageLink !== "" && (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "pdf")) {
            img.src = getImageItself(imageLink);
            
        } else {
            img.src = errorImg;
        }
        return img;
    };

    const createTextNode = (cardData) => {
        const textDiv = document.createElement("div");
        const idText = document.createElement("h3");
        idText.textContent = cardData.id;
        textDiv.appendChild(idText);
        return textDiv;
    };

    const cardGeneric = (cardData, imageLink, extension, containerId) => {
        const container = document.querySelector(`#${containerId}`);
        const card = document.createElement("div");
        card.id = cardData.id;
        card.classList.add("card");
        card.appendChild(createImageNode(imageLink, extension));
        card.appendChild(createTextNode(cardData));
        container.appendChild(card);
        return card;
    };

    // ------------------------------
    //      EXPORTED FUNCTIONS
    // ------------------------------

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

    const createArticleCard = (cardData, imageLink, extension, containerId) => {
        cardGeneric(cardData, imageLink, extension, containerId);
    };

    const createPaintingCard = (
        cardData,
        imageLink,
        extension,
        containerId,
    ) => {
        cardGeneric(cardData, imageLink, extension, containerId);
    };

    return {
        hideCardsContainer,
        showCardsContainer,
        createArticleCard,
        createPaintingCard,
    };
})();

export default CardsDom;
