import FavouritesCards from "./favouritesCardsModel.js";
import * as view from "./favouritesCardsView.js"

export default async function (state) {
    // Получаем список обьектов которые находятся в избранном
    const favsList = state.favourites.favs;
    // Создаем запрос из id этих обьектов (http://jsproject.webcademy.ru/items?ids=1,3,5)

    const favouriteCards = new FavouritesCards(favsList);
    await favouriteCards.getFavs();

    // Отображаем контейнер и карточки
    view.renderPage(favouriteCards.cards);
}
