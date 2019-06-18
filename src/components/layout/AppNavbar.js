import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';


class AppNavbar extends Component {

    state = {
        isAuthenticated:false
    }

    static getDerivedStateFromProps(props,state) {
        const {auth} = props;

        if (auth.uid) {
            return {isAuthenticated:true}
        } else {
            return {isAuthenticated:false}
        }
    }

    LogoutClick = (e) => {
        e.preventDefault();
        const {firebase} = this.props;
        firebase.logout();
    }

    render() {
        const {isAuthenticated} = this.state;
        const {auth} = this.props;
        const {allowRegistration} = this.props.settings;
        return (
           <nav className='navbar navbar-expand-md navbar-dark bg-info mb-4 '>
            <div className="container">
                <Link className='navbar-brand' to='/'>
                    ReactClient
                </Link>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarMain'>
                    <span className='navbar-toggler-icon' />
                </button>
                <div className='collapse navbar-collapse' id='navbarMain'>
                    <ul className='navbar-nav mr-auto'>
                    {isAuthenticated ? (<li className='nav-item' >
                            <Link className='nav-link' to='/'>
                                Dashboard
                            </Link>
                        </li>) :null}
                    </ul>
                    {isAuthenticated ? (
                        <ul className='navbar-nav ml-auto'>
                            <li className='nav-item'>
                                <a href="#!" className='nav-link'>
                                    {auth.email}
                                </a>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/settings'>
                                    Settings
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <a href="#!" className='nav-link' onClick={this.LogoutClick}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    ) :null}
                    {allowRegistration && !isAuthenticated ? (
                        <ul className='navbar-nav ml-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/login'>
                                    Login
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/register'>
                                    Register
                                </Link>
                            </li>
                        </ul>
                    ):null}
                </div>
            </div>
           </nav>
        )
    }
}


AppNavbar.propTypes = {
    firebase:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    settings:PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state,props) => ({
        auth:state.firebase.auth,
        settings:state.settings
    }))
)(AppNavbar);