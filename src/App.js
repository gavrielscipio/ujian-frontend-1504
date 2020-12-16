import React from 'react'
import Axios from 'axios'
import { Route, Switch } from 'react-router-dom'

import Navigation from './component/navbar'

import Login from './pages/loginpage'
import Home from './pages/home'
import Cart from './pages/cart'
import DetailProduct from './pages/detail'

import Products from './component/products'

import { login } from './action'

import { connect } from 'react-redux'

class App extends React.Component {

    componentDidMount(){
        Axios.get(`http://localhost:2000/users?username=${localStorage.username}`)
            .then((res) => {
                console.log(res.data)
                this.props.login(res.data[0])
            })
            .catch((err) => console.log(err))
    }

    render(){
        return(
            <div>
                <Navigation/>

                <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/login' component={Login}/>
                <Route path='/products' component={Products}/>
                <Route path='/cart' component={Cart}/>
                <Route path='/detail' component={DetailProduct}/>

                </Switch>
               
            </div>
        )
    }
}

export default connect(null, { login })(App)