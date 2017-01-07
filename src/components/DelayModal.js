import React, {Component, PropTypes} from 'react';
import {ListGroup, ListGroupItem, Modal, Button} from 'react-bootstrap';
import Immutable from 'immutable'
import classNames from 'classnames'

class CardOrderRow extends Component {
  render() {
    const { data, highlight, onCardSelect } = this.props;
    return (
      <ListGroupItem onClick={()=>onCardSelect(data)}>
        <div className={classNames({'center-block' : true, 'text-center' : true})}>
          <img src={data.get('img')} className={classNames({ 'img-circle': true }, { 'bw-img': !!data.get('skip') })} alt={data.get('name')} height="25"/>
          <h4 className={classNames({'text-muted': !!data.get('skip')})}>{!!data.get('skip') && 'Skipped - '}{data.get('name')}</h4>
          { highlight && <hr />}
        </div>
      </ListGroupItem>
    )
  }
}

class ClickableCardOrderPanel extends Component {
  render() {
    const { currentCard, combatants, selectedCard, onCardSelect } = this.props;
    let nextCards;
    if (typeof combatants !== 'undefined') {
      const cardIndex = combatants.findIndex((x) => Immutable.is(currentCard, x));
      const firstHalf = combatants.slice(0, cardIndex);
      const secondHalf = combatants.slice(cardIndex + 1, combatants.length);
      const nextCardsData = secondHalf.concat(firstHalf);
      nextCards =  nextCardsData.map((x, i) => <CardOrderRow onCardSelect={onCardSelect} key={i} highlight={Immutable.is(selectedCard, x)} index={i} data={x}></CardOrderRow>);
    }
    return (
      <ListGroup fill>
        {nextCards}
      </ListGroup>
    );
  }
}

ClickableCardOrderPanel.propTypes = {
  currentCard: PropTypes.object,
  combatants: PropTypes.object
};

export class DelayModal extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.setSelectedCard = this.setSelectedCard.bind(this);
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {showModal: false};
  }
  close() {
    this.setState({ showModal: false });
  }
  setSelectedCard(data) {
    this.setState({ selectedCard: data });
  }
  submit() {
    console.log(this.state.selectedCard.toJS())
    this.props.handleDelayCard(this.state.selectedCard.toJS());
    this.setState({ showModal: false });
    this.setState({ selectedCard: undefined });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    const { combatants, currentCard } = this.props;
    return (
      <div>
      <h5>
        <a onClick={this.open}>Delay Me</a>
      </h5>

      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
            <Modal.Title>Delay Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ClickableCardOrderPanel currentCard={currentCard} selectedCard={this.state.selectedCard} onCardSelect={this.setSelectedCard} combatants={combatants}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.submit}>Submit</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

DelayModal.propTypes = {
  currentCard: PropTypes.object,
  combatants: PropTypes.object,
  handleDelayCard: PropTypes.func
};
