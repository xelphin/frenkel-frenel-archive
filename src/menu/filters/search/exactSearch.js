import SearchUtilities from "./searchUtilities";

const ExactSearch = (function ExactSearch() {
    const filterExactMatch = (allItems, filterName, userInput) => {
        console.log(`Filtering: ${filterName}, to match exact "${userInput}"`);
        const matchWith = SearchUtilities.cleanText(userInput);
        const allMatches = allItems.filter((item) => {
            const itemValue = SearchUtilities.cleanText(item[filterName]);
            if (itemValue === matchWith) {
                return true;
            }
            return false;
        });
        return allMatches;
    };

    const checkTemplate = (template, str) => {
        if (template.length !== str.length) return false;
        for (let i = 0; i < template.length; i++) {
            // Check is digit when 'x'
            if (template[i] === 'x' && isNaN(parseInt(str[i], 10))) return false;
            // Otherwise check same char
            if (template[i] !== str[i]) return false;
        }
        return true;
    }

    const filterRangeExact = (allItems, wantAbove, edgeValue, type, filterBy, template) => {
        console.log(`Filtering: ${filterBy}, by wanting above? ${wantAbove} the value ${edgeValue}, the type of the value is ${type}`);
        // Check Template
        if (template !== undefined) {
            if (!checkTemplate(template, edgeValue)) {
                window.prompt(`Your filter value ${filterBy}, is not in the correct template`);
                return allMatches;
            }
        }
        // Filter
        const allMatches = allItems.filter((item) => {
            const itemValue = item[filterBy];
            return true;
        });
        return allMatches;
    }

    const search = (allItems, filterName, filterInfo, userInput ) => {
        console.log("Received filter info: ", filterInfo);
        if (filterInfo.application === "exact" || filterInfo.application === "similar") {
            return filterExactMatch(allItems, filterName, userInput);
        }
        return allItems;
    }

    return {
        search
    };
})();

export default ExactSearch;
