import * as view from "./listingView.js";

export default function (state) {
    // Рендериг контейнера для карточек при старте
    view.render();
    // Выбор в каком виде будут рендериться карточки
    chooseRenderType(state.results, state.filter.filterView);
    // Запускаем прослушку клика на иконки "Добавить в избранное"
    addToFavsListener();

    // Подписка на пользовательское событие
    state.emitter.subscribe("event:render-listing", () => {
        // Очистка контейнера с карточками
        view.clearListingContainer();
        // Выбор в каком виде будут рендериться карточки
        chooseRenderType(state.results, state.filter.filterView);
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

    // Клик по option для сортировки по ценам и площади
    document.querySelector("#sort-cards-by").addEventListener("click", (e) => {
        Array.from(e.target.children).forEach((option) => {
            if (option.selected) {
                // Сортировка массива в зависимости от выбранного option
                const sortedArr = sortElements(option.value, state.results);

                sortedArr.forEach((item) => {
                    // Очистка котейнера с карточками
                    view.clearListingContainer();
                    // Выбор в каком виде будут рендериться карточки
                    chooseRenderType(state.results, state.filter.filterView);
                    // Запускаем прослушку клика на иконки "Добавить в избранное"
                    addToFavsListener();
                });
            }
        });
    });

    // Ф-я сортировки элементов
    function sortElements(value, arr) {
        const sortType = value.split("-");
        arr.sort(function (a, b) {
            return a[sortType[0]] - b[sortType[0]];
        });

        if (sortType[1] === "ASC") {
            return arr;
        } else {
            return arr.reverse();
        }
    }

    // Ф-я для работы иконок "Добавить в избранное"
    function addToFavsListener() {
        Array.from(document.getElementsByClassName("card__like")).forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                // Находим ID обьекта по которому кликнули
                let currentId;
                if (e.target.closest(".card")) {
                    currentId = e.target.closest(".card").dataset.id;
                    console.log("card");
                } else if (e.target.closest(".panel")) {
                    currentId = e.target.closest(".panel").dataset.id;
                    console.log("panel");
                }
                // Добавляем/убираем элемент из избранного
                state.favourites.toggleFav(currentId);

                // Включаем/выключаем иконку с избранным
                view.toggleFavouriteIcon(e.target.closest(".card__like"), state.favourites.isFav(currentId));
            });
        });
    }

    // Ф-я которая определяет в каком виде должны рендерится элементы
    function chooseRenderType(arr, filterType) {
        if (filterType === "cards" || !filterType) {
            arr.forEach((item) => {
                view.renderCard(item, state.favourites.isFav(item.id));
            });
        } else {
            arr.forEach((item) => {
                view.renderPanel(item, state.favourites.isFav(item.id));
            });
        }
    }
}
