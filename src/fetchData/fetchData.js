/*
To be able to extract google sheet data, I followed video: https://www.youtube.com/watch?v=uJDLT8nh2ps
Those are the links I ended up creating: 'articlesJSONUrl', 'paintingsJSONUrl'
*/

const FetchData = (function FetchData() {
    const articlesJSONUrl =
        "https://script.google.com/macros/s/AKfycbxJM7LWF55WxUhZCZ7NqGFQZMZE6zhqDtQ3gErnbRSnJ55zvW2UTSZbBlwzRC-PxacX5A/exec";
    const paintingsJSONUrl =
        "https://script.google.com/macros/s/AKfycbzumFKXgW69xcJCnB0L0o_19BdLqd_lJVValAFUv4OmxNCqH25V6uS2bAPn8kRTjZ6c/exec";
    const articlesIdToLinkUrl =
        "https://script.google.com/macros/s/AKfycbzUqW3MzqPAmGXl9dhIr1O6ouonTK0fkG7VQ6Hvo3VvOKfHbpqqk26MneOEb12dpOmH/exec";
    const paintingsIdToLinkUrl =
        "https://script.google.com/macros/s/AKfycbxI4qPV5fZ4Y4yHEeFxex1CP41RNCK-ydOm6uA-uVRdbq6pDg4mOOez4DPQ2c_OmtPGBw/exec";

    const removeExtension = (str) => {
        const lastDotIndex = str.lastIndexOf(".");
        if (lastDotIndex !== -1) {
            return str.substring(0, lastDotIndex);
        }
        return str;
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch: ${response.status} ${response.statusText}`,
                );
            }
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching JSON:", error);
            return undefined;
        }
    };

    const reOrganizeData = (data) => {
        const obj = {};
        if (data.user === undefined) {
            throw new Error(
                `Expected data to be in format as depicted in video https://www.youtube.com/watch?v=uJDLT8nh2ps`,
            );
        }
        for (let i = 0; i < data.user.length; i += 1) {
            obj[removeExtension(data.user[i].ID)] = data.user[i];
        }
        return obj;
    };

    const fetchArticlesSheet = async () => {
        const articleData = await fetchData(articlesJSONUrl);
        if (articleData === undefined) {
            throw new Error(
                `Go to the google Script of articles, and fix the issues. Link: ${articlesJSONUrl}`,
            );
        }
        const articlesObj = reOrganizeData(articleData);
        console.log("Articles: ", articlesObj);
        return articlesObj;
    };

    const fetchPaintingsSheet = async () => {
        const paintingsData = await fetchData(paintingsJSONUrl);
        if (paintingsData === undefined) {
            throw new Error(
                `Go to the google Script of articles, and fix the issues. Link: ${paintingsJSONUrl}`,
            );
        }
        const paintingsObj = reOrganizeData(paintingsData);
        console.log("Paintings: ", paintingsObj);
        return paintingsObj;
    };

    const fetchArticlesIdToLink = async () => {
        const articlesIdToLink = await fetchData(articlesIdToLinkUrl);
        if (articlesIdToLink === undefined) {
            throw new Error(
                `Go to the google Script and fix the issues. Link: https://script.google.com/u/0/home/projects/1fVpvjsdzDQ1auZMu27BkgC0Vv9Og6HuC2GTXqIaThb7AmsaTycq_zPGE/edit`,
            );
        }
        const obj = reOrganizeData(articlesIdToLink);
        console.log("Articles: ID to link: ", obj);
        return obj;
    };

    const fetchPaintingIdToLink = async () => {
        const paintingsIdToLink = await fetchData(paintingsIdToLinkUrl);
        if (paintingsIdToLink === undefined) {
            throw new Error(
                `Go to the google Script and fix the issues. Link: https://script.google.com/u/0/home/projects/1bkiYDO233iV5_KiSEADn7ubCspPJa7UP54v_OvbqK2Mf0G4OMWPe2nwO/edit`,
            );
        }
        const obj = reOrganizeData(paintingsIdToLink);
        console.log("Paintings: ID to link: ", obj);
        return obj;
    };

    return {
        fetchArticlesSheet,
        fetchPaintingsSheet,
        fetchArticlesIdToLink,
        fetchPaintingIdToLink,
    };
})();

export default FetchData;
