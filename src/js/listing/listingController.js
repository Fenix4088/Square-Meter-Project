import * as view from "./listingView.js";

export default function (state) {
    // Rendering a container for cards at startup
    view.render();
    // Choice of how the cards will be rendered
    chooseRenderType(state.results, state.renderType);
    // We start listening to a click on the "Add to favorites" icon
    addToFavsListener();

    // Subscribing to a custom event
    state.emitter.subscribe("event:render-listing", () => {
        // Cleaning the card container
        view.clearListingContainer();
        // Choice of how the cards will be rendered
        chooseRenderType(state.results, state.renderType);
        // We start listening to a click on the "Add to favorites" icon
        addToFavsListener();
    });

    // Event Click on objects display icons (radio btns)
    document.querySelector(".view-options__type").addEventListener("click", (e) => {
        if (e.target.getAttribute("name") === "displayType") {
            // Panel filter display
            view.showPanelFilter(e.target);
            // Write the value of input radio to state
            state.renderType = e.target.value;
            // Writing to LS
            localStorage.setItem("Render Type", JSON.stringify(state.renderType));
            // Cleaning the card container
            view.clearListingContainer();
            if (e.target.value === "cards") {
                // Обход массива с результатами, рендер карточек
                state.renderType = "cards";
                state.results.forEach((item) => {
                    view.renderCard(item, state.favourites.isFav(item.id));
                });
            } else {
                state.renderType = "list";
                // Bypassing the array with results, rendering cards
                state.results.forEach((item) => {
                    view.renderPanel(item, state.favourites.isFav(item.id));
                });
            }

            // Handling a click on a heart icon
            addToFavsListener();
        }
    });

    // Click on option to sort by price and area
    document.querySelector("#sort-cards-by").addEventListener("change", (e) => {
        console.log(e.target.children);
        Array.from(e.target.children).forEach((option) => {
            if (option.selected) {
                // Sort the array based on the selected option
                const sortedArr = sortElements(option.value, state.results);

                sortedArr.forEach((item) => {
                    // Cleaning the catainer with cards
                    view.clearListingContainer();
                    // Choice of how the cards will be rendered
                    chooseRenderType(state.results, state.renderType);
                    // We start listening to a click on the "Add to favorites" icon
                    addToFavsListener();
                });
            }
        });
    });

    //Click on a panel filter element
    document.querySelector(".panels-filter").addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-filter")) {
            // Determine the type (ascending / descending) and the name of the sorted object
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

    // Element sorting function
    function sortElements(value, arr) {
        // *modern version
        const [type, dir] = value.split("-");
        return arr.sort((a, b) => (dir === "ASC" ? a[type] - b[type] : b[type] - a[type]));
    }

    // Sorting for panel filter
    function panelFilterSort(name, status) {
        if (name === "complex_name") {
            state.results.sort((a, b) => {
                if (a[name] > b[name]) {
                    return -1;
                }
                if (a[name] < b[name]) {
                    return 1;
                }
                return 0;
            });
        } else if (status === "ASC" && name !== "complex_name") {
            state.results.sort((a, b) => {
                return a[name] - b[name];
            });
        } else if (status === "DSC" && name !== "complex_name") {
            state.results.sort((a, b) => {
                return b[name] - a[name];
            });
        }
    }

    // Func for working icons "Add to favorites"
    function addToFavsListener() {
        Array.from(document.getElementsByClassName("card__like")).forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                // Find the ID of the object that was clicked
                let currentId;
                if (e.target.closest(".card")) {
                    currentId = e.target.closest(".card").dataset.id;
                } else if (e.target.closest(".panel")) {
                    currentId = e.target.closest(".panel").dataset.id;
                }
                // Add / remove item from favorites
                state.favourites.toggleFav(currentId);

                // Turn on / off the icon with favorites
                view.toggleFavouriteIcon(e.target.closest(".card__like"), state.favourites.isFav(currentId));
            });
        });
    }

    // Func which determines in what form the elements should be rendered
    function chooseRenderType(arr, filterType) {
        // Getting an object from LS
        const savedFilterRenderType = state.renderType;
        // If this object exists
        savedFilterRenderType !== null ? (filterType = savedFilterRenderType) : (filterType = "cards");

        if (filterType === "cards" || !filterType) {
            arr.forEach((item) => {
                view.renderCard(item, state.favourites.isFav(item.id));
            });
        } else {
            document.querySelector(".panels-filter").style.display = "flex";
            arr.forEach((item) => {
                view.renderPanel(item, state.favourites.isFav(item.id));
            });
        }

        document.querySelector(`input[value=${filterType}]`).checked = true;
    }
}
