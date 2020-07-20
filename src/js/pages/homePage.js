import filter from "./../filter/filterController.js";
import listing from "./../listing/listingController.js";
import renderPreloader from '../preloader/preloader.js';

export default async function (state) {
    renderPreloader();
    setTimeout( async function () {

        document.querySelector("#app").innerHTML = "";
    
        // Запуск формы фильтра
        await filter(state);
        // Запуск листенга(listingController)
        listing(state);
    }, 3000)

}
