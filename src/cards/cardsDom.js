const CardsDom = (function CardsDom() {
    let dataFunctionsMod;
    const loader = document.querySelector("#card-loader-container");

    const createImageNode = (imageId, ext) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("card-image-container");
        const img = document.createElement("img");
        img.classList.add("card-image");
        if (
            imageId !== "" &&
            (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "pdf")
        ) {
            img.src = dataFunctionsMod.getThumbnailImg(imageId);
        } else {
            img.src = dataFunctionsMod.getErrorImg();
        }
        imgContainer.appendChild(img);
        return imgContainer;
    };

    const createExternalLink = (link) => {
        // <a href="https://www.example.com" target="_blank">Visit Example.com</a>
        const a = document.createElement("a");
        a.href = link;
        a.target = "_blank";
        a.textContent = "Link";
        return a;
    };

    const createDriveLink = (itemId, contentType) => {
        // <a href="https://www.example.com" target="_blank">Visit Example.com</a>
        // Preferably website link, otherwise, link to pdf
        const a = document.createElement("a");
        let link = dataFunctionsMod.getMatchingWebsiteLink(itemId, contentType);
        if (link === "") {
            link = dataFunctionsMod.getMatchingDriveLink(itemId, contentType);
        }
        a.href = link;
        a.target = "_blank";
        a.textContent = `Link To ${contentType}`;
        return a;
    };

    const addContentSpecificText = (
        textDiv,
        cardData,
        cardsText,
        showOnlyCompact = true,
    ) => {
        const keys = Object.keys(cardsText);
        for (let i = 0; i < keys.length; i += 1) {
            let elem = document.createElement("h3");
            const key = keys[i]; // "year"
            const showOnCompact = cardsText[key]["show-on-compact"]; // true | false
            if (!showOnlyCompact || showOnCompact) {
                const showLabelName = cardsText[key]["label-text"]; // "Year"
                const databaseLabelName = cardsText[key]["database-name"]; // "yearStart"
                const textValue = cardData[databaseLabelName]; // "1950"
                if (
                    textValue === "" &&
                    cardsText[key]["dont-show-if-empty"] === true
                ) {
                    elem.textContent = "-";
                } else if (cardsText[key]["is-external-link"]) {
                    elem = createExternalLink(textValue);
                } else if (cardsText[key]["is-link-to-other-database"]) {
                    const contentFrom = cardsText[key]["database-link-name"];
                    elem = createDriveLink(textValue, contentFrom);
                } else {
                    elem.textContent = `${showLabelName}: ${textValue}`;
                }
                textDiv.appendChild(elem);
            }
        }
    };

    const createIdText = (cardData) => {
        // TODO: can refactor (put it in cardsDom)
        const idText = document.createElement("h3");
        idText.textContent = `ID: ${cardData.id}`;
        return idText;
    };

    const createTextNode = (cardData, cardsText) => {
        const textDiv = document.createElement("div");
        textDiv.classList.add("card-text-container");
        addContentSpecificText(textDiv, cardData, cardsText);
        textDiv.appendChild(createIdText(cardData));
        return textDiv;
    };

    const cardCreator = (cardParam, callbackClick) => {
        const container = document.querySelector(`#${cardParam.containerId}`);
        const card = document.createElement("div");
        card.id = cardParam.cardData.id;
        card.classList.add("card");
        card.appendChild(
            createImageNode(cardParam.imageLink, cardParam.extension),
        );
        card.appendChild(
            createTextNode(cardParam.cardData, cardParam.cardsText),
        );
        card.addEventListener("click", () => callbackClick(cardParam));
        container.appendChild(card);
        return card;
    };

    const showCard = (card) => {
        const cardGiven = card;
        cardGiven.style.display = "flex";
    };

    const hideCardsContainer = (containerId) => {
        console.log("Container ID, hiding: ", containerId);
        const container = document.querySelector(`#${containerId}`);
        container.style.display = "none";
    };

    const showCards = (container) => {
        const childrenArray = Array.from(container.children);
        childrenArray.forEach((child) => {
            showCard(child);
        });
    };

    const showCardsContainer = (containerId) => {
        console.log("Container ID, showing: ", containerId);
        const container = document.querySelector(`#${containerId}`);
        container.style.display = "flex";
        showCards(container);
    };

    const showOnlyCards = (containerId, itemsIdToShow) => {
        const container = document.querySelector(`#${containerId}`);
        const childrenArray = Array.from(container.children);
        childrenArray.forEach((child) => {
            if (itemsIdToShow.includes(child.id)) {
                showCard(child);
            } else {
                const childGiven = child;
                childGiven.style.display = "none";
            }
        });
    };

    const hideLoader = () => {
        loader.style.display = "none";
    };

    const init = (dataFunctions) => {
        dataFunctionsMod = dataFunctions;
    };

    return {
        createIdText,
        addContentSpecificText,
        hideCardsContainer,
        showCardsContainer,
        cardCreator,
        showOnlyCards,
        hideLoader,
        init,
    };
})();

export default CardsDom;
