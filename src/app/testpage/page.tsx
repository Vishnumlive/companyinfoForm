"use client"
import React from 'react';
import { Formik, Form } from 'formik';
import CustomDatePicker from '@/components/DatePicker';

const initialValues = {
    date: ''
};

const HomePage = () => {
    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-8">Date Picker Form</h1>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <CustomDatePicker
                        label="Select a Date"
                        name="date"
                        id="date"
                        placeholder="Select date"
                    />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};

export default HomePage;