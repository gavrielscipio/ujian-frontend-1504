import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'

import { login } from '../action'

import { Redirect } from 'react-router-dom'

import { Table, Button, Image, Form, Modal } from 'react-bootstrap'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: null,
            newQuantity: 0,
            reqPayment: false,
            reqPass: false,
            errPass: false,
            errPayment: false,
            cartEmpty: false,
            toHistory: false
        }
    }

    renderTHead = () => {
        return (
            <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        )
    }

    renderTBody = () => {
        return (
            <tbody>
                {this.props.cart.map((item, index) => {
                    if (this.state.selectedIndex === index) {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Image style={{ width: 150, height: 150 }} src={item.image} rounded />
                                </td>
                                <td>{item.name}</td>
                                <td >
                                    <div style={{ display: 'flex' }}>
                                        <Button variant='secondary' onClick={this.handleMinus}> ➖ </Button>
                                        <Form.Control value={this.state.newQuantity} onChange={(e) => this.changeQty(e)} />
                                        <Button variant='secondary' disabled={this.state.newQuantity >= item.stock ? true : false} onClick={() => this.setState({ newQuantity: parseInt(this.state.newQuantity) + 1 })}> ➕ </Button>
                                    </div>
                                </td>
                                <td>{item.price}</td>
                                <td>IDR {(this.state.newQuantity * item.price).toLocaleString()}</td>
                                <td>
                                    <Button variant="success" onClick={() => this.handleDone(index)}>Done</Button>
                                    <Button variant="danger" onClick={() => this.setState({ selectedIndex: null })}>Cancel</Button>
                                </td>
                            </tr>
                        )
                    }

                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <Image style={{ width: 150, height: 150 }} src={item.image} rounded />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>IDR {item.price.toLocaleString()}</td>
                            <td>IDR {item.total.toLocaleString()}</td>
                            <td>
                                <Button variant="info" onClick={() => this.setState({ selectedIndex: index, newQuantity: item.quantity })}>Edit</Button>
                                <Button variant="danger" onClick={() => this.handleDelete(index)}>Delete</Button>
                            </td>
                        </tr>
                    )

                })}
            </tbody>
        )
    }

    handleMinus = () => {
        if (this.state.newQuantity > 0) return this.setState({ newQuantity: this.state.newQuantity - 1 })
    }

    render(){
        if(!this.props.username) return <Redirect to='/login' />
        return(
            <div>
                <div>
                    <h1>User Cart</h1>
                    <div>
                        <Button variant='success'>Checkout</Button>
                    </div>
                </div>
                <Table>
                    <thead>
                        {this.renderTHead()}
                    </thead>  
                    {this.renderTBody()}
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.user.cart,
        id: state.user.id,
        pass: state.user.password,
        username: state.user.username
    }
}

export default connect(mapStateToProps, { login })(Cart)