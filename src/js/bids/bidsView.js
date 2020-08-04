// Function rendering the container
function renderContainer () {
    const markup = `
            <div id="bidsHolder" class="container p-0 mb-5">
                <div class="heading-1 mb-20">Заявки</div>
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

// Function for rendering applications
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

// Function which first renders the container, and then will render all applications
export function renderBids (bids) {
    renderContainer();
    bids.forEach( item => {
        renderBid(item);
    });
}