// Works by giving points (the more points, the better the matchimport SearchUtilities from "./searchUtilities";

import SearchUtilities from "./searchUtilities";

const stringSimilarity = require("string-similarity");

const NLPSearch = (function NLPSearch() {
    const calculateCloseness = (v1, v2, type) => {
        let diff;
        if (type === "date") {
            diff = Math.abs(v1.getFullYear() - v2.getFullYear());
        } else {
            diff = Math.abs(v2 - v1);
        }
        return 1 / (diff + 0.5);
    };

    const applyRangePoints = (
        allItems,
        wantAbove,
        userInput,
        type,
        databaseName,
        points,
    ) => {
        console.log(
            `Points: ${databaseName}, by wanting above? ${wantAbove} the value ${userInput}, the type of the value is ${type}`,
        );
        // Filter
        const newPoints = {};
        let edgeValue = userInput;
        if (type === "date") {
            edgeValue = new Date(userInput);
        } else if (type === "number") {
            edgeValue = parseInt(userInput, 10);
        }
        try {
            allItems.forEach((item) => {
                const itemId = item.id;
                let itemValue = item[databaseName];
                const pointCurr = points[itemId];
                if (type === "date") {
                    itemValue = SearchUtilities.getFromTextTheDate(itemValue);
                } else if (type === "number") {
                    itemValue = parseInt(itemValue, 10);
                }
                if (itemValue === undefined || edgeValue === undefined) {
                    newPoints[itemId] = pointCurr * 0.3;
                } else if (edgeValue <= itemValue) {
                    if (wantAbove) {
                        newPoints[itemId] = pointCurr * 2;
                    } else {
                        newPoints[itemId] =
                            pointCurr *
                            calculateCloseness(itemValue, edgeValue, type);
                    }
                } else if (!wantAbove) {
                    newPoints[itemId] = pointCurr * 2;
                } else {
                    newPoints[itemId] =
                        pointCurr *
                        calculateCloseness(itemValue, edgeValue, type);
                }
            });
            return newPoints;
        } catch (error) {
            console.error("ERROR: ", error);
            return points;
        }
    };

    const applySimilarPoints = (allItems, databaseName, userInput, points) => {
        const newPoints = {};
        allItems.forEach((item) => {
            const itemId = item.id;
            const itemValue = item[databaseName];
            if (itemValue === "" || userInput === "") {
                newPoints[itemId] = points[itemId] * 0.01;
            } else {
                newPoints[itemId] =
                    stringSimilarity.compareTwoStrings(itemValue, userInput) *
                    points[itemId];
            }
        });
        return newPoints;
    };

    const applyExactPoints = (allItems, databaseName, userInput, points) => {
        console.log(
            `applyExactPoints: ${databaseName}, userInput ${userInput}`,
        );
        const newPoints = {};
        const cleanUserInput = SearchUtilities.cleanText(userInput);
        allItems.forEach((item) => {
            const itemId = item.id;
            const itemValue = SearchUtilities.cleanText(item[databaseName]);
            if (itemValue === "" || cleanUserInput === "") {
                newPoints[itemId] = points[itemId] * 0.01;
            } else if (itemValue === cleanUserInput) {
                newPoints[itemId] = points[itemId] * 2;
            } else {
                newPoints[itemId] = points[itemId] / 4;
            }
        });
        return newPoints;
    };

    const applyHasPoints = (allItems, databaseName, userInput, points) => {
        console.log(`applyHasPoints: ${databaseName}, userInput ${userInput}`);
        if (!userInput) return points;
        const newPoints = {};
        allItems.forEach((item) => {
            const itemId = item.id;
            const itemValue = item[databaseName];
            if (itemValue === "") {
                // Doesn't have value
                newPoints[itemId] = points[itemId] * 0.2;
            } else {
                // Has value
                newPoints[itemId] = points[itemId] * 2;
            }
        });
        return newPoints;
    };

    const checkSimilarArraysOfStrings = (user, item) => {
        let score = 1;
        for (let i = 0; i < user.length; i += 1) {
            let closest = 0.1;
            for (let j = 0; j < item.length; j += 1) {
                const calc = stringSimilarity.compareTwoStrings(
                    user[i],
                    item[j],
                );
                if (closest < calc) {
                    closest = calc;
                }
            }
            score *= closest;
        }
        if (score < 0.2) score = 0.2;
        if (score > 1) score = 1;
        return score;
    };

    const applySimilarTagsPoints = (
        allItems,
        databaseName,
        userInput,
        points,
    ) => {
        console.log(
            `applySimilarTagsPoints: ${databaseName}, userInput ${userInput}`,
        );
        const newPoints = {};
        let userTags = userInput.split(",");
        userTags = userTags.map((str) => SearchUtilities.cleanText(str));
        allItems.forEach((item) => {
            const itemId = item.id;
            if (item[databaseName] === "") {
                newPoints[itemId] = points[itemId] * 0.01;
            } else {
                const itemValueTags = item[databaseName]
                    .split(",")
                    .map((str) => SearchUtilities.cleanText(str));
                const score = checkSimilarArraysOfStrings(
                    userTags,
                    itemValueTags,
                );
                // console.log(`user: ${userTags}, item ${itemValueTags}, score: ${score}`);
                newPoints[itemId] = points[itemId] * score;
            }
        });
        return newPoints;
    };

    const getSortedArrayOfIdsFromPoints = (points) => {
        // turn into array (key = id , value = points)
        const keyValueArray = Object.entries(points).map(([key, value]) => ({
            key,
            value,
        }));
        // sort by point value
        const sorted = keyValueArray.sort((a, b) => b.value - a.value);
        // keep only the ids
        return sorted.map((item) => item.key);
    };

    const search = (allItems, filterName, filterInfo, userInput, points) => {
        const databaseName = filterInfo["database-name"];
        if (filterInfo.application === "similar") {
            return applySimilarPoints(
                allItems,
                databaseName,
                userInput,
                points,
            );
        }
        if (filterInfo.application === "exact") {
            return applyExactPoints(allItems, databaseName, userInput, points);
        }
        if (filterInfo.application === "similar-tags") {
            return applySimilarTagsPoints(
                allItems,
                databaseName,
                userInput,
                points,
            );
        }
        if (filterInfo.application === "range-min") {
            return applyRangePoints(
                allItems,
                true,
                userInput,
                filterInfo.type,
                databaseName,
                points,
            );
        }
        if (filterInfo.application === "range-max") {
            return applyRangePoints(
                allItems,
                false,
                userInput,
                filterInfo.type,
                databaseName,
                points,
            );
        }
        if (filterInfo.application === "has") {
            return applyHasPoints(allItems, databaseName, userInput, points);
        }
        return points;
    };

    return {
        search,
        getSortedArrayOfIdsFromPoints,
    };
})();

export default NLPSearch;
