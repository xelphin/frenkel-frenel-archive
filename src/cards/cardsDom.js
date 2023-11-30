const CardsDom = (function CardsDom() {
    // https://drive.google.com/uc?export=view&id=[image_id]
    const prefixImg = "https://drive.google.com/uc?export=view&id=";
    // https://drive.google.com/thumbnail?id=[pdf_id]
    const prefixPdf = "https://drive.google.com/thumbnail?id=";
    const errorImg =
        "https://drive.google.com/uc?export=view&id=1CRo72lZ3iGl28hoDaUmSkv7ojBTxUipa";

    const createImageNode = (imageLink, ext) => {
        const img = document.createElement("img");
        img.classList.add("card-image");
        if (imageLink !== "") {
            if (ext === "jpg" || ext === "jpeg" || ext === "png") {
                img.src = prefixImg + imageLink;
            } else if (ext === "pdf") {
                img.src = prefixPdf + imageLink;
            }
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
        createArticleCard,
        createPaintingCard,
    };
})();

export default CardsDom;
