import SearchUtilities from "./searchUtilities";

const ExactSearch = (function ExactSearch() {
    const filterTextExact = (allItems, textToMatch, filterBy) => {
        textToMatch = SearchUtilities.cleanText(textToMatch);
        const allMatches = allItems.filter((item) => {
            if (item[filterBy] === textToMatch) {
                return true;
            }
        });
        return allMatches;
    };

    return {
        filterTextExact,
    };
})();

export default ExactSearch;
