const FilterDom = (function FilterDom() {
    const allFiltersContainer = document.querySelector("#filter-container");

    // HELPER
    const createLabel = (labelText) => {
        const label = document.createElement("label");
        label.textContent = `${labelText}:`;
        label.class = "filter-item-label";
        return label;
    };

    const createInput = (inputId, labelText, type) => {
        const input = document.createElement("input");
        input.id = `item-input-${inputId}`;
        input.type = type;
        input.class = "filter-item-input";
        input.placeholder = labelText;
        return input;
    };

    const createFilterItem = (infoObj, key) => {
        const filterItem = document.createElement("div");
        filterItem.setAttribute("class", "filter-item");
        filterItem.appendChild(createLabel(infoObj["label-text"]));
        filterItem.appendChild(
            createInput(key, infoObj["label-text"], infoObj.type),
        );

        return filterItem;
    };

    // CREATE FILTER ITEM
    const createFilterItems = (labelInfoObj, containerId) => {
        /*
            <div class="filter-item">
                <label class="filter-item-label">Author:</label>
                <input
                    type="<type>"
                    placeholder="<label-text>"
                    class="filter-item-input"
                    id = "item-input-<[key of object]>"
                />
            </div>
        */
        const container = document.querySelector(`#${containerId}`);

        Object.entries(labelInfoObj).forEach(([key, value]) => {
            let item;
            try {
                item = createFilterItem(value, key);
            } catch (error) {
                throw new Error(
                    `In your /src/data/<content>LabelInfo.json you have a mistake at key: ${key}, error received: ${error}`,
                );
            }

            container.appendChild(item);
        });
    };

    // HIDE/SHOW FILTER ITEMS
    const hideAllFilterItems = () => {
        const { children } = allFiltersContainer;

        for (let i = 0; i < children.length; i += 1) {
            const child = children[i];
            child.style.display = "none";
        }
    };

    const showSpecificFilterContainer = (filterContainerId) => {
        const filterContainer = document.querySelector(`#${filterContainerId}`);
        filterContainer.style.display = "grid";
    };

    const hideSpecificFilterContainer = (filterContainerId) => {
        const filterContainer = document.querySelector(`#${filterContainerId}`);
        filterContainer.style.display = "none";
    };

    return {
        createFilterItems,
        hideAllFilterItems,
        showSpecificFilterContainer,
        hideSpecificFilterContainer,
    };
})();

export default FilterDom;
