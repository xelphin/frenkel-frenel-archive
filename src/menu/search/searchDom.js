const SearchDom = (function SearchDom() {
    const inputClassName = "filter-item-input";
    const searchBtn = document.querySelector("#filter-search-btn");
    const searchExactBtn = document.querySelector("#filter-search-exact-btn");

    const getSearchInputs = (callbackCreateInputObj) => {
        const allInputs = document.getElementsByClassName(inputClassName);
        const allInputsObj = {};
        for (let i = 0; i < allInputs.length; i += 1) {
            const currentInput = allInputs[i];
            const name = currentInput.getAttribute("data-item");
            const result = currentInput.value;
            allInputsObj[name] = callbackCreateInputObj(name, result);
        }
        return allInputsObj;
    };

    const init = (callbackForExactSearch, callbackForNLPSearch) => {
        searchExactBtn.addEventListener("click", () =>
            callbackForExactSearch(),
        );
        searchBtn.addEventListener("click", () => callbackForNLPSearch());
    };

    return {
        getSearchInputs,
        init,
    };
})();

export default SearchDom;
