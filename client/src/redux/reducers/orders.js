import { AGREGATEPRODUCTSHOPPINGCART, REMOVEITEMSHOPPINGCART, REMOVEPRODUCTSHOPPINGCART, SETSHIPPINGCOST } from "../actions/types"

const initialState = {
    ordersHistory: [],
    currentOrder: [],
    currentItems: 0,
    currentAmount: 0, 
    shippingCost: 0,
    statusOrder: ''
}

export const ordersReducer = (state=initialState, action) => {
    switch(action.type){

        case SETSHIPPINGCOST: 
         return {
             ...state,
             shippingCost: action.payload
         }

        case REMOVEITEMSHOPPINGCART:
        case REMOVEPRODUCTSHOPPINGCART:
        case AGREGATEPRODUCTSHOPPINGCART:
            return {
                ...state,
                currentOrder: action.payload.currentOrder,
                currentItems: action.payload.currentItems,
                currentAmount: action.payload.currentAmount
            }

         default:
             return state
    }
}