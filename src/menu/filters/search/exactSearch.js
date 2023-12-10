import SearchUtilities from "./searchUtilities";

const ExactSearch = (function ExactSearch() {
    const filterExactMatch = (allItems, databaseName, userInput) => {
        console.log(`Filtering: ${databaseName}, to match exact "${userInput}"`);
        const matchWith = SearchUtilities.cleanText(userInput);
        const allMatches = allItems.filter((item) => {
            let itemValues = item[databaseName].split(",");
            itemValues = itemValues.map((str) => SearchUtilities.cleanText(str));
            if (itemValues.includes(matchWith) || itemValues[0] === matchWith) {
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
        console.log("All items: ", allItems);
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

    const search = (allItems, filterName, filterInfo, userInput ) => {
        console.log("Received filter info: ", filterInfo);
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
        return allItems;
    }

    return {
        search
    };
})();

export default ExactSearch;
