import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from './apiUser';
import { Form, FormGroup, FormLabel } from 'react-bootstrap';

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if(data.error) {
                setValues({...values, error: true});
            } else {
                setValues({...values, name: data.name, email: data.email});
            }
        })
    }

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    }

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password}).then(
            data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            success: true
                        });
                    });
                }
            }
        );
    };

    const redirectUser = success => {
        if(success) {
            return <Redirect to="/cart" />
        }
    }

    const profileUpdate = (name, email, password) => (
        <Form>
            <FormGroup>
                <FormLabel>Name</FormLabel>
                <Form.Control type="text" onChange={handleChange('name')} value={name} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Email</FormLabel>
                <Form.Control type="email" onChange={handleChange('email')} value={email} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Password</FormLabel>
                <Form.Control type="password" onChange={handleChange('password')} value={password} />
            </FormGroup>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </Form>
    );

    return (
        <Fragment>
            <Layout title='Profile' description='Update your profile details'>
                
            </Layout>
            <div className="container"> 
                <div>
                    <h2 className="mb-4">Profile Update</h2>
                    {profileUpdate(name, email, password)}
                    {redirectUser(success)}
                </div>               
            </div>
        </Fragment>
    );
}

export default Profile;