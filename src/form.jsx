import React from 'react';
import { Formik, Form, Field } from 'formik';

const MyForm = () => {
    const initialValues = {
        name: '',
        email: '',
        phone: '',
    };

    const handleSubmit = (values) => {
        // Perform any actions you need with the form data
        console.log(values); // Example: Log the form data
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                <tbody>
                    <tr>
                        <td className="ui header">Name</td>
                        <td>
                            <Field type="text" name="name" placeholder="Name" />
                        </td>
                    </tr>
                    <tr>
                        <td className="ui header">Email</td>
                        <td>
                            <Field type="email" name="email" placeholder="Email" />
                        </td>
                    </tr>
                    <tr>
                        <td className="ui header">Phone</td>
                        <td>
                            <Field type="text" name="phone" placeholder="Phone" />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" className="ui button primary">
                                Submit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </Form>
        </Formik>
    );
};

export default MyForm;
