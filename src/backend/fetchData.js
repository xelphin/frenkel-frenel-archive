// IMPORTANT: Don't add module imports or be very careful, this is a PUB module, like a utility,
//            shouldn't import things from front-end

const FetchData = (function FetchData() {
    const getExtension = (str) => {
        if (str.lastIndexOf(".") === -1) return "";
        return str.split(".")[1];
    };

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
            const ext = getExtension(data.user[i].id);
            obj[removeExtension(data.user[i].id)] = data.user[i];
            obj[removeExtension(data.user[i].id)].extension = ext;
        }
        return obj;
    };

    const fetchObject = async (url, name) => {
        const urlJson = await fetchData(url);
        if (urlJson === undefined) {
            throw new Error(
                `Go to the google Script and fix the issues. Problematic link: ${url}`,
            );
        }
        const obj = reOrganizeData(urlJson);
        console.log(`${name}:`, obj);
        return obj;
    };

    return {
        fetchObject,
    };
})();

export default FetchData;
