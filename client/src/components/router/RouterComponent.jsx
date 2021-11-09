import React, { Fragment } from 'react'
import Navbar from '../navbar/Navbar'
import {Route} from 'react-router-dom'
import Login from '../auth/signin/Login'
import Home from '../home/Home'
import ProductsContainer from '../container/Products/ProductsContainer'
import CurrentOrderContainer from '../container/currentOrder/CurrentOrderContainer'
import ContainerItemDetail from '../container/itemDetail/ContainerItemDetail'

const RouterComponent = ({location}) => {
    return(
        <Fragment>
            <Navbar/>
            <Route exact path='/signin' component={Login} location={location}/>
            <Route exact path='/home' component={Home} location={location}/>
            <Route exact path='/category/:id/products' component={ProductsContainer} location={location}/>
            <Route exact path='/order/detail' component={CurrentOrderContainer} location={location} />
            <Route exact path='/order/item/:id/detail' component={ContainerItemDetail} location={location} />
        </Fragment>
    )
}

export default RouterComponent