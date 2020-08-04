import singleItem from "../singleItem/singleItemController.js"

export default function (state) {
    // Clearing the application container
    document.querySelector("#app").innerHTML = '';

    // Launching the singleItem component
    singleItem(state);

}
