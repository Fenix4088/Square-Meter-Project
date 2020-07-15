import * as view from "./listingView.js";

export default function (state) {
    // Рендериг контейнера для карточек при старте
    view.render();
    // Обход массива с результатами, рендер карточек
    state.results.forEach((item) => {
        view.renderCard(item, state.favourites.isFav(item.id));
    });

    // Запускаем прослушку клика на иконки "Добавить в избранное"
    addToFavsListener();

    // Подписка на пользовательское событие
    state.emitter.subscribe("event:render-listing", () => {
        // Очистка контейнера с карточками
        view.clearListingContainer();
        // Обход массива с результатами, рендер карточек
        state.results.forEach((item) => {
            view.renderCard(item, state.favourites.isFav(item.id));
        });

        // Запускаем прослушку клика на иконки "Добавить в избранное"
        addToFavsListener();
    });

    // Ф-я для работы иконок "Добавить в избранное"
    function addToFavsListener() {
        Array.from(document.getElementsByClassName("card__like")).forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                // Находим ID обьекта по которому кликнули
                const currentId = e.target.closest(".card").dataset.id;
                // Добавляем/убираем элемент из избранного
                state.favourites.toggleFav(currentId);

                // Включаем/выключаем иконку с избранным
                view.toggleFavouriteIcon(e.target.closest(".card__like"), state.favourites.isFav(currentId));
            });
        });
    }
}
