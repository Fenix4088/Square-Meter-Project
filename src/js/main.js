import homePage from "./pages/homePage.js";
import singlItem from "./pages/singlItemPage.js";
import favouritesPage from "./pages/favouritesPage.js";
import bidsPage from "./pages/bidsPage.js";
import errorPage from "./pages/errorPage.js";
import EventEmitter from "./utils/EventEmitter.js";
import Favourites from "./favourites/favouritesModel.js";

// * Application state object
const state = {
    results: [],
    emitter: new EventEmitter(),
    favourites: new Favourites(),
    objectsView: "",
    panelFilterType: "",
    renderType: JSON.parse(localStorage.getItem("Render Type")) || "",
    filterData : {
        complex: "",
        rooms: [],
        sqmin: "",
        sqmax: "",
        pricemin: "",
        pricemax: "",
    },
};
window.state = state;
// * Router
// Array with routes
const routes = [
    { path: "/", component: homePage },
    { path: "item", component: singlItem },
    { path: "favourites", component: favouritesPage },
    { path: "bids", component: bidsPage },
];

// Function that takes the route and gives the name of the component that you want to run
function findComponentByPath(path, routes) {
    return routes.find(function (route) {
        return route.path === path;
    });
}

// F-I for router operation
function router() {
    // Referring to the address in the address line
    const pathArray = location.hash.split("/");
    // Set the current routes
    let currentPath = pathArray[0] === "" ? "/" : pathArray[1];
    currentPath = currentPath === "" ? "/" : currentPath;

    // Possible parameter for the component, for example, the id of the card that was clicked
    state.routeParams = pathArray[2] ? pathArray[2] : "";

    const { component = errorPage } = findComponentByPath(currentPath, routes) || {};
    // Calling a router component, that is, a page
    component(state);
}
// ! Object solution
/*
const routes = {
    "/": homePage,
    "item": singlItem,
    "favourites": favouritesPage,
    "bids": bidsPage,
};
function findComponentByPath(path, routes) {
    return routes[path] || {}
}
currentPath = pathArray[0] && pathArray[1] ? pathArray[1] : '/';
*/

// We start the router in case of hash change (that is, following the link)
window.addEventListener("hashchange", router);

// We launch the router if the page is loaded
window.addEventListener("load", router);
