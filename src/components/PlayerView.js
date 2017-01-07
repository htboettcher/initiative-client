import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setPlayerRoll, setPlayerInitBonus, nextCard, delayCard, updateCombatant, saveToDB } from '../action_creators';
import {Grid, Row, Col, Panel, Button, Jumbotron, ButtonToolbar} from 'react-bootstrap'
import PlayerForm from './PlayerForm'
import PlayerUpdateForm from './PlayerUpdateForm'
import {DelayModal} from './DelayModal'
import {PlayerCardOrderPanel} from './PlayerCardOrder'
import Immutable from 'immutable'

class PlayerImagePanel extends Component {
  render() {
    const { data } = this.props;
    const playerTitle = <h3>{data.get('name')}</h3>
    return (
      <Panel collapsible defaultExpanded header={playerTitle}>
        <img className="img-responsive" alt={data.get('name')} src={data.get('img')}/>
      </Panel>
    )
  }
}

class PlayerNextJumbotron extends Component {
  render() {
    const { nextCardClick, combatants, currentCard, handleDelayCard } = this.props;
    return (
      <Jumbotron>
        <h1>It's your turn.</h1>
        <ButtonToolbar>
          <Button bsSize='large' bsStyle='success' onClick={nextCardClick}>Next Combatant</Button>
        </ButtonToolbar>
        <DelayModal handleDelayCard={handleDelayCard}  currentCard={currentCard} combatants={combatants}/>
      </Jumbotron>
    )
  }
}

class PlayerView extends Component {
  constructor(props) {
    super(props);
    this.submitInit = this.submitInit.bind(this);
    this.handleNextCard = this.handleNextCard.bind(this);
    this.handleDelayCard = this.handleDelayCard.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.submitDBUpdate = this.submitDBUpdate.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
  }
  submitInit(data) {
    this.props.setPlayerRoll(data.name, data.roll);
    this.props.setPlayerInitBonus(data.name, data.initBonus);
  }
  getPlayer() {
    let player;
    const { combatants, players } = this.props;
    const currentPlayerRoute = this.props.routeParams.playername;
    if (combatants) {
      player = this.props.combatants.find(x => x.get('_id') === currentPlayerRoute);
    } else if (players) {
      player = this.props.players.find(x => x.get('_id') === currentPlayerRoute);
    } else {
      player = undefined;
    }
    return player;
  }
  submitUpdate(newData) {
    this.props.updateCombatant(this.getPlayer().toJS(), newData);
  }
  submitDBUpdate(newData) {
    let data = newData;
    delete data.roll;
    this.props.saveToDB(this.getPlayer().toJS()._id, data);
  }
  handleNextCard() {
     this.props.nextCard();
  }
  handleDelayCard(data) {
    this.props.delayCard(data);
  }
  render() {
    const { currentCard, combatants } = this.props;
    return (
      <Grid>
        <Row> 
          {
            currentCard && Immutable.is(currentCard, this.getPlayer()) &&
              <Col md={12}>
                <PlayerNextJumbotron handleDelayCard={this.handleDelayCard} currentCard={currentCard}  combatants={combatants} nextCardClick={this.handleNextCard}/>
              </Col>
          }
        </Row>
        <Row>
          <Col md={4}>
            {this.getPlayer() && <PlayerImagePanel data={this.getPlayer()} />}
          </Col>
            {
              !currentCard ?
                <Col md={8}>
                  <Panel header="Enter Your Initiative">
                    {this.getPlayer() && <PlayerForm onSubmit={this.submitInit} disabled={this.getPlayer().get('roll')} initialValues={this.getPlayer().toJS()}/>}
                  </Panel>
                </Col> : 
                <div>
                  <Col sm={3} md={3}>
                    <PlayerCardOrderPanel currentCard={currentCard} combatants={combatants} currentPlayer={this.getPlayer()}/>
                  </Col> 
                  { this.getPlayer() &&
                  <Col sm={5} md={5}>
                    <Panel header="Update Status">
                      <PlayerUpdateForm onSubmit={this.submitUpdate} initialValues={this.getPlayer().toJS()}/>
                    </Panel>
                  </Col>}
                </div>
            }
        </Row>
      </Grid>
    );
  }
}

PlayerView.propTypes = {
  players: PropTypes.object,
  combatants: PropTypes.object,
  currentCard: PropTypes.object,
  setPlayerRoll: PropTypes.func,
  updateCombatant: PropTypes.func,
  delayCard: PropTypes.func,
  nextCard: PropTypes.func
};

function mapStateToProps(state) {
  return {
    players: state.socket.get('players'),
    currentCard: state.socket.get('currentCard'),
    combatants: state.socket.get('combatants')
  };
}
export const PlayerViewContainer = connect(mapStateToProps, {setPlayerRoll, setPlayerInitBonus, nextCard, delayCard, updateCombatant, saveToDB})(PlayerView);