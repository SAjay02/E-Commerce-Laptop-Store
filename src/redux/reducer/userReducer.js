const initialState = {
  id: '', // User ID
  name: '',
  cart: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    // ... other cases
    default:
      return state;
  }
};

export default userReducer;