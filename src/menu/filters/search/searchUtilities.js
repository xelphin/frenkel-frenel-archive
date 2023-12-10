const SearchUtilities = (function SearchUtilities() {
    const createDate = (year, month = 1, day = 1) => {
        const date = new Date();
        date.setFullYear(Number(year));
        date.setMonth(Number(month - 1));
        date.setDate(Number(day));
        return date;
    };

    const getFromTextTheDateAux = (text) => {
        // Get the date
        const date = text.split("/");
        if (date.length === 3) return createDate(date[2], date[1], date[0]);
        if (date.length === 2) return createDate(date[2], date[1]);
        if (date.length === 1) return createDate(date[2]);
        return createDate(1900);
    };

    const getFromTextTheDate = (text) => {
        if (text === "") return undefined;
        // Get the smallest of the dates
        const textSep = text.split(",");
        const dates = textSep.map(getFromTextTheDateAux);
        const smallestDate = dates.reduce(
            (minDate, currentDate) =>
                currentDate < minDate ? currentDate : minDate,
            dates[0],
        );
        return smallestDate;
    };

    const cleanText = (text) => {
        let newText = text.toLowerCase();
        newText = newText.trim();
        newText = newText.replace(/\s+/g, " ");
        return newText;
    };

    return {
        getFromTextTheDate,
        cleanText,
    };
})();

export default SearchUtilities;
