import FilterDom from "./filterDom";
import devData from "../../devData.json";

const Filter = (function Filter() {
    const filterContainerIdPostFix = "-filter-container";
    let currContent = "articles";

    const getFilterContainer = (name) => name + filterContainerIdPostFix;

    const createFilterItems = (currContentType) => {
        const labelInfoObj = devData[currContentType].filterLabels;
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
        Object.keys(devData).forEach((content) => {
            createFilterItems(content);
        });
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
