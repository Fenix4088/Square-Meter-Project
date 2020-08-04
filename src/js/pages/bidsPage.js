import bids from "./../bids/bidsController.js";
import renderPreloader from "../preloader/preloader.js";

export default function (state) {
    if (typeof state["bids"] === "undefined") {
        // Displaying the preloader if no response has been received from the server
        renderPreloader();
    }
    setTimeout(function () {
        // Emptying the app container
        document.querySelector("#app").innerHTML = "";
        // Launching the bids component
        bids(state);
    }, 3000);
}
