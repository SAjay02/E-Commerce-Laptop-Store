
const cart=[];
const handleCart = (state = cart, action)=>
{
    const product = action.payload;
    switch(action.type)
    {
        case "ADDITEM":
            //add the item 
            const exist=state.find((x)=>x.id===product.id);
            if(exist)
            {
                const updatedState = state.map((x) =>x.id === product.id ? { ...x, qty: x.qty + 1 }:x);
                // toast.success(`${product.name} added to the cart!`);
                return updatedState;
                // return state.map((x)=>x.id===product.id?{...x,qty:x.qty+1}:x)
            }
            else
            {
                const product =action.payload;
                return[
                    ...state,
                    {
                        ...product,
                        qty:1,
                    }
                ]
            }
            break;

            //delete the item
            case "DELITEM":
                const existingItem = state.find((x) => x.id === product.id);
      if (existingItem.qty === 1) {
        // If quantity is 1, remove the item from the cart

        return state.filter((x) => x.id !== existingItem.id);
      } else {
        // If quantity is greater than 1, decrease the quantity
        return state.map((x) => (x.id === existingItem.id ? { ...x, qty: x.qty - 1 } : x));
      }

      //for remove to delete the item
            case "REMOVEITEM":
                    return state.filter((x) => x.id !== product.id);
          default:
            return state;
            
    }
}
export default handleCart;

// const initialState = [];

// const handleCart = (state = initialState, action) => {
//     switch (action.type) {
//       case 'ADD_TO_CART':
//         console.log('Reducer: Adding to cart:', action.payload);
//         return {
//           ...state,
//           cartItems: [...state.cartItems, action.payload],
//         };
//       // other cases...
//       default:
//         return state;
//     }
//   };



// export default handleCart;