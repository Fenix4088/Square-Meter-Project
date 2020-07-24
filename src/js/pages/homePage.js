import filter from "./../filter/filterController.js";
import listing from "./../listing/listingController.js";
import renderPreloader from "../preloader/preloader.js";

export default async function (state) {
    // renderPreloader();

    if (state.results.length === 0) {
        // Отображаем прелоудер если ответ с сервера не получен
        renderPreloader();
    }

    setTimeout(async function () {
        document.querySelector("#app").innerHTML = "";

        // Запуск формы фильтра
        await filter(state);
        // Запуск листенга(listingController)
        listing(state);
    }, 3000);
}
