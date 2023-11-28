import FilterDom from "./filterDom";
import articlesLabelInfo from "../data/articlesLabelInfo.json";
import paintingsLabelInfo from "../data/paintingsLabelInfo.json";

const Filter = (function Filter() {
    const filterContainerIdPostFix = "-filter-container";

    const getLabelInfoObject = (currContentType) => {
        switch (currContentType) {
            case "articles":
                return articlesLabelInfo;
            case "paintings":
                return paintingsLabelInfo;
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
