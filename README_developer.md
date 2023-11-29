# Developer Notes

## Need To Know

If you change the format of the Google Sheets (like switch the order of the labels/columns or change the name of a label), you need to:

### Updating Labels for DOM

-   Go to `./src/data/<content>LabelInfo.json`
-   Edit it to match
-   Notice the `application:<invented value>`'s implementation is in `./src/filters/filter.js`

### Updating Google Script

-   Go to `./src/fetchData/fetchData.js`
-   There you'll find the links to the google scripts (ex: "const articlesJSONUrl = "https://script.google.com/macros/s/AKfycb...")
-   Need to update the script to match the changes done
-   Watch 8min video https://www.youtube.com/watch?v=uJDLT8nh2ps for guidance

## Config

#### Prettier

To run Prettier: npx prettier . --write

#### ESLint

In .vscode/settings.json, you can comment/uncomment ' "eslint.enable": false, ' to see/unsee eslint errors
