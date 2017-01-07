import React, {Component, PropTypes} from 'react';
import {Modal, Button} from 'react-bootstrap';
import XOfMonsterForm from './XOfMonsterForm'

export class AddMultipleModal extends Component {
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
    this.props.setXOfMonsters(this.props.data.toJS(), newData.numberToAdd);
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    const { data } = this.props;
    return (
      <Button onClick={this.open}>Add More than 1
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
            <Modal.Title>Add More Than 1 {data.get('name')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <XOfMonsterForm onSubmit={this.submit} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </Button>
    )
  }
}

AddMultipleModal.propTypes = {
  data: PropTypes.object,
  setXOfMonsters: PropTypes.func
};
