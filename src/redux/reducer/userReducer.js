const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_TO_CART":
      // Assuming you have a 'cart' property in your user object
      const updatedUser = {
        ...state.user,
        cart: [...state.user.cart, action.payload],
      };
      return {
        ...state,
        user: updatedUser,
      };
    case "REMOVE_FROM_CART":
      // Implement logic to remove item from the user's cart
      // ...
      return {
        ...state,
        user: updatedUser,
      };
    // Other cases...
    default:
      return state;
  }
};

export default userReducer;
