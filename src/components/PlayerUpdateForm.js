import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames'

const validate = values => {
  const errors = {}
  if (!values.ac) {
    errors.ac = 'Required'
  } else if (values.ac > 99) {
    errors.ac = 'Must be 99 or less'
  }
  if (!values.flatfootedAC) {
    errors.flatfootedAC = 'Required'
  } else if (values.flatfootedAC > 99) {
    errors.flatfootedAC = 'Must be 99 or less'
  }
  if (!values.touchAC) {
    errors.touchAC = 'Required'
  } else if (values.touchAC > 99) {
    errors.touchAC = 'Must be 99 or less'
  }
  if (!values.cmd) {
    errors.cmd = 'Required'
  } else if (values.cmd > 99) {
    errors.cmd = 'Must be 99 or less'
  }
  if (values.status && values.status.length > 50) {
    errors.status = 'dis is too long'
  }
  return errors
}

const renderField =  ({ input, label, disabled, type, meta: { touched, error, warning } }) => (
  <div className={classNames({"form-group" : true, "has-error": error})}>
    <label htmlFor="initBonus">{label}</label>
    <input disabled={disabled} className="form-control" {...input} type={type}/>
    {error && <p className="help-block">{error}</p>}
  </div>);

const PlayerUpdateForm = (props) => {
  const { handleSubmit, disabled, dirty } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field disabled={disabled} name="ac" type="number" component={renderField} label="Armor Class"/>
      <Field disabled={disabled} name="touchAC" type="number" component={renderField} label="Touch AC"/>
      <Field disabled={disabled} name="flatfootedAC" type="number" component={renderField} label="Flat-footed AC"/>
      <Field disabled={disabled} name="cmd" type="number" component={renderField} label="CMD"/>
      <Field disabled={disabled} name="status" type="text" component={renderField} label="Status"/>
      <button disabled={!dirty} className="btn btn-success" type="submit">{!dirty ? 'No Changes' : 'Submit Changes'}</button>
    </form>
  );
}


export default reduxForm({
  form: 'player-update-form', // a unique name for this form
  validate
})(PlayerUpdateForm);