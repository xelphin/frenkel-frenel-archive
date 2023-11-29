import FilterDom from "./filterDom";
import articlesFilterInfo from "../data/articlesFilterInfo.json";
import paintingsFilterInfo from "../data/paintingsFilterInfo.json";

const Filter = (function Filter() {
    const filterContainerIdPostFix = "-filter-container";

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

    const createFilterItems = (currContentType) => {
        const labelInfoObj = getLabelInfoObject(currContentType);
        const containerId = currContentType + filterContainerIdPostFix; // the id of the container where the filter-items will populate
        FilterDom.createFilterItems(labelInfoObj, containerId);
    };

    return {
        createFilterItems,
    };
})();

export default Filter;
