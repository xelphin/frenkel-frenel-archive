const FilterDom = (function FilterDom() {
    const inputClassName = "filter-item-input";
    const allFiltersContainer = document.querySelector("#filter-container");

    const makeInputId = (contentType, inputId) => `${contentType}-item-input-${inputId}`

    const createButtonSearch = (contentType, className, text, type = "exact") => {
        const buttonSearch = document.createElement("button");
        buttonSearch.id = `${contentType}-${className}`;
        buttonSearch.class = className;
        // buttonSearch.style.display = "none";
        buttonSearch.textContent = text;
        buttonSearch.setAttribute("data-from", contentType);
        buttonSearch.setAttribute("data-type", type);
        return buttonSearch;
    }

    // CREATE SUBMIT BUTTONS
    const createSubmitButtons = (contentType) => {
        // <div id="<contentType>-buttons-container" class="buttons-container">
        //     <button id="<contentType>-filter-search-btn" class="filter-search-btn">Search</button>
        //     <button id="<contentType>-filter-search-exact-btn" class="filter-search-exact-btn">Search Exact</button>
        // </div>
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = `${contentType}-buttons-container`;
        buttonsContainer.classList.add("buttons-container");
        // const buttonSearch = createButtonSearch(contentType, "filter-search-btn", "Search", "nlp");
        const buttonSearchExact = createButtonSearch(contentType, "filter-search-exact-btn", "Search Exact", "exact");
        // buttonsContainer.appendChild(buttonSearch);
        buttonsContainer.appendChild(buttonSearchExact);
        return buttonsContainer;

    }

    // HELPER (Create Filter Items)
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
        input.classList.add(inputClassName);
        input.setAttribute("data-item", inputId);
        input.setAttribute("data-from", contentType);
        input.placeholder = placeholder;
        return input;
    };

    const createFilterItem = (infoObj, key, contentType) => {
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
        const filterItem = document.createElement("div");
        filterItem.setAttribute("class", "filter-item");
        filterItem.appendChild(createLabel(infoObj["label-text"], contentType, key));
        let placeholder = infoObj["label-text"];
        if (Object.prototype.hasOwnProperty.call(infoObj, 'placeholder')) placeholder = infoObj.placeholder;
        filterItem.appendChild(
            createInput(key, infoObj["label-text"], infoObj.type, placeholder, contentType),
        );

        return filterItem;
    };

    // INIT FORM
    const gatherAllInputs = (contentType) => {
        const allInputsNodeList = document.getElementsByClassName(inputClassName);
        const allInputs = Array.from(allInputsNodeList);
        const inputsArr = [];
        for (let i = 0; i < allInputs.length; i += 1) {
            if (allInputs[i].getAttribute("data-from") === contentType) {
                const inputObj = {}
                inputObj.labelKey = allInputs[i].getAttribute("data-item");
                inputObj.result = allInputs[i].value;
                if (allInputs[i].type === "checkbox") {
                    inputObj.result = allInputs[i].checked;
                }
                inputsArr[i] = inputObj;
            }
        }
        return inputsArr;
    }

    const getSearchData = (event, searchCallback) => {
        event.preventDefault()
        const fromContent = event.submitter.getAttribute("data-from");
        const typeSearch = event.submitter.getAttribute("data-type");
        //
        const inputsArr = gatherAllInputs(fromContent);
        //
        const searchData = {}
        searchData.inputs = inputsArr;
        searchData.content = fromContent;
        searchData.typeSearch = typeSearch;
        //
        searchCallback(searchData);
    }

    const initForm = (form, searchCallback) => {
        form.addEventListener('submit', (event) => getSearchData(event, searchCallback));
    }

    // CREATE FILTER ITEM
    const createFilterItems = (labelInfoObj, containerId, contentType, searchCallback) => {
        const container = document.querySelector(`#${containerId}`);
        // Add items
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
        // Add submit buttons
        container.appendChild(document.createElement("br"));
        container.appendChild(createSubmitButtons(contentType));
        initForm(container, searchCallback);
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
