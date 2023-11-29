# Developer Notes

## Need To Know

### Change Google Sheet Format

If you change the format of the Google Sheets (like switch the order of the labels/columns or change the name of a label), you need to:

#### Updating Labels for DOM

-   Go to `./src/filters/data/<content>Filter.json`
-   Edit it to match, specifically: `"database-name"`
-   Notice the `application:<invented value>`'s implementation is in `./src/filters/filter.js`

#### Updating Google Script

-   Go to `./src/fetchData/fetchData.js`
-   There you'll find the links to the google scripts (ex: "const articlesJSONUrl = "https://script.google.com/macros/s/AKfycb...")
-   Need to update the script to match the changes done
-   Watch 8min video https://www.youtube.com/watch?v=uJDLT8nh2ps for guidance

### Add Data to Sheets

-   Need to refresh (because need to get new imageID to imageLink connection):
    -   https://docs.google.com/spreadsheets/d/1XIstWw5THH_d7FBWnCvYAfOltcUaZqB9jR82JgY4c-Q/edit?usp=drive_link
    -   https://docs.google.com/spreadsheets/d/1kVVqqgXejexsSwqnbSSTQmcDD3l5f0VByqe1RvzK1uU/edit?usp=drive_link
    -   Need to go to the script and uncomment the `// list_all_files_inside_one_folder_without_subfolders();` and run it

## Config

#### Prettier

To run Prettier: npx prettier . --write

#### ESLint

In .vscode/settings.json, you can comment/uncomment ' "eslint.enable": false, ' to see/unsee eslint errors
