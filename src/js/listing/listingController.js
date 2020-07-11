import * as view from "./listingView.js";

export default function (state) {
    console.log("Listing started");
    view.render();
    // Подписка на пользовательское событие
    state.emitter.subscribe("event:render-listing", () => {
        console.log("FUNCTION STARTEd");
        console.log(state.results);
    });
}
