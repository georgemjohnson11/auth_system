import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';
import axios from 'axios'

const Google = ({ googleAuthenticate }) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        if (state && code) {
            googleAuthenticate(state, code);
        }
    }, [location]);

    return (
        <div className='container'>
            <div className='jumbotron mt-5'>
                <h1 className='display-4'>Welcome to Auth System!</h1>
                <p className='lead'>This is the start of something</p>
                <hr className='my-4' />
                <p>Click the Log In button</p>
                <Link className='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
            </div>
        </div>
    );
};

export const continueWithGoogle = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

        window.location.replace(res.data.authorization_url);
    } catch (err) {

    }
};

export default connect(null, { googleAuthenticate, continueWithGoogle })(Google);
