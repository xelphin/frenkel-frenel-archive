import SearchDom from "./searchDom";
import ExactSearch from "./exactSearch";
import DataFunctions from "../../backend/dataFunctions";

const Search = (function Search() {
    let searchInputs = {};
    let onContent;

    const createInputObj = (name) => {
        // Is a callback for when gathering the inputs in the dom
        const searchInput = {};
        searchInput.name = name;
        searchInput.result = "";
        searchInput.infoOnInput = DataFunctions.getLabelInfo(onContent, name);
        return searchInput;
    };

    const getResults = () => {
        searchInputs = SearchDom.getSearchLabels(createInputObj, onContent);
        //
        // Listen, i know you're thinking i could have put: "currentInput.value", in the SearchDom.getSearchInputs()
        // But real weird things happen, somehow. Like this, things are fine though
        // Probs need to dig deeper and find out later
        let resultsArr = SearchDom.getSearchInputValues(onContent);
        for (let i = 0; i < resultsArr.length; i += 2) {
            const name = resultsArr[i];
            const result = resultsArr[i+1];
            if (name == undefined || name == "" || searchInputs[name] == undefined) {
                console.log("Note, name doesn't exist: ", name);
                return;
            }
            searchInputs[name].result = result;
        }
    }

    const searchExact = () => {
        getResults();
        // TODO: Instead of using filteredInputs, make an array version of it
        console.log("Search Inputs: ", searchInputs);
        const keys = Object.keys(searchInputs);
        let filteredInputs = searchInputs;
        for (let i = 0; i < keys.length; i += 1) {
            const nameOfItem = keys[i];
            const info = searchInputs[nameOfItem].infoOnInput;
            const filterBy = searchInputs[nameOfItem].name;
            const toMatch = searchInputs[nameOfItem].result;
            if (toMatch !== undefined && toMatch !== "") {
                if (info.application == "exact" || info.application == "similar") {
                    // filteredInputs = ExactSearch.filterTextExact(filteredInputs, toMatch, filterBy)
                } else if (info.application == "range-min" || info.application == "range-max") {
                    // TODO
                }
            }
        }
        console.log("Final Search Results: ", filteredInputs);
    };

    const updateOnContent = (nowShowing) => {
        onContent = nowShowing;
        searchInputs = {}
    };

    const init = (firstShow) => {
        onContent = firstShow;
        SearchDom.init(searchExact, searchExact); // TODO: Make the second one searchNLP
    };

    return {
        searchExact,
        updateOnContent,
        init,
    };
})();

export default Search;
