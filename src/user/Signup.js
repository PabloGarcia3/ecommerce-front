import React, { useState } from 'react';
import Layout from '../core/Layout';
import { Form, Button, Card } from 'react-bootstrap';
// import { API } from '../config';
import { signup } from '../auth';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    }

    const signUpForm = () => (
        <Form className="container col-md-6">
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                value={name} 
                onChange={handleChange('name')} 
                type="text" 
                placeholder="Name" />
            </Form.Group>
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

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New account successfully created. Please <Link to='/signin'>Sign In</Link>
        </div>
    );

    return(
        <div>
            <Layout title='Sign Up' description='Sign up to recieve exclusive offers from Taylormade Golf'>
                
            </Layout>
            <div id='form-background'>
                <Card className='col-sm-8' style={{ marginRight: 'auto', marginLeft: 'auto', background: 'rgba(43, 43, 43, 0.59)' }}>
                    {showSuccess()}
                    {showError()}
                    {signUpForm()}
                </Card>
            </div>
        </div>
    );
};

export default Signup;