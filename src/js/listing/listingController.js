export default function (state) {
    console.log("Listing started");

    // Подписка на пользовательское событие
    state.emitter.subscribe("event:render-listing", () => {
        console.log("FUNCTION STARTEd");
        console.log(state.results);
    });
}
