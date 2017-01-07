import React, {Component, PropTypes} from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import Immutable from 'immutable';
import classNames from 'classnames';

class PlayerLGItem extends Component {
  render() {
    const { data, highlightCard} = this.props;
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
        <div className="center-block text-center">
          <img src={data.get('img')} className={classNames({ 'img-circle': true }, { 'bw-img': !!data.get('skip') })} alt={data.get('name')} height="25"/>
          <h4 className={classNames({'text-muted': !!data.get('skip')})}>{!!data.get('skip') && 'Skipped - '}{data.get('name')}</h4>
          {roundCounter}
         </div>
        { highlightCard && <hr/> }
      </ListGroupItem>
    )
  }
}

export class PlayerCardOrderPanel extends Component {
  render() {
    const { currentCard, combatants, currentPlayer } = this.props;
    let nextCards;
    if (typeof combatants !== 'undefined') {
      const cardIndex = combatants.findIndex((x) => Immutable.is(currentCard, x));
      const playerCard = combatants.find((x) => Immutable.is(currentPlayer, x));
      const firstHalf = combatants.slice(0, cardIndex);
      const secondHalf = combatants.slice(cardIndex, combatants.length);
      const nextCardsData = secondHalf.concat(firstHalf);
      const playerIndex = nextCardsData.findIndex((x) => Immutable.is(playerCard, x));
      nextCards =  nextCardsData.map((x, i) => <PlayerLGItem key={i} highlightCard={playerIndex === i} data={x}></PlayerLGItem>);
    }
    const panelTitle = <h2 className="text-center">Combatant Order</h2>;
    return (
      <Panel header={panelTitle}>
        <ListGroup fill>
          {nextCards}
        </ListGroup>
      </Panel>
    );
  }
}

PlayerCardOrderPanel.propTypes = {
  currentCard: PropTypes.object,
  combatants: PropTypes.object,
  currentPlayer: PropTypes.object
};