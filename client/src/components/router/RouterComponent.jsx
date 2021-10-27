import React, { Fragment } from 'react'
import Navbar from '../navbar/Navbar'
import {Route} from 'react-router-dom'
import Login from '../auth/signin/Login'
import Home from '../home/Home'
import ProductsContainer from '../container/Products/ProductsContainer'
import ContainerCurrentOrder from '../container/currentOrder/ContainerCurrentOrder'
import ContainerItemDetail from '../container/itemDetail/ContainerItemDetail'

const RouterComponent = ({location}) => {
    return(
        <Fragment>
            <Navbar/>
            <Route exact path='/signin' component={Login} location={location}/>
            <Route exact path='/home' component={Home} location={location}/>
            <Route exact path='/category/:id/products' component={ProductsContainer} location={location}/>
            <Route exact path='/order/detail' component={ContainerCurrentOrder} location={location} />
            <Route exact path='/order/item/:id/detail' component={ContainerItemDetail} location={location} />
        </Fragment>
    )
}

export default RouterComponent