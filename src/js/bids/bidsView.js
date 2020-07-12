// Ф-я рендеринга контейнера
function renderContainer () {
    const markup = `
            <div id="bidsHolder" class="container p-0 mb-5">
                <div class="heading-1">Заявки</div>
            </div>

            <!-- panels-wrapper -->
            <div class="panels-wrapper">
                <div class="container p-0">
                    <!-- Bids will be here-->
                </div>
            </div>
    `;      

    document.querySelector('#app').insertAdjacentHTML("afterbegin", markup);
}

// Ф-я для рендеринга заявок
function renderBid (bid) {
    const markup = `
    <div class="panel panel--no-hover">
    <div class="bidid">${bid.id}</div>
        <div class="panel__bidname">${bid.name}</div>
        <div class="panel__bidphone">${bid.phone}</div>
    </div>
    `;


    document.querySelector('#bidsHolder').insertAdjacentHTML('beforeend', markup);
}

// Ф-я которая рендерит сначало контейнер, а потом будет рендерить все заявки
export function renderBids (bids) {
    renderContainer();
    bids.forEach( item => {
        renderBid(item);
    });
}