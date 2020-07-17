import * as view from "./listingView.js";

export default function (state) {
    // Рендериг контейнера для карточек при старте
    view.render();
    // FIXME: 1, 2 Можно создать одну ф-ю
    // ! 1
    if (state.filter.filterView === "cards" || !state.filter.filterView) {
        // Обход массива с результатами, рендер карточек
        state.results.forEach((item) => {
            view.renderCard(item, state.favourites.isFav(item.id));
        });
    } else {
        // Обход массива с результатами, рендер панелей
        state.results.forEach((item) => {
            view.renderPanel(item, state.favourites.isFav(item.id));
        });
    }

    // Запускаем прослушку клика на иконки "Добавить в избранное"
    addToFavsListener();

    // Подписка на пользовательское событие
    state.emitter.subscribe("event:render-listing", () => {
        // Очистка контейнера с карточками
        view.clearListingContainer();
        // ! 2

        // Обход массива с результатами, рендер карточек
        if (state.filter.filterView === "cards" || !state.filter.filterView) {
            state.results.forEach((item) => {
                view.renderCard(item, state.favourites.isFav(item.id));
            });
        } else {
            state.results.forEach((item) => {
                view.renderPanel(item, state.favourites.isFav(item.id));
            });
        }

        // Запускаем прослушку клика на иконки "Добавить в избранное"
        addToFavsListener();
    });

    // Событие Клик по иконкам отображения обьектов(radio btns)
    document.querySelector(".view-options__type").addEventListener("click", (e) => {
        if (e.target.getAttribute("name") === "displayType") {
            // Записываем значение input radio в state
            state.filter.filterView = e.target.value;
            // Очистка контейнера с карточками
            view.clearListingContainer();

            if (e.target.value === "cards") {
                // Обход массива с результатами, рендер карточек
                state.results.forEach((item) => {
                    view.renderCard(item, state.favourites.isFav(item.id));
                });
            } else {
                // Обход массива с результатами, рендер карточек
                state.results.forEach((item) => {
                    view.renderPanel(item, state.favourites.isFav(item.id));
                });
            }
        }
    });

    // Ф-я для работы иконок "Добавить в избранное"
    function addToFavsListener() {
        console.log(document.getElementsByClassName("card__like"));
        Array.from(document.getElementsByClassName("card__like")).forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                // Находим ID обьекта по которому кликнули
                let currentId;
                if (e.target.closest(".card")) {
                    currentId = e.target.closest(".card").dataset.id;
                } else if (e.target.closest(".panel")) {
                    currentId = e.target.closest(".panel").dataset.id;
                }
                // Добавляем/убираем элемент из избранного
                state.favourites.toggleFav(currentId);

                // Включаем/выключаем иконку с избранным
                view.toggleFavouriteIcon(e.target.closest(".card__like"), state.favourites.isFav(currentId));
            });
        });
    }
}
