import homePage from "./pages/homePage.js";
import singlItem from "./pages/singlItemPage.js";
import favouritesPage from "./pages/favouritesPage.js";
import bidsPage from "./pages/bidsPage.js";
import errorPage from "./pages/errorPage.js";

// Массив с маршрутами
const routes = [
    { path: "/", component: homePage },
    { path: "item", component: singlItem },
    { path: "favourites", component: favouritesPage },
    { path: "bids", component: bidsPage },
];

// Ф-я которая принемает в себя маршрут и выдает название компонента который нужный запустить
function findComponentByPath(path, routes) {
    return routes.find(function (route) {
        return route.path === path;
    });
}

// Ф-я для работы роутера
function router() {
    // Обращаемся к адресу в адрессной строке
    const pathArray = location.hash.split("/");
    // Устанавлеваем текущий маршрут
    let currentPath = pathArray[0] === "" ? "/" : pathArray[1];
    currentPath = currentPath === "" ? "/" : currentPath;

    const { component = errorPage } = findComponentByPath(currentPath, routes) || {};
    component();
}
// ! Решение через обьект
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
// Запускаем роутер в случае изменения hash (то есть перехода по ссылке)
window.addEventListener("hashchange", router);

// Запускаем роутер в случае загрузки страници
window.addEventListener("load", router);
