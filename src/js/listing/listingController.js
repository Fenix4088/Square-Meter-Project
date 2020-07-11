export default function () {
    console.log('Listing started');

    // Подписка на пользовательское событие
    state.emitter.subscribe('event:render-listing', () => {
        console.log('FUNCTION STARTEd');
    });

}