import React, {Component, PropTypes} from 'react';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import PlayerUpdateForm from './PlayerUpdateForm'

export class EditCombatantModal extends Component {
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
    this.props.updateCombatant(this.props.data.toJS(), newData);
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    const { data } = this.props;
    return (
      <div>
      <Glyphicon glyph="edit" onClick={this.open}/>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
            <Modal.Title>Updating: {data.get('name')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlayerUpdateForm onSubmit={this.submit} initialValues={data.toJS()}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

EditCombatantModal.propTypes = {
  data: PropTypes.object,
  updateCombatant: PropTypes.func
};
