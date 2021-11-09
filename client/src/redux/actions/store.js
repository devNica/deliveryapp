import { api } from "../../service/api"
import { GETPRODUCTSBYCATEGORYID, REFRESHINFOINITIAL, CLEARPRODUCTS, GETPRODEXBYCATEGORYID, CLEARPRODEX } from "./types"


export const clearProductsFromRedux = () => dispatch => {
    dispatch({
        type: CLEARPRODUCTS
    })
}

export const refreshInfoInitialFromRedux = () => async (dispatch, getState) => {
    try {
        const {meta, message} = await api.store.info()
        if(meta.service) {
            dispatch({
                type: REFRESHINFOINITIAL,
                payload: {
                    categories: meta.categories,
                    localInfo: meta.localInfo
                }
            })
        } else { console.log(message) }
    } catch (error) {
        console.log(error)
    }
}

export const getProductsByCatIdFromRedux = id => async (dispatch, getState) => {
    try {
        const {meta, message} = await api.store.productsByCategoryId(id)
        if(meta.service) {
            dispatch({
                type: GETPRODUCTSBYCATEGORYID,
                payload: {
                    category: meta.category[0],
                    products: meta.products,
                    pex: meta.pex
                }
            })
        } else { console.log(message) }
    } catch (error) {
        console.log(error)
    }
}

export const getProductExtraByCatIdFromRedux = id => async (dispatch) => {
    try {
        const {meta, message} = await api.store.prodexByCategoryId(id)
        if(meta.service) {
            dispatch({
                type: GETPRODEXBYCATEGORYID,
                payload: {
                    pex: meta.pex
                }
            })
        } else { console.log(message) }
    } catch (error) {
        console.log(error)
    }
}

export const clearProductExtraFromRedux = () => (dispatch) => {
    dispatch({
        type: CLEARPRODEX
    })
}

