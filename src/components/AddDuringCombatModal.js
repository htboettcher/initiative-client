import React, {Component, PropTypes} from 'react';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import AddDuringCombatForm from './AddDuringCombat'

export default class AddDuringCombatModal extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {showModal: false};
  }
  close() {
    this.setState({ showModal: false });
  }
  submit(newData) {
    console.log(newData);
    this.props.addToCombatClick(newData);
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    const { data } = this.props;
    return (
      <div>
      <Button onClick={this.open}>Add Another</Button>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
            <Modal.Title>Adding: {data.get('name')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddDuringCombatForm onSubmit={this.submit} initialValues={data.toJS()}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

AddDuringCombatModal.propTypes = {
  data: PropTypes.object,
  addToCombatClick: PropTypes.func
};
