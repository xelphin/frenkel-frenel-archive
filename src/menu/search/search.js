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

    const searchExact = (filteredData, info, filterBy, result) => {
        if (result !== undefined && result !== "") {
            if (info.application === "exact" || info.application === "similar") {
                filteredData = ExactSearch.filterTextExact(filteredData, result, filterBy)
            } else if (info.application === "range-min") {
                filteredData = ExactSearch.filterRangeExact(filteredData, true, result, info.type, info["database-name"], info.template);
            }
            // TODO
        }
        return filteredData;
    };

    const search = (typeSearch) => {
        getResults();
        const searchInputsArr = Object.values(searchInputs);
        let filteredData = Object.values(DataFunctions.getAllItems(onContent));
        console.log("Search Inputs: ", searchInputs);
        console.log("Still unfiltered data: ", filteredData);
        for (let i = 0; i < searchInputsArr.length; i += 1) {
            const info = searchInputsArr[i].infoOnInput;
            const filterBy = searchInputsArr[i].name;
            const result = searchInputsArr[i].result;
            if (typeSearch === "exact") {
                filteredData = searchExact(filteredData, info, filterBy, result);
            } else {

            }
        }
        console.log("Final filtered data: ", filteredData);
    }

    const updateOnContent = (nowShowing) => {
        onContent = nowShowing;
        searchInputs = {}
    };

    const init = (firstShow) => {
        onContent = firstShow;
        SearchDom.init(search); // TODO: Make the second one searchNLP
    };

    return {
        search,
        searchExact,
        updateOnContent,
        init,
    };
})();

export default Search;
