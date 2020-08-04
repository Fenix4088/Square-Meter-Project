import * as view from "./filterView.js";
import Filter from "./filterModel.js";

export default async function (state) {
    // Create an object based on the Filter class, if it does not already exist
    if (!state.filter) state.filter = new Filter();
    // Get parameters from the server
    await state.filter.getParams();
    // Displaying the filter form on initialization
    view.render(state.filter.params);
    // A query string is created, provided that LS contains data on the filter
    if (view.setInputs()) {
        // We write the generated query string to the state object
        state.filter.query = view.getInput(state);
    }
    // Making a request to the server
    await state.filter.getResults();
    // We save the received objects to the general state
    state.results = state.filter.result;

    // Updating the text on the button
    view.changeBtnText(state.filter.result.length);

    // Listening for form events
    const form = document.querySelector("#filter-form");
    // Shape change
    form.addEventListener("change", async function (e) {
        e.preventDefault();
        // We write the generated query string to the state object
        state.filter.query = view.getInput(state);
        // Request to the server for the result
        await state.filter.getResults();
        // We save the received objects to the general state
        state.results = state.filter.result;
        // Updating the text on the button
        view.changeBtnText(state.filter.result.length);
    });

    // Reset form
    form.addEventListener("reset", async function () {
        localStorage.removeItem('Filter Data');
        state.filter.query = "";
        // Request to the server for the result
        await state.filter.getResults();
        // The updated data on the filter is written to state.result
        state.results = state.filter.result;
        // Updating the text on the button
        view.changeBtnText(state.filter.result.length);
    });

    // Submit forms
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        // on submit create custom event
        state.emitter.emit("event:render-listing", {});
    });
}
