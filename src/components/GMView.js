import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { setMonsterRoll, startCombat, nextCard, setNonCombatantRoll, addCard, delayCard, removeCard, updateCombatant, setXOfMonsters} from '../action_creators';
import {Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button, ButtonToolbar, Jumbotron} from 'react-bootstrap';
import GmCardOrderPanel from './GMCardOrder'
import {DelayModal} from './DelayModal'
import {NonCombatantsPanel} from './NonCombatantsPanel'
import {AddMultipleModal} from './AddMultipleModal'


class PlayerLGItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <ListGroupItem>
        <div className="clearfix">
          <div className="pull-left text-center center-block">
            <img src={data.img} className="img-circle" alt={data.name} height="70"/> 
            <h4>{data.name}</h4>
          </div>
          <div className="pull-right">
            {!!data.roll && <div className="alert alert-success"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Roll: {data.roll} Bonus: ({data.initBonus})</div>}
          </div>
        </div>
      </ListGroupItem>
    )
  }
}

class ReadyMonsterLGItem extends Component {
  render() {
    const { data, handleClick, handleClick2 } = this.props;
    return (
      <ListGroupItem>
        <div className="clearfix">
          <div className="text-center center-block">
            <img src={data.get('img')} className="img-circle" alt={data.get('name')} height="70"/> <h4>{data.get('name')}</h4>
          </div>
        </div>
      </ListGroupItem>
    )
  }
}

class MonsterLGItem extends Component {
  render() {
    const { data, handleClick, handleClick2 } = this.props;
    return (
      <ListGroupItem>
        <div className="clearfix">
          <div className="pull-left text-center center-block">
            <img src={data.get('img')} className="img-circle" alt={data.get('name')} height="70"/> <h4>{data.get('name')}</h4>
          </div>
          <ButtonToolbar className="pull-right">
            <Button disabled={!!data.get('roll')} onClick={() => handleClick(data)}>{data.get('roll') ? 'Initiative: ' + data.get('roll') : 'Add 1'}</Button>
            <AddMultipleModal data={data} setXOfMonsters={handleClick2}/>
          </ButtonToolbar>
        </div>
      </ListGroupItem>
    )
  }
}

class GMView extends Component {
  constructor(props) {
    super(props);
    this.rollMonsterInit = this.rollMonsterInit.bind(this);
    this.rollNonCombatantInit = this.rollNonCombatantInit.bind(this);
    this.removeCardClick = this.removeCardClick.bind(this);
    this.handleDelayCard = this.handleDelayCard.bind(this);
  }
  rollMonsterInit(data) {
    this.props.setMonsterRoll(data.get('name'));
  }
  rollNonCombatantInit(data) {
    this.props.setNonCombatantRoll(data.get('name'));
  }
  handleDelayCard(data) {
    this.props.delayCard(data);
  }
  removeCardClick(data) {
    this.props.removeCard(data.toJS());
  }
  render() {
    const { monsterQueue, monsters, players,addCard, startCombat, nextCard, currentCard, combatants, nonCombatants, updateCombatant, setXOfMonsters } = this.props;
    return (
      <Grid>
        <Row>
          <Col md={6}>
            {currentCard &&
              <Jumbotron>
                <h1>{currentCard.get('name')}</h1>
                <h3>{'Initiative Roll: ' + currentCard.get('roll')}</h3>
                <p>Armor Class: {currentCard.get('ac')}
                <br/>Flat-footed AC: {currentCard.get('flatfootedAC')}
                <br/>Touch AC: {currentCard.get('touchAC')}</p>
                <DelayModal handleDelayCard={this.handleDelayCard}  currentCard={currentCard} combatants={combatants}/>
              </Jumbotron>
            }
            <Button disabled={!!currentCard} bsSize={!currentCard ? "large" : "small"} bsStyle="success" onClick={startCombat} block>
              {currentCard ? <span>Combat is Started</span> : <span>Start Combat</span>}
            </Button>
            <Button disabled={!currentCard} bsSize={currentCard ? "large" : "small"} onClick={nextCard} block>
              Next Card
            </Button>
            <p/>
            { currentCard ?
              <NonCombatantsPanel rollInitClick={this.rollNonCombatantInit} nonCombatants={monsters} addToCombatClick={addCard}/> :
              <div><Panel header="Select Enemies">
                <ListGroup fill>
                  {monsters && monsters.map((x, i) => 
                    <MonsterLGItem data={x} handleClick={this.rollMonsterInit} handleClick2={setXOfMonsters} key={i + 1} />
                  )}
                </ListGroup>
              </Panel>
              { monsterQueue && <Panel header="Added Enemies">
                <ListGroup fill>
                  { monsterQueue.map((x, i) => 
                    <ReadyMonsterLGItem data={x} key={i} />
                  )}
                </ListGroup>
              </Panel>
              }
              </div>
            }
          </Col>
          <Col md={6}>
              {
                currentCard ? 
                  <GmCardOrderPanel updateCombatant={updateCombatant} removeCardClick={this.removeCardClick} currentCard={currentCard} combatants={combatants}/> : 
                  <Panel header="Ready Status">
                    <ListGroup fill>
                      {players && players.map((x, i) =>
                        <PlayerLGItem data={x} key={i + 1} />
                      )}
                    </ListGroup>
                  </Panel>
              }
          </Col>
        </Row>
      </Grid>
    );
  }
}

GMView.propTypes = {
  players: PropTypes.array,
  monsters: PropTypes.object,
  monsterQueue: PropTypes.object,
  setMonsterRoll: PropTypes.func,
  setNonCombatantRoll: PropTypes.func,
  addCard: PropTypes.func,
  delayCard: PropTypes.func,
  setXOfMonsters: PropTypes.func,
  removeCard: PropTypes.func,
  currentCard: PropTypes.object,
  combatants: PropTypes.object,
  nonCombatants: PropTypes.object,
  updateCombatant: PropTypes.func
};

function mapStateToProps(state) {
  return {
    players: state.socket.toJS().players,
    monsters: state.socket.get('monsters'),
    monsterQueue: state.socket.get('monsterQueue'),
    combatants: state.socket.get('combatants'),
    nonCombatants: state.socket.get('nonCombatants'),
    currentCard: state.socket.get('currentCard')
  };
}
export const GMViewContainer = connect(mapStateToProps, {setMonsterRoll, startCombat, nextCard, setNonCombatantRoll, addCard, delayCard, removeCard, setXOfMonsters, updateCombatant})(GMView);