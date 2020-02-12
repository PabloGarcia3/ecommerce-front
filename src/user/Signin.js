import React, { useState } from 'react';
import Layout from '../core/Layout';
import { Form, Button, Card } from 'react-bootstrap';
// import { API } from '../config';
import { signin, authenticate, isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });

    const { email, password, error, loading, redirectToReferrer } = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    }

    const signUpForm = () => (
        <Form className="container col-md-6">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                value={email}
                onChange={handleChange('email')} 
                type="email" 
                placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                value={password} 
                onChange={handleChange('password')} 
                type="password" 
                placeholder="Password" />
            </Form.Group>
            <Button onClick={clickSubmit} variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
        );
    const redirectUser = () => {
        if(redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return(
        <div>
            <Layout title='Sign In' description='Sign in to your Taylormade Golf profile'>
                
            </Layout>
            <div classname="container-fluid" id='form-background'>
                <Card className='col-sm-8' style={{ marginRight: 'auto', marginLeft: 'auto', background: 'rgba(43, 43, 43, 0.59)' }}>
                    {showLoading()}
                    {showError()}
                    {signUpForm()}
                    {redirectUser()}
                </Card>
            </div>
        </div>
    );
};

export default Signin;