import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';

const validate = values => {
  const errors = {}
  if (!values.roll) {
    errors.roll = 'Required'
  } else if (values.roll > 99) {
    errors.roll = 'Must be 99 or less'
  }
  if (!values.initBonus) {
    errors.initBonus = 'Required'
  } else if (values.initBonus > 79) {
    errors.initBonus = 'Must be 79 or less'
  }
  return errors
}

const renderField =  ({ input, label, disabled, type, meta: { touched, error, warning } }) => (
  <div className={classNames({"form-group" : true, "has-error": error && touched})}>
    <label htmlFor="initBonus">{label}</label>
    <input disabled={disabled} className="form-control" {...input} type={type}/>
    {touched && error && <p className="help-block">{error}</p>}
  </div>);

const PlayerForm = (props) => {
  const { handleSubmit, disabled } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field disabled={disabled} name="initBonus" type="number" component={renderField} label="Initiative Bonus"/>
      <Field disabled={disabled} name="roll" type="number" component={renderField} label="Initiative Roll (Total)"/>
      <button disabled={disabled} className="btn btn-success" type="submit">Mark as Ready</button>
    </form>
  );
}


export default reduxForm({
  form: 'init-form', // a unique name for this form
  validate
})(PlayerForm);