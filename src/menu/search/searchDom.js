const SearchDom = (function SearchDom() {
    const inputClassName = "filter-item-input";
    const searchBtn = document.querySelector("#filter-search-btn");
    const searchExactBtn = document.querySelector("#filter-search-exact-btn");

    const getSearchInputValues = (contentType) => {
        let allInputs = Array.from(document.getElementsByClassName(inputClassName));
        let myArr = [];
        for (let i = 0; i < allInputs.length; i += 2) {
            if (allInputs[i].getAttribute("data-from") === contentType) {
                let result = allInputs[i].value.replace(/\|/g, '').replace(/\~/g, '');
                let name = allInputs[i].getAttribute("data-item");
                myArr[i] = name;
                myArr[i+1] = result;
            }
        }
        console.log("printing myArr: ", myArr);
        return myArr;
    }

    const getSearchLabels = (callbackCreateInputObj, contentType) => { 
        let allInputs = Array.from(document.getElementsByClassName(inputClassName));
        let allInputsObjToFill = {};
        for (let i = 0; i < allInputs.length; i += 1) {
            if (allInputs[i].getAttribute("data-from") === contentType) {
                const currentInput = allInputs[i];
                const name = currentInput.getAttribute("data-item");
                // let result = currentInput.value.replace(/\|/g, '');
                allInputsObjToFill[name] = callbackCreateInputObj(name);
                // console.log(`allInputsObjToFill[${name}].result  is   ${allInputsObjToFill[name].result}`);
            }
        }
        // console.log("so finally we should have , : ", allInputsObjToFill);
        return allInputsObjToFill;
    };

    const init = (callbackForExactSearch, callbackForNLPSearch) => {
        // Search Buttons
        searchExactBtn.addEventListener("click", () =>
           callbackForExactSearch(),
        );
        searchBtn.addEventListener("click", () => callbackForNLPSearch());
    };

    return {
        getSearchInputValues,
        getSearchLabels,
        init,
    };
})();

export default SearchDom;
