import { CLEARPRODUCTS, GETPRODUCTSBYCATEGORYID, REFRESHINFOINITIAL, SETCATEGORIES, SETLOADINGCATEGORIES } from "../actions/types"

const initialState={
    categories: [],
    category: {},
    products: [],
    pex: [],
    localInfo: [],
    loadingCategories: false,
    loadingProducts: false
}

export const storeReducer = (state=initialState, action) =>{
    switch(action.type){
        case SETCATEGORIES: 
         return {
             ...state,
             categories: action.payload,
             loadingCategories: true
         }

         case REFRESHINFOINITIAL:
             return {
                 ...state,
                 categories: action.payload.categories,
                 localInfo: action.payload.localInfo
             }
        case GETPRODUCTSBYCATEGORYID:
            return {
                ...state,
                loadingProducts: true,
                products: action.payload.products,
                category: action.payload.category,
                pex: action.payload.pex
            }

        case SETLOADINGCATEGORIES:
            return {
                ...state,
                loadingCategories: false,
                categories: []
            }
        
        case CLEARPRODUCTS:
            return {
                ...state,
                products: [],
                loadingProducts: false
            }

         default: {
             return state
         }
    }
}