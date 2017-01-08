import React, {Component, PropTypes} from 'react';
import {Panel, Col, ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap';
import Immutable from 'immutable'
import classNames from 'classnames'
import {EditCombatantModal} from './EditCombatantModal'

class CardOrderRow extends Component {
  render() {
    const { data, removeCardClick, updateCombatant } = this.props;
    let roundCounter;
    switch (data.get('skip')) {
      case 1:
        roundCounter = data.get('skip') ? <p>{data.get('skip')} round until turn</p> : '';
        break;
      default:
        roundCounter = data.get('skip') ? <p>{data.get('skip')} rounds until turn</p> : '';
        break;
    }
    return (
      <ListGroupItem>
        <div className="clearfix">
          <Col xs={5}>
            <div className="center-block text-center">
              <img src={data.get('img')} className={classNames({ 'img-circle': true }, { 'bw-img': !!data.get('skip') })} alt={data.get('name')} height="25"/>
              <h4 className={classNames({'text-muted': !!data.get('skip')})}>{!!data.get('skip') && 'Skipped - '}{data.get('name')}</h4>
              {roundCounter}
            </div>
          </Col>
          <Col xs={5}>
            <p>Armor Class: {data.get('ac')}
            <br/>Touch AC: {data.get('touchAC')}
            <br/>Flat-footed AC: {data.get('flatfootedAC')}
            <br/>CMD: {data.get('cmd')}</p>
          </Col>
          <Col xs={2}>
            <Glyphicon glyph="remove" onClick={() => removeCardClick(data)}/><br/>
            <EditCombatantModal data={data} updateCombatant={updateCombatant}/>
          </Col>
        </div>
      </ListGroupItem>
    )
  }
}

export default class GmCardOrderPanel extends Component {
  render() {
    const { currentCard, combatants, removeCardClick, updateCombatant } = this.props;
    let nextCards;
    if (typeof combatants !== 'undefined') {
      const cardIndex = combatants.findIndex((x) => Immutable.is(currentCard, x));
      const firstHalf = combatants.slice(0, cardIndex);
      const secondHalf = combatants.slice(cardIndex + 1, combatants.length);
      const nextCardsData = secondHalf.concat(firstHalf);
      console.log(nextCardsData);
      nextCards =  nextCardsData.map((x, i) => <CardOrderRow updateCombatant={updateCombatant} removeCardClick={removeCardClick} key={i} data={x}></CardOrderRow>);
    }
    const panelTitle = <h2>Upcoming Combatants</h2>;
    return (
      <Panel header={panelTitle}>
        <ListGroup fill>
          {nextCards}
        </ListGroup>
      </Panel>
    );
  }
}

GmCardOrderPanel.propTypes = {
  currentCard: PropTypes.object,
  removeCardClick: PropTypes.func,
  updateCombatant: PropTypes.func,
  combatants: PropTypes.object
};