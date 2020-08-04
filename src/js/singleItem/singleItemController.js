import SingleItem from "./singleItemModel.js";
import * as view from "./singleItemView.js";

export default async function (state) {
    // Create and write the SingleItem class in the application state
    state.singleItem = new SingleItem(state.routeParams);
    await state.singleItem.getItem();
    // Rendering markup for a separate object
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    // * Wiretapping of events
    const orderBtn = document.querySelector(".button-order");
    const modalCloseBtn = document.querySelector(".modal__close");
    const modalWrapper = document.querySelector(".modal__form");
    const favouriteBtn = document.querySelector("#addToFavouriteBtn");

    // Opening a modal window
    orderBtn.addEventListener("click", () => {
        view.showModal();
    });

    // Hiding a modal window - clicking on the button
    modalCloseBtn.addEventListener("click", () => {
        view.hideModal();
    });

    // Hide modal window - click overlay
    modalWrapper.addEventListener("click", (e) => {
        if (e.target.closest(".modal")) {
            return null;
        } else {
            view.hideModal();
        }
    });

    // Form submission
    modalWrapper.addEventListener("submit", async function (e) {
        e.preventDefault();
        // Collecting data from a modal window form
        const formData = view.getInput();
        // Sending data to the server
        /*
        await state.singleItem.sendData(formData);
        const response = state.singleItem.response;
        */
        const response = await state.singleItem.sendData(formData);
        // Variable for the form submission status
        let responseStatus;
        // Checking which response came from the server, whether the request was created or not
        if (response.message === "Bid Created") {
            responseStatus = true;
            view.hideModal();
            view.clearInput();
            view.showWarning(response, responseStatus);
        } else if (response.message === "Bid Not Created") {
            responseStatus = false;
            view.showWarning(formData, responseStatus);
        }
        // Displaying the application status icon
        view.showIcon(responseStatus);
    });

    // Click on the add to favorites button
    favouriteBtn.addEventListener("click", () => {
        // Add the id of the current object to the array in state
        state.favourites.toggleFav(state.singleItem.id);
        // Adding an active class for a button
        view.toggleFavouriteBtn(state.favourites.isFav(state.singleItem.id))
    });
}
