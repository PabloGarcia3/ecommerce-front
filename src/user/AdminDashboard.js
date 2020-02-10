import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Card as DashCard, Col } from 'react-bootstrap';

const AdminDashboard = () => {
    const { user: { _id, name, email, role } } = isAuthenticated();

    const adminLinks = () => {
        return (
            <DashCard className="mb-5">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">View Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">Manage Products</Link>
                    </li>
                </ul>
            </DashCard>
        );
    }

    const adminInfo = () => {
        return (
            <DashCard className="mb-5">
                <DashCard.Body>
                    <DashCard.Title></DashCard.Title>
                    <ul className="list-group">
                        <li className="list-group-item">{name}</li>
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
                    </ul>
                </DashCard.Body>
            </DashCard>
        );
    }

    return (
        <div>
            <Layout title="Dashboard" description={`Hello ${name}`}>
                ...
            </Layout>
            <div className='card-container' id="dashboard-container">
                <Col className="row">
                    <div className="col-3">
                        {adminLinks()}
                    </div>
                    <div className="col-9">
                        {adminInfo()}
                    </div>
                </Col>
            </div>
        </div>
    );
};

export default AdminDashboard;