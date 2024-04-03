// components/DatePicker.js

import React from 'react';
import DatePicker from 'react-date-picker';
import { useField, ErrorMessage } from 'formik';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const CustomDatePicker = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <div className="date-picker-containers">
            <label htmlFor={props.id || props.name}>{label}</label>
            <DatePicker
                {...field}
                {...props}
                onChange={(val) => helpers.setValue(val)}
                onBlur={() => helpers.setTouched(true)}
                format="yyyy-MM-dd"
            />
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    );
};

export default CustomDatePicker;
