function renderContainer() {
    const markup = `
    <div class="container p-0 mb-5">
        <div class="heading-1">Избранное</div>
    </div>
    <div class="cards-wrapper">
        <div class="container p-0">
            <div id="cardHolder" class="row">
                <!-- Place for Content-->
            </div>
        </div>
    `;

    document.querySelector("#app").insertAdjacentHTML("afterbegin", markup);
}

function renderCard(object) {
    const cardHolder = document.querySelector("#cardHolder");
    const markup = `
    <article class="col-md-4">
        <!-- card -->
        <a href="#/item/${object.id}" class="card" data-id="${object.id}">
            <div class="card__header">
                <div class="card__title">
                    ЖК ${object.complex_name}
                </div>
                <div class="card__like card__like--active">
                    <i class="fas fa-heart"></i>
                </div>
            </div>
            <div class="card__img">
                <img src=${object.image} alt="План квартиры" />
            </div>
            <div class="card__desc">
                <div class="card__price">
                    <div class="card__price-total">
                    ${object.price_total} ₽
                    </div>
                    <div class="card__price-per-meter">
                        ${object.price_sq_m} ₽/м2
                    </div>
                </div>

                <!-- card__params params -->
                <div class="card__params params">
                    <div class="params__item">
                        <div class="params__definition">
                            Rooms
                        </div>
                        <div class="params__value">${object.rooms}</div>
                    </div>
                    <div class="params__item">
                        <div class="params__definition">
                            Space
                        </div>
                        <div class="params__value">${object.square}</div>
                    </div>
                </div>
                <!-- //card__params params -->
            </div>
            <div class="card__footer">
                <div class="card__art">${object.scu}</div>
                <div class="card__floor">Floor ${object.floor} of ${object.floors_total}</div>
            </div>
        </a>
        <!-- // card -->
    </article>`;

    cardHolder.insertAdjacentHTML("beforeend", markup);
}

export function renderPage(cards) {
    renderContainer();
    cards.forEach((card) => {
        renderCard(card);
    });
}

// Function to activate the icon with a heart
export function toggleFavouriteIcon(elementIcon, isFaved) {
    if (isFaved) {
        elementIcon.classList.add("card__like--active");
    } else {
        elementIcon.classList.remove("card__like--active");
    }
}

// Function display about lack of favorites
export function showNoFavouritesMessage() {
    const markup = `                
    <div class="container">
    <div class="d-flex flex-column justify-content-center align-items-center">
        <img class="pb-20" src="./img/icons/heartBroken.svg" alt="" />
        <div class="alert alert-dark">You have no favourites yet :-(</div>
    </div>
</div>`;

    document.querySelector("#app").insertAdjacentHTML("beforeend", markup);
}
