# Developer Notes

## Need To Know

If you change the format of the Google Sheets (the labels in particular), you need to:

-   Go to `./src/data/<content>LabelInfo.json`
-   Edit it to match
-   Notice the `application:<invented value>`'s implementation is in `./src/filters/filter.js`

## Config

#### Prettier

To run Prettier: npx prettier . --write

#### ESLint

In .vscode/settings.json, you can comment/uncomment ' "eslint.enable": false, ' to see/unsee eslint errors
