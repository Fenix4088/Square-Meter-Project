import * as view from "./bidsView.js";
import Bids from "./bidsModel.js";

export default async function (state) {
    // Create an object for bids in state
    if (!state.bids) state.bids = new Bids();

    await state.bids.getBids();
    // Displaying orders
    view.renderBids(state.bids.bids);
}
