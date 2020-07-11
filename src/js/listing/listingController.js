import * as view from "./listingView.js";

export default function (state) {
    console.log("Listing started");
    // Рендериг контейнера для карточек при старте
    view.render();
    // Обход массива с результатами, рендер карточек
    state.results.forEach((item) => {
        view.renderCard(item);
    });
    // Подписка на пользовательское событие
    state.emitter.subscribe("event:render-listing", () => {
        // Очистка контейнера с карточками
        view.clearListingContainer();
        // Обход массива с результатами, рендер карточек
        state.results.forEach((item) => {
            view.renderCard(item);
        });
    });
}
