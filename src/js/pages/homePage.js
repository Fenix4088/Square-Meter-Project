import filter from "./../filter/filterController.js";
import listing from "./../listing/listingController.js";
import renderPreloader from "../preloader/preloader.js";

export default async function (state) {

    if (state.results.length === 0) {
        // Displaying the preloader if no response has been received from the server
        renderPreloader();
    }

    setTimeout(async function () {
        document.querySelector("#app").innerHTML = "";

        // Running a filter form
        await filter(state);
        // Startup listega (listingController)
        listing(state);

    }, 3000);
}
