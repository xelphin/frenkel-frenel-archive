import FilterDom from "./filterDom";
import devData from "../../devData.json";

const Filter = (function Filter() {
    const filterContainerIdPostFix = "-filter-container";
    let currContent = "articles";

    const getFilterContainer = (name) => name + filterContainerIdPostFix;

    // SEARCH FUNCTIONS
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

    const search = (searchData) => {
        console.log(searchData);
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
    const init = (firstShow = "articles") => {
        Object.keys(devData).forEach((content) => {
            createFilterItems(content);
        });
        // Show only filter items from one content type
        FilterDom.hideAllFilterItems();
        switchToContent(firstShow);
    };

    return {
        init,
        search,
        switchToContent
    };
})();

export default Filter;
