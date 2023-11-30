# Developer Notes

## Need To Know

### Change Google Sheet Format

If you change the format of the Google Sheets (like switch the order of the labels/columns or change the name of a label), you need to:

#### Updating Labels for DOM

-   Go to `./src/devData.json`
-   Edit the `filterLabels` it to match, specifically: `"database-name"`
-   Notice the `application:<invented value>`'s implementation is in `./src/filters/filter.js` (TODO)

#### Updating Google Script

-   Go to `./src/devData.json` and you'll find the links in `sourceLinks`
-   Need to update the script to match the changes done
-   Watch 8min video https://www.youtube.com/watch?v=uJDLT8nh2ps for guidance

### Add Data to Sheets

-   Need to refresh (because need to get new imageID to imageLink connection):
    -   Go to `./src/devData.json` and you'll find the links in `sourceLinks` and to `idToLinkUrl`
    -   Need to go to the script and uncomment the `// list_all_files_inside_one_folder_without_subfolders();` and run it

## Config

#### Prettier

To run Prettier: npx prettier . --write

#### ESLint

In .vscode/settings.json, you can comment/uncomment ' "eslint.enable": false, ' to see/unsee eslint errors
