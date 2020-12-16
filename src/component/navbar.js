import React from 'react'

import {Link} from 'react-router-dom'
import { Navbar, Nav, Dropdown, Badge} from 'react-bootstrap'

import {connect} from 'react-redux'

import {logout} from '../action'

class Navigation extends React.Component {
    btnLogout = () => {
        this.props.logout()
        localStorage.removeItem('username')
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to='/'>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/products'>Home</Nav.Link>
                    </Nav>

                    <Link to='/cart'>
                    <i className="fas fa-shopping-cart" style={{color: 'red', fontSize: '20px'}}></i>
                    <Badge variant="secondary">{this.props.cart.length}</Badge>
                    </Link>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.props.username ? this.props.username : 'username'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.props.username 
                            ?
                            <>
                            <Dropdown.Item onClick={this.btnLogout} as={Link} to='/'>Logout</Dropdown.Item>
                            <Dropdown.Item >History</Dropdown.Item>
                            </>
                            :
                            <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        username: state.user.username,
        cart: state.user.cart
    }
}

export default connect(mapStateToProps, { logout })(Navigation)