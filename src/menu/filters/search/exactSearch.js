import SearchUtilities from "./searchUtilities";

const ExactSearch = (function ExactSearch() {
    const filterTextExact = (allItems, textToMatch, filterBy) => {
        console.log(`Filtering: ${filterBy}, to match exact "${textToMatch}"`);
        const matchWith = SearchUtilities.cleanText(textToMatch);
        const allMatches = allItems.filter((item) => {
            const itemValue = SearchUtilities.cleanText(item[filterBy]);
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
            else if (template[i] !== str[i]) return false;
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

    return {
        filterTextExact,
        filterRangeExact
    };
})();

export default ExactSearch;
