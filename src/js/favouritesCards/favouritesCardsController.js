import FavouritesCards from "./favouritesCardsModel.js";
import * as view from "./favouritesCardsView.js";

export default async function (state) {
    // Получаем список обьектов которые находятся в избранном
    const favsList = state.favourites.favs;
    // Создаем запрос из id этих обьектов (http://jsproject.webcademy.ru/items?ids=1,3,5)

    const favouriteCards = new FavouritesCards(favsList);
    await favouriteCards.getFavs();

    if (favouriteCards.cards !== undefined) {
        // Отображаем контейнер и карточки
        view.renderPage(favouriteCards.cards);

        // Запускаем прослушку клика на икони "Добавить в избранное"
        addToFavsListener();
    } else {
        view.showNoFavouritesMessage();
    }

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
