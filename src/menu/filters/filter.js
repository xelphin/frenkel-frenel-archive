import FilterDom from "./filterDom";
import articlesFilterInfo from "./data/articlesFilterInfo.json";
import paintingsFilterInfo from "./data/paintingsFilterInfo.json";

const Filter = (function Filter() {
    const filterContainerIdPostFix = "-filter-container";
    let currContent = "articles";

    const getLabelInfoObject = (currContentType) => {
        switch (currContentType) {
            case "articles":
                return articlesFilterInfo;
            case "paintings":
                return paintingsFilterInfo;
            default:
                throw new Error(
                    "The data-content value received (currContentType), doesn't have a corresponding file in ./src/data or function Filter.getLabelInfoObject() hasn't been programmed to consider it",
                );
        }
    };

    const getFilterContainer = (name) => name + filterContainerIdPostFix;

    const createFilterItems = (currContentType) => {
        const labelInfoObj = getLabelInfoObject(currContentType);
        const containerId = getFilterContainer(currContentType); // the id of the container where the filter-items will populate
        FilterDom.createFilterItems(labelInfoObj, containerId, currContentType);
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
        // Create the filter items from the ./data
        createFilterItems("articles");
        createFilterItems("paintings");
        // Show only filter items from one content type
        FilterDom.hideAllFilterItems();
        switchToContent(firstShow);
    };

    return {
        init,
        switchToContent,
    };
})();

export default Filter;
