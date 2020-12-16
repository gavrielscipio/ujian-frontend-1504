import Axios from 'axios'
import React from 'react'

import { InputGroup, FormControl, Button } from 'react-bootstrap'

import{login} from '../action'

import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userValidErr: [false, ''],
            emailValidErr: [false, ''],
            passValidErr: [false, ''],
            registErr: [false, ''],
            doneRegist: false
        }
    }

    emailValid = (event) =>{
        let email = event.target.value
        let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(email)) return this.setState({ emailValidErr: [true, 'email not valid'] })

        this.setState({ emailValidErr: [false, ''] })
    }

    passValid = (event) => {
        let password = event.target.value
        let numb = /[0-9]/
        // let upper = /[A-Z]/

        if (!numb.test(password) || password.length < 6) return this.setState({ passValidErr: [true, '*Must include symbol and min. 6 char'] })

        this.setState({ passValidErr: [false, ''] })
    }

    btnLogin = () => {
        let username = this.refs.username.value
        let email = this.refs.email.value
        let password = this.refs.password.value
     
        Axios.post('http://localhost:2000/users',{
            username: username,
            email: email,
            password: password,
            cart: [ ]
        })
            .then((res) =>{
                console.log(res.data)
                
                Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)
                .then((res) => {
                    console.log(res)

                    this.props.login(res.data[0])
                    localStorage.username = username
                })
                .catch((err) => (err))
            })
            .catch((err) => console.log(err))
    }

    render() {
        if(this.props.username) return <Redirect to='/products' />
        return (
            <div style={styles.container}>
                <div style={styles.center}>
                    <div>
                        <h1>LOGIN</h1>
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <i className="fas fa-user"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type='text'
                            ref='username'
                        />
                    </InputGroup>
                    
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <i className="fas fa-user"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="email"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type='text'
                            ref='email'
                        />
                    </InputGroup>
                    {this.state.emailValidErr[1]}
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Password"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type='password'
                            ref='password'
                        />
                    </InputGroup>
                    {this.state.passValidErr[1]}
                    <Button onClick={this.btnLogin} variant="outline-warning">
                        Come In
                </Button>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '94vh'
    },
    center: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '100px',
        padding: '0 30px',
        width: '500px',
        height: '25vh',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        borderRadius: '5px'
    }
}

const mapStateToProps = (state) => {
    return{
        username : state.user.username
    }
}

export default connect(mapStateToProps, {login})(Login)