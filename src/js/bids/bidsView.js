// Ф-я рендеринга контейнера
export function renderContainer () {
    const markup = `
            <div class="container p-0 mb-5">
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