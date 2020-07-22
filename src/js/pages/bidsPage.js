import bids from "./../bids/bidsController.js";
import renderPreloader from "../preloader/preloader.js";

export default function (state) {
    if (typeof state["bids"] === "undefined") {
        // Отображаем прелоудер если ответ с сервера не получен
        renderPreloader();
    }
    setTimeout(function () {
        // Очищаем контейнер app
        document.querySelector("#app").innerHTML = "";
        // Запускаем компонент bids
        bids(state);
    }, 3000);
}
