import * as view from "./bidsView.js";
import Bids from "./bidsModel.js";

export default async function (state) {
    // Создаем обьект для bids в state
    if (!state.bids) state.bids = new Bids();

    await state.bids.getBids();
    // Отображение заявок
    view.renderBids(state.bids.bids)
    
}
