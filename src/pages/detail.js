import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Image, Button, ButtonGroup,Modal, } from 'react-bootstrap'

class DetailProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [ ],
            image: '',
            stock: 0,
            quantity: 1,
            toCart: false,
            cartErr: false
        }
    }

    componentDidMount(){
        Axios.get(`http://localhost:2000/products${this.props.location.search}`)
            .then((res) => {
                this.setState({data: res.data[0] , image: res.data[0].img, stock: res.data[0].stock})
            })
            .catch((err) => console.log(err))
    }

    addToCart = () => {
        const {total, size, data, quantity} = this.state

        let cartData = {
            name: data.name,
            image: data.img,
            price: data.price,
            quantity: quantity,
            total: quantity * data.price
        }

        let cartTemp = this.props.cart
        cartTemp.push(cartData)

        Axios.patch(`http://localhost:2000/users/${this.props.id}`,{
            cart: cartTemp
        })
        .then((res) => {
            console.log(res.data)
            this.setState({toCart : true})
        })
        .catch((err) => console.log(err))
    
    }


    render(){
        if (this.state.toCart) return <Redirect to='/cart' />
        return(
            <div>
                <h1>Detail Product</h1>
                <div>
                    <Image src={this.state.image} rounded style={{ height: '50%' }} />
                    <div>
                        <h1>Name : {this.state.data.name}</h1>
                        <h1>Price : {this.state.data.price}</h1>
                        <h1>Stock : {this.state.data.stock}</h1>
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex' }}>
                        <Button
                            variant="secondary"
                            disabled={this.state.quantity<= 0 ? true : false}
                            onClick={() => this.setState({ quantity: this.state.quantity - 1 })}
                        > - </Button>
                        <h1>{this.state.quantity}</h1>
                        <Button
                            variant="secondary"
                            disabled={this.state.quantity>= this.state.stock ? true : false}
                            onClick={() => this.setState({ quantity: this.state.quantity + 1 })}
                        > + </Button>
                    </div>
                    <br></br>
                    <div>
                        <Button variant="warning" onClick={this.addToCart}>Add to Cart</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        cart: state.user.cart
    }
}

export default connect(mapStateToProps)(DetailProduct)