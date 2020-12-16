import Axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'

import { Card, Button, Modal } from 'react-bootstrap'

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProducts: [],
            toLogin: false,
            modal: false,
            quantity: null
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:2000/products')
            .then((res) => {
                console.log(res.data)
                this.setState({ dataProducts: res.data })
            })
            .catch((err) => console.log(err))
    }

    render() {
        if(!this.props.username) return <Redirect to='/login'/>
        const card = this.state.dataProducts.map((item, index) => {
            return (
                <Card style={{ width: '18rem', marginBottom: '20px' }} key={index}>
                    <Card.Img variant="top" src={item.img} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            {item.description}
                        </Card.Text>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button variant="warning" as={Link} to={`/detail?id=${item.id}`} >Add to Cart</Button>
                        </div>
                    </Card.Body>
                </Card>

            )
        })

        return (
            <div style={{ padding: '30px' }}>
                <h1>Products</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-around", FlexDirection: 'column' }}>
                    {card}
                </div>

                <Modal show={this.state.modal} onHide={() => this.setState({ modal : false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>ERROR</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        please login first
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ modal : false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps)(Products)