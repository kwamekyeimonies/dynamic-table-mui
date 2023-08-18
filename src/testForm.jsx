import React from 'react';
import { Formik, Form, Field } from 'formik';

// Authentication Component
const AuthComponent = () => {
    return (
        <div>
            <h2>Authentication</h2>
            <label>Email:</label>
            <Field type="email" name="email" />
            <br />
            <label>Password:</label>
            <Field type="password" name="password" />
        </div>
    );
};

// Product Creation Component
const ProductComponent = () => {
    return (
        <div>
            <h2>Product Creation</h2>
            <label>Product Name:</label>
            <Field type="text" name="productName" />
            <br />
            <label>Price:</label>
            <Field type="number" name="price" />
        </div>
    );
};

const CompFormTest = () => {
    const handleSubmit = (values) => {
        // Perform any actions you need with the form data
        console.log(values); // Log the form data
    };

    return (
        <Formik initialValues={{ email: '', password: '', productName: '', price: 0 }} onSubmit={handleSubmit}>
            <Form>
                <AuthComponent />
                <ProductComponent />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default CompFormTest;
