import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const[statusValues, setStatusValues] = useState([]);

    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    }

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h4 className="text-danger">Total orders: {orders.length}</h4>
            );
        } else {
            return <h1 className="text-danger">No Orders</h1>
        }
    }

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
                <input 
                    type="text"
                    value={value}
                    className="form-control"
                    readOnly 
                />
            </div>
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if(data.error) {
                    console.log('Status update failed');
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4" style={{color: 'black'}}>Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div>
            <h1>Orders</h1>
            <h4>Manage Customer Orders</h4>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    
                    {orders.map((o, oIndex) => {
                        return (
                            <div
                                className="mt-5"
                                key={oIndex}
                                style={{ borderBottom: "5px solid indigo" }}
                            >
                                <h3 className="mb-5">
                                    <span>Order ID: {o._id}</span>
                                </h3>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        {showStatus(o)}
                                    </li>
                                    <li className="list-group-item">
                                        {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered On: {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery Address: {o.address}
                                    </li>
                                </ul>
                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order: {o.products.length}
                                </h3>

                                {o.products.map((p, pIndex) => (
                                    <div className="mb-4" key={pIndex} style={{ padding: '20px', border: '1px solid indigo' }}>
                                        {showInput('Product name', p.name)}
                                        {showInput('Product price', p.price)}
                                        {showInput('Product total', p.count)}
                                        {showInput('Product ID', p._id)}
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )

}

export default Orders;