import SearchUtilities from "./searchUtilities";

const ExactSearch = (function ExactSearch() {
    const filterTextExact = (allItems, textToMatch, filterBy) => {
        console.log("Values received for filtering: ", allItems, textToMatch, filterBy);
        const matchWith = SearchUtilities.cleanText(textToMatch);
        const allMatches = allItems.filter((item) => {
            if (item[filterBy] === matchWith) {
                return true;
            }
            return false;
        });
        return allMatches;
    };

    return {
        filterTextExact,
    };
})();

export default ExactSearch;
