import React from 'react'
import { Field, reduxForm } from 'redux-form'

const XOfMonsterForm = (props) => {
  const { handleSubmit, dirty } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Number of Enemies to Add</label>
        <Field className="form-control" name="numberToAdd" component="input" type="number"/>
      </div>
      <button disabled={!dirty} className="btn btn-success" type="submit">Submit</button>
    </form>
  );
}

export default reduxForm({
  form: 'x-of-monster-form'  // a unique identifier for this form
})(XOfMonsterForm)