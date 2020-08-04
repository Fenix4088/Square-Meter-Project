import FavouritesCards from "./favouritesCardsModel.js";
import * as view from "./favouritesCardsView.js";

export default async function (state) {
    // We get a list of objects that are in the favorites
    const favsList = state.favourites.favs;
    // Create a request from the id of these objects (http://jsproject.webcademy.ru/items?ids=1,3,5)

    const favouriteCards = new FavouritesCards(favsList);
    await favouriteCards.getFavs();

    if (favouriteCards.cards !== undefined) {
        // Displaying the container and cards
        view.renderPage(favouriteCards.cards);

        // We start listening to a click on the icon "Add to favorites"
        addToFavsListener();
    } else {
        view.showNoFavouritesMessage();
    }

    // Function for working icons "Add to favorites"
    function addToFavsListener() {
        Array.from(document.getElementsByClassName("card__like")).forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                // Find the ID of the object that was clicked
                const currentId = e.target.closest(".card").dataset.id;
                // Add / remove item from favorites
                state.favourites.toggleFav(currentId);

                // Turn on / off the icon with favorites
                view.toggleFavouriteIcon(e.target.closest(".card__like"), state.favourites.isFav(currentId));
            });
        });
    }
}
