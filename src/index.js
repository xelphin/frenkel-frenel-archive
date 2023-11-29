// SCSS
import "./stylesheets/style.scss";
// JS
import Menu from "./menu/menu";
import FetchData from "./fetchData/fetchData";

Menu.init();

FetchData.fetchArticlesSheet();
FetchData.fetchPaintingsSheet();
FetchData.fetchArticlesIdToLink();
FetchData.fetchPaintingIdToLink();
