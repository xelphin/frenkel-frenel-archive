import FilterDom from "./filterDom";
import devData from "../../devData.json";
import ExactSearch from "./search/exactSearch";
import NLPSearch from "./search/nlpSearch";
import DataFunctions from "../../backend/dataFunctions";

const Filter = (function Filter() {
    const filterContainerIdPostFix = "-filter-container";
    let currContent = "articles";
    let showOnlyCardsCallback;
    let reOrderCardsCallback;

    const getFilterContainer = (name) => name + filterContainerIdPostFix;

    const createPointArray = (items) => {
        const points = {};
        items.forEach((item) => {
            points[item.id] = 1;
        }); 
        return points;
    }

    // SEARCH FUNCTIONS
    const search = (searchData) => {
        console.log("Filters: ", searchData);
        let items = Object.values(DataFunctions.getAllItems(currContent));
        let points = createPointArray(items);
        // TODO: Continue here
        const filters = searchData.inputs;
        filters.forEach((filter) => {
            const filterName = filter.labelKey;
            const filterInfo = DataFunctions.getLabelInfo(
                currContent,
                filter.labelKey,
            );
            const userInput = filter.result;
            if (userInput !== "" && filterInfo !== undefined) {
                if (searchData.typeSearch === "exact") {
                    items = ExactSearch.search(
                        items,
                        filterName,
                        filterInfo,
                        userInput,
                    );
                }
                else if (searchData.typeSearch === "nlp") {
                    points = NLPSearch.search(
                        items,
                        filterName,
                        filterInfo,
                        userInput,
                        points
                    );
                    console.log(`After filter ${filterName}: `, points);
                }
            }
        });
        if (searchData.typeSearch === "exact") {
            const itemsIdArray = items.map((obj) => obj.id);
            showOnlyCardsCallback(currContent, itemsIdArray);
        } else if (searchData.typeSearch === "nlp") {
            const itemsIdArray = NLPSearch.getSortedArrayOfIdsFromPoints(points);
            console.log("sorted ids: ", itemsIdArray);
            reOrderCardsCallback(currContent, itemsIdArray);
        }

    };

    // FILTER CREATION FUNCTIONS
    const createFilterItems = (currContentType) => {
        const labelInfoObj = devData[currContentType].filterLabels;
        const containerId = getFilterContainer(currContentType); // the id of the container where the filter-items will populate
        FilterDom.createFilterItems(
            labelInfoObj,
            containerId,
            currContentType,
            search,
        );
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
    const init = (cardsCallbacks, firstShow = "articles") => {
        Object.keys(devData).forEach((content) => {
            createFilterItems(content);
        });
        // Show only filter items from one content type
        FilterDom.hideAllFilterItems();
        switchToContent(firstShow);
        showOnlyCardsCallback = cardsCallbacks.showOnlyCards;
        reOrderCardsCallback = cardsCallbacks.reOrderCards;
    };

    return {
        init,
        search,
        switchToContent,
    };
})();

export default Filter;
