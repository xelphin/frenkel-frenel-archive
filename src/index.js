// SCSS
import "./stylesheets/style.scss";
// JS
import Filter from "./filters/filter";
import FetchData from "./fetchData/fetchData";

Filter.createFilterItems("articles");

FetchData.fetchArticlesSheet();
FetchData.fetchPaintingsSheet();
FetchData.fetchArticlesIdToLink();
FetchData.fetchPaintingIdToLink();
