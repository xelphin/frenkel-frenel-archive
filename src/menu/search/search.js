import SearchDom from "./searchDom";
// import ExactSearch from "./exactSearch";
import DataFunctions from "../../backend/dataFunctions";

const Search = (function Search() {
    let searchInputs = {};
    let onContent;

    const createInputObj = (name, result) => {
        // Is a callback for when gathering the inputs in the dom
        const searchInput = {};
        searchInput.name = name;
        searchInput.result = result;
        searchInput.infoOnInput = DataFunctions.getLabelInfo(onContent, name);
        return searchInput;
    };

    const getSearchInputs = () => {
        searchInputs = SearchDom.getSearchInputs(createInputObj);
    };

    const searchExact = () => {
        getSearchInputs();
        // Apply filters from ExactSearch
        console.log("Inputs for search: ", searchInputs);
    };

    const updateOnContent = (nowShowing) => {
        onContent = nowShowing;
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
