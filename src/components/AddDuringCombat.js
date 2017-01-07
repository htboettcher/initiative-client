import React from 'react'
import { Field, reduxForm } from 'redux-form'

const AddDuringCombatForm = (props) => {
  const { handleSubmit, dirty } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <Field className="form-control" name="name" component="input" type="text"/>
      </div>
      <button className="btn btn-success" type="submit">Submit</button>
    </form>
  );
}

export default reduxForm({
  form: 'add-during-combat-form'  // a unique identifier for this form
})(AddDuringCombatForm)