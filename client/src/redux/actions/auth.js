import { LOGINSUCCESS,AUTHFAILED, LOADUSER, LOGOUT, SETCATEGORIES, SETLOADINGCATEGORIES } from './types'
import { api } from '../../service/api'


export const loadUserFromRedux = () => (dispatch, getState) => {
    const { token } = getState().auth
    if(token) {
        dispatch({
            type: LOADUSER
        })
    } else {
        dispatch({
            type: AUTHFAILED
        })
    }
}

export const  loginFromRedux = credentials => async dispatch => {
    try {
        const {meta, message} = await api.auth.signin(credentials)
        
        if(meta.service) {
            dispatch({
                type: LOGINSUCCESS,
                payload: {
                    token: meta.token,
                    user: meta.user,
                    addresses: meta.addresses
                }
            })

            dispatch({
                type: SETCATEGORIES,
                payload: meta.categories
            })
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error)
    }
    
}

export const logoutFromRedux = () => dispatch =>{
    dispatch({
        type: LOGOUT
    })

    dispatch({
        type: SETLOADINGCATEGORIES
    })
}