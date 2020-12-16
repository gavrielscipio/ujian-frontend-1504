import { Button } from 'react-bootstrap'
import React from 'react'
// import {Link} from 'react-router-dom'

class Home extends React.Component{
    render(){
        return(
            <div style={styles.center}>
                    <h1>WELCOME TO OUR SHOES SHOP</h1>
            </div>
        )
    }
}

const styles = {
    center: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '100px',
        padding: '0 30px',
        width: '500px',
        height: '25vh',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        borderRadius: '5px',
        marginLeft: '700px'
    }
}
export default Home