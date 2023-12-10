import SearchUtilities from "./searchUtilities";

const ExactSearch = (function ExactSearch() {

    function isSubset(subset, array) {
        // [copied]
        return subset.every(element => array.includes(element));
    }
    
    const filterExactMatch = (allItems, databaseName, userInput) => {
        console.log(`Filtering: ${databaseName}, to match exact "${userInput}"`);
        // Get user ',' split input
        let matchWith = userInput.split(",");
        matchWith = matchWith.map((str) => SearchUtilities.cleanText(str));
        // Filter
        const allMatches = allItems.filter((item) => {
            let itemValues = item[databaseName].split(",");
            itemValues = itemValues.map((str) => SearchUtilities.cleanText(str));
            if (isSubset(matchWith, itemValues)) {
                return true;
            }
            return false;
        });
        return allMatches;
    };

    const filterRangeExact = (allItems, wantAbove, userInput,  type, databaseName) => {
        console.log(`Filtering: ${databaseName}, by wanting above? ${wantAbove} the value ${userInput}, the type of the value is ${type}`);
        // Filter
        let edgeValue = userInput;
        if (type === "date") {
            edgeValue = new Date(userInput);
        } else if (type === "number") {
            edgeValue = parseInt(userInput);
        }
        try {
            const allMatches = allItems.filter((item) => {
                let itemValue = item[databaseName];
                if (type === "date") {
                    itemValue = SearchUtilities.getFromTextTheDate(itemValue);
                } else if (type === "number") {
                    itemValue = parseInt(itemValue);
                }
                if (itemValue === undefined || edgeValue === undefined) {
                    return false;
                }
                // Check
                
                if (edgeValue <= itemValue) {
                    if (wantAbove) return true;
                    return false;
                } else {
                    if (!wantAbove) return true;
                    return false;
                }
            });
            return allMatches;
        } catch (error) {
            console.error("ERROR: ", error);
            return allItems;
        }
    }

    const filterHas = (allItems, databaseName, userInput) => {
        if (!userInput) return allItems;
        // We want to filter
        const allMatches = allItems.filter((item) => {
            let itemValue = item[databaseName];
            if (itemValue !== "") {
                return true;
            }
            return false;
        });
        return allMatches;
    }

    const search = (allItems, filterName, filterInfo, userInput ) => {
        const databaseName = filterInfo["database-name"];
        if (filterInfo.application === "exact" || filterInfo.application === "similar") {
            return filterExactMatch(allItems, databaseName, userInput);
        }
        if (filterInfo.application === "range-min") {
            return filterRangeExact(allItems, true, userInput, filterInfo.type, databaseName);
        }
        if (filterInfo.application === "range-max") {
            return filterRangeExact(allItems, false, userInput, filterInfo.type, databaseName);
        }
        if (filterInfo.application === "has") {
            return filterHas(allItems, databaseName, userInput);
        }
        return allItems;
    }

    return {
        search
    };
})();

export default ExactSearch;
