// Ф-я для рендеринга контейнера для карточек
export function render() {
    const markup = `
      
        <div class="cards-wrapper">
            <div class="container p-0">
                <div id="listingContainer" class="row">
                
                </div>
            </div>
        </div>          
                `;

    document.querySelector("#app").insertAdjacentHTML("beforeend", markup);
}

// Ф-я рендеринга карточки(плитка)
export function renderCard(object, isFaved) {
    const listingContainer = document.querySelector("#listingContainer");
    const markup = `
    
    <article class="col-md-4">
        <!-- card -->
        <a href="#/item/${object.id}" class="card" data-id="${object.id}">
            <div class="card__header">
                <div class="card__title">
                    ЖК ${object.complex_name}
                </div>
                <div 
                class="
                card__like
                ${isFaved ? "card__like--active" : ""}
                "
                >
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

    listingContainer.insertAdjacentHTML("beforeend", markup);
}

// Отображение панельного фильтра
export function showPanelFilter (target) {
    const panelFilter = document.querySelector(".panels-filter")
    if (target.value === "list" && target.checked) {
        panelFilter.style.display = "flex";
    } else {
        panelFilter.style.display = "none";
    }
}
// Ф-я рендеринга обьектов в виде полосок
export function renderPanel(object, isFaved) {
    const listingContainer = document.querySelector("#listingContainer");
    const markup = `
    <a href="#/item/${object.id}" data-id="${object.id}" class="panel" style="width: 100%;">
            <div class="panel__artikul">${object.scu}</div>
            <div class="panel__name">
                <div>ЖК ${object.complex_name}</div>
            </div>
            <div class="panel__block">${object.building}</div>
            <div class="panel__floor">${object.floor}</div>
            <div class="panel__rooms">${object.rooms}</div>
            <div class="panel__sq">${object.square} м2</div>
            <div class="panel__price-per-m">${object.price_sq_m} ₽</div>
            <div class="panel__price">${object.price_total} ₽</div>
            <div class="panel__favourite">
                <div class="
                card__like
                ${isFaved ? "card__like--active" : ""}

                ">
                    <i class="fas fa-heart"></i>
                </div>
            </div>
        </a>
    `;
    listingContainer.insertAdjacentHTML("beforeend", markup);
}

// Ф-я очистки разметки
export function clearListingContainer() {
    const listingContainer = document.querySelector("#listingContainer");
    listingContainer.innerHTML = "";
}

// Ф-я для активизации иконки с сердечком
export function toggleFavouriteIcon(elementIcon, isFaved) {
    if (isFaved) {
        elementIcon.classList.add("card__like--active");
    } else {
        elementIcon.classList.remove("card__like--active");
    }
}
