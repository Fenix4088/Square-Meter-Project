import filter from "./../filter/filterController.js";
import listing from "./../listing/listingController.js";

export default async function (state) {
    document.querySelector("#app").innerHTML = "";
    // Запуск формы фильтра
    await filter(state);
    // Запуск листенга(listingController)
    listing(state);
}
