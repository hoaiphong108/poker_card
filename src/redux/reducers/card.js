let initialState = {
    deckCard: {},
    isReveal: false,
    countTurnPlay: 0
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_DECK_CARD":
            state.deckCard = payload
            return {...state };
        case "REVEAL_CARDS":
            state.isReveal = payload;
            return {...state };
        case "SHUFFLE_CARDS":
            state.deckCard = payload;
            return {...state }
        case "SET_SHUFFLE":
            state.deckCard.shuffled = payload;
            return {...state }
        case "TURN_GAME":
            state.countTurnPlay += 1
            return {...state }

        default:
            return state;
    }
};


export default reducer;