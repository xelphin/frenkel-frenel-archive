const FilterDom = (function FilterDom() {
    const allFiltersContainer = document.querySelector("#filter-container");

    const makeInputId = (contentType, inputId) => {
        return `${contentType}-item-input-${inputId}`;
    }

    // HELPER
    const createLabel = (labelText, contentType, inputId) => {
        const label = document.createElement("label");
        label.textContent = `${labelText}:`;
        label.class = "filter-item-label";
        label.setAttribute("for", makeInputId(contentType, inputId));
        return label;
    };

    const createInput = (inputId, labelText, type, placeholder, contentType) => {
        const input = document.createElement("input");
        input.id = makeInputId(contentType, inputId);
        input.type = type;
        input.classList.add("filter-item-input");
        input.setAttribute("data-item", inputId);
        input.setAttribute("data-from", contentType);
        input.placeholder = placeholder;
        return input;
    };

    const createFilterItem = (infoObj, key, contentType) => {
        const filterItem = document.createElement("div");
        filterItem.setAttribute("class", "filter-item");
        filterItem.appendChild(createLabel(infoObj["label-text"], contentType, key));
        let placeholder = infoObj["label-text"];
        if (infoObj.hasOwnProperty('placeholder')) placeholder = infoObj.placeholder;
        filterItem.appendChild(
            createInput(key, infoObj["label-text"], infoObj.type, placeholder, contentType),
        );

        return filterItem;
    };

    // CREATE FILTER ITEM
    const createFilterItems = (labelInfoObj, containerId, contentType) => {
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
                item = createFilterItem(value, key, contentType);
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
            if (child.classList.contains("specific-filter-container")) {
                child.style.display = "none";
            }
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
