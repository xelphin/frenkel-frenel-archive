// import CardsDom from "./cardsDom";

const Cards = (function Cards() {
    const createCards = (data, idToLink, contentType) => {
        let count = 0;
        const keys = Object.keys(data);

        for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            // let matchingLink;

            if (idToLink[key] === undefined) {
                // matchingLink = "";
                console.log(
                    `NOTE: In ${contentType}, missing image for ${key}, located in: ${count}`,
                );
            } else {
                // matchingLink = idToLink[key].Link;
            }

            // CardsDom.createCard(data[key], matchingLink, contentType);
            count += 1;
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
