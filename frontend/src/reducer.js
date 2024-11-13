export const intialState = {
  basket: [],
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
  switch (action.type) {
    case 'CLEAR_BASKET':
      return {
        ...state,
        basket: [] // Clears the basket
      };

    case "ADD_TO_BASKET":
      // Check if item already exists in the basket
      const existingItemIndex = state.basket.findIndex(item => item.id === action.item.id);

      if (existingItemIndex >= 0) {
        // If item exists, increase the quantity
        const newBasket = [...state.basket];
        newBasket[existingItemIndex].quantity += 1;
        return {
          ...state,
          basket: newBasket,
        };
      } else {
        // If item doesn't exist, add a new item with quantity 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_BASKET":
      // Remove item completely by matching the ID
      return {
        ...state,
        basket: state.basket.filter(item => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      // Update the quantity of a specific item by ID
      const updatedBasket = state.basket.map(item => {
        if (item.id === action.payload.itemId) {
          const updatedItem = {
            ...item,
            quantity: item.quantity + action.payload.quantity
          };
          return updatedItem;
        }
        return item;
      }).filter(item => item.quantity > 0);  // Ensure item is removed if quantity reaches 0
      return {
        ...state,
        basket: updatedBasket,
      };

    default:
      return state;
  }
}
export default reducer;