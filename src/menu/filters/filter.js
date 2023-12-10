import FilterDom from "./filterDom";
import devData from "../../devData.json";
import ExactSearch from "./search/exactSearch";
import DataFunctions from "../../backend/dataFunctions";

const Filter = (function Filter() {
    const filterContainerIdPostFix = "-filter-container";
    let currContent = "articles";
    let showOnlyCardsCallback;

    const getFilterContainer = (name) => name + filterContainerIdPostFix;

    // SEARCH FUNCTIONS
    const search = (searchData) => {
        console.log(searchData);
        let items = Object.values(DataFunctions.getAllItems(currContent));
        // TODO: Continue here
        const filters = searchData.inputs;
        filters.forEach((filter) => {
            const filterName = filter.labelKey;
            const filterInfo = DataFunctions.getLabelInfo(currContent, filter.labelKey);
            const userInput = filter.result;
            if (userInput !== "" && filterInfo !== undefined) {
                if (searchData.typeSearch === "exact") {
                    items = ExactSearch.search(items, filterName, filterInfo, userInput);
                    const itemsIdArray = items.map(obj => obj.id);
                    showOnlyCardsCallback(currContent, itemsIdArray);
                } else if (searchData.typeSearch === "nlp") {
                    
                }
            }
        });
        
    }

    // FILTER CREATION FUNCTIONS
    const createFilterItems = (currContentType) => {
        const labelInfoObj = devData[currContentType].filterLabels;
        const containerId = getFilterContainer(currContentType); // the id of the container where the filter-items will populate
        FilterDom.createFilterItems(labelInfoObj, containerId, currContentType, search);
    };

    // Switch from showing filters of one content type, to another (example, from "articles"'s filters to "paintings"'s filters)
    const switchToContent = (newContent) => {
        const oldContainerId = getFilterContainer(currContent);
        FilterDom.hideSpecificFilterContainer(oldContainerId);
        const newContainerId = getFilterContainer(newContent);
        FilterDom.showSpecificFilterContainer(newContainerId);
        currContent = newContent;
    };

    // INIT
    const init = (showOnlyCardsCallbackSent, firstShow = "articles") => {
        Object.keys(devData).forEach((content) => {
            createFilterItems(content);
        });
        // Show only filter items from one content type
        FilterDom.hideAllFilterItems();
        switchToContent(firstShow);
        showOnlyCardsCallback = showOnlyCardsCallbackSent;
    };

    return {
        init,
        search,
        switchToContent
    };
})();

export default Filter;
