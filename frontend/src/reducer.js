export const intialState = {
    basket:[],
};

export const getBasketTotal = (Basket) => 
    Basket?.reduce((amount, item) => {
        const price = Number(item.price);
        if (isNaN(price)) {
            console.warn(`Invalid price: ${item.price}`);
            return amount;
        }
        return price + amount;
    }, 0);


const reducer = (state, action) => {
    console.log(action)
    switch(action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        default:
            return state;
    }
}
export default reducer;