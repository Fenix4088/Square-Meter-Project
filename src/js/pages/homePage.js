import filter from "./../filter/filterController.js";
import listing from './../listing/listingController.js'

export default async function (state) {
    // Запуск формы фильтра
    await filter(state);
    // Запуск листенга(eventEmitter)
    listing();
}
