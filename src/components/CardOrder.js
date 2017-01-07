import React, {Component, PropTypes} from 'react';
import {Panel, Col, Row} from 'react-bootstrap';
import {is} from 'immutable'
import classNames from 'classnames'

class CardOrderRow extends Component {
  render() {
    const { data, highlightCard } = this.props;
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
      <Col xs={2}>
        <div className="center-block text-center">
          <img src={data.get('img')} className={classNames({ 'img-circle': true }, { 'bw-img': !!data.get('skip') })} alt={data.get('name')} height="75"/>
          <h1 className={classNames({'text-muted': !!data.get('skip')})}>{!!data.get('skip') && 'Skipped - '}{data.get('name')}</h1>
          {roundCounter}
         </div>
        { highlightCard && <hr/> }
      </Col>
    )
  }
}

export default class CardOrderPanel extends Component {
  render() {
    const { currentCard, combatants } = this.props;
    let nextCards;
    if (typeof combatants !== 'undefined') {
      const cardIndex = combatants.findIndex((x) => is(currentCard, x));
      const firstHalf = combatants.slice(0, cardIndex);
      const secondHalf = combatants.slice(cardIndex + 1, combatants.length);
      const nextCardsData = secondHalf.concat(firstHalf);
      nextCards =  nextCardsData.take(6).map((x, i) => <CardOrderRow key={i} data={x}></CardOrderRow>);
    }
    const panelTitle = <h2 className="text-center">Upcoming Combatants</h2>;
    return (
      <Panel header={panelTitle}>
        <Row>
          {nextCards}
        </Row>
      </Panel>
    );
  }
}

CardOrderPanel.propTypes = {
  currentCard: PropTypes.object,
  combatants: PropTypes.object
};