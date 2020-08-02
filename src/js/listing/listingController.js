import * as view from "./listingView.js";

export default function (state) {
    // Рендериг контейнера для карточек при старте
    view.render();
    // if(savedFilterRenderType != null) {
    //     state.renderType = savedFilterRenderType;
    // }
    // Выбор в каком виде будут рендериться карточки
    chooseRenderType(state.results, state.renderType);
    // Запускаем прослушку клика на иконки "Добавить в избранное"
    addToFavsListener();

    // Подписка на пользовательское событие
    state.emitter.subscribe("event:render-listing", () => {
        // Очистка контейнера с карточками
        view.clearListingContainer();
        // Выбор в каком виде будут рендериться карточки
        chooseRenderType(state.results, state.renderType);
        // Запускаем прослушку клика на иконки "Добавить в избранное"
        addToFavsListener();
    });

    // Событие Клик по иконкам отображения обьектов(radio btns)
    document.querySelector(".view-options__type").addEventListener("click", (e) => {
        if (e.target.getAttribute("name") === "displayType") {
            // Отображение панельного фильтра
            view.showPanelFilter(e.target);
            // Записываем значение input radio в state
            state.renderType = e.target.value;
            // Запись в LS
            localStorage.setItem('Render Type', JSON.stringify(state.renderType))
            // Очистка контейнера с карточками
            view.clearListingContainer();
            if (e.target.value === "cards") {
                // Обход массива с результатами, рендер карточек
                state.renderType = "cards";
                state.results.forEach((item) => {
                    view.renderCard(item, state.favourites.isFav(item.id));
                });
            } else {
                state.renderType = "list";
                // Обход массива с результатами, рендер карточек
                state.results.forEach((item) => {
                    view.renderPanel(item, state.favourites.isFav(item.id));
                });
            }

            // Обработка клика по иконке с сердечком
            addToFavsListener();
        }
    });

    // Клик по option для сортировки по ценам и площади
    document.querySelector("#sort-cards-by").addEventListener("change", (e) => {
        console.log(e.target.children);
        Array.from(e.target.children).forEach((option) => {
            if (option.selected) {
                // Сортировка массива в зависимости от выбранного option
                const sortedArr = sortElements(option.value, state.results);

                sortedArr.forEach((item) => {
                    // Очистка котейнера с карточками
                    view.clearListingContainer();
                    // Выбор в каком виде будут рендериться карточки
                    chooseRenderType(state.results, state.renderType );
                    // Запускаем прослушку клика на иконки "Добавить в избранное"
                    addToFavsListener();
                });
            }
        });
    });

    // Клик по элементу панельного фильтра
    document.querySelector(".panels-filter").addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-filter")) {
            // Определяем тип (возрастнание / убывание) и имя сортируемого обьекта
            if (e.target.dataset.status === "" || e.target.dataset.status === "ASC") {
                e.target.dataset.status = "DSC";
            } else {
                e.target.dataset.status = "ASC";
            }
            const sortName = e.target.dataset.filter; // sort_name, rooms .....
            const sortStatus = e.target.dataset.status; // ASC / DSC
            panelFilterSort(sortName, sortStatus);
            view.clearListingContainer();
            chooseRenderType(state.results, state.renderType);
        }
    });

    // Ф-я сортировки элементов
    function sortElements(value, arr) {
        // * Old version
        // const sortType = value.split("-");
        // arr.sort(function (a, b) {
        //     return a[sortType[0]] - b[sortType[0]];
        // });

        // if (sortType[1] === "ASC") {
        //     return arr;
        // } else {
        //     return arr.reverse();
        // }
        // *modern version
        const [type, dir] = value.split("-");
        return arr.sort((a, b) => (dir === "ASC" ? a[type] - b[type] : b[type] - a[type]));
    }

    // Сортировка для панельного фильтра
    function panelFilterSort (name, status) {
        if (name === "complex_name") {
            state.results.sort( (a, b) => {
                if (a[name] > b[name]) {
                    return -1;
                }
                if(a[name] < b[name]) {
                    return 1;
                }
                return 0
            });
        } else if (status === "ASC" && name !== "complex_name") {
            state.results.sort( (a, b) => {
                return a[name] - b[name]
            })
        } else if (status === "DSC" && name !== "complex_name") {
            state.results.sort( (a, b) => {
                return b[name] - a[name]
            })
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

    // Ф-я которая определяет в каком виде должны рендерится элементы
    function chooseRenderType(arr, filterType) {
        // Получения обьекта из LS
        const savedFilterRenderType = JSON.parse(localStorage.getItem("Render Type"));
        // Если этот обьект сущевствует
        savedFilterRenderType !== null ? filterType = savedFilterRenderType : filterType = "cards";

        if (filterType === "cards" || !filterType) {
            arr.forEach((item) => {
                view.renderCard(item, state.favourites.isFav(item.id));
            });
        } else {
            arr.forEach((item) => {
                view.renderPanel(item, state.favourites.isFav(item.id));
            });
        }

        document.querySelector(`input[value=${filterType}]`).checked = true;

    }

}
