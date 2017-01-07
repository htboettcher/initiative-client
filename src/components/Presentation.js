import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Panel, Jumbotron} from 'react-bootstrap'
import CardOrderPanelContainer from './CardOrder'

class PresentationView extends Component {
  render() {
    const { currentCard, combatants } = this.props;
    return (
      <Grid fluid>
        {!currentCard &&
        <Row>
          <Col md={12}>
            <h1>Waiting for combat to start...</h1>
          </Col>
        </Row>}
        {currentCard &&
        <div>
        <Row>
          <Col md={12}>
            <CardOrderPanelContainer currentCard={currentCard} combatants={combatants}/>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Panel>
              <img className="img-responsive" alt={currentCard.get('name')} src={currentCard.get('img')}/>
            </Panel>
          </Col>
          <Col md={8}>
            <Jumbotron>
              <h1>{currentCard.get('name')}</h1>
              <p>{currentCard.get('status') || 'Test Status for Symmetry'}</p>
            </Jumbotron>
          </Col>
        </Row>
        </div>}
      </Grid>
    );
  }
}

PresentationView.propTypes = {
  currentCard: PropTypes.object,
  combatants: PropTypes.object
};

function mapStateToProps(state) {
  return {
    currentCard: state.socket.get('currentCard'),
    combatants: state.socket.get('combatants')
  };
}
export const PresentationViewContainer = connect(mapStateToProps)(PresentationView);