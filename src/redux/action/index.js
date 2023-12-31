//add item to cart
export const addCart=(product)=>
{
    return{
        type:"ADDITEM",
        payload:product
    }
}

//delete item from cart
export const delCart=(product)=>
{
    return{
        type:"DELITEM",
        payload:product
    }
}

//delte item using remove button
export const remvoCart=(product)=>
{
    return{
        type:"REMOVEITEM",
        payload:product
    }
}



  