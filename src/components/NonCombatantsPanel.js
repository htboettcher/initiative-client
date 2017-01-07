import React, {Component, PropTypes} from 'react';
import {Panel, ListGroup, ListGroupItem, Button, ButtonToolbar } from 'react-bootstrap';
import AddDuringCombatModal from './AddDuringCombatModal'

class NonCombatantRow extends Component {
  render() {
    const { data, addToCombatClick } = this.props;
    return (
      <ListGroupItem>
        <div className="clearfix">
          <div className="pull-left center-block text-center">
            <img src={data.get('img')} className="img-circle" alt={data.get('name')} height="25"/>
            <h4>{data.get('name')}</h4>
          </div>
          <div className="pull-right">
            <AddDuringCombatModal addToCombatClick={addToCombatClick} data={data} />
          </div>
        </div>
      </ListGroupItem>
    )
  }
}

export class NonCombatantsPanel extends Component {
  render() {
    const { nonCombatants, addToCombatClick } = this.props;
    const panelTitle = <h2 className="text-center">Not In Combat</h2>;
    const rows = nonCombatants.map((x, i) => <NonCombatantRow addToCombatClick={addToCombatClick} key={i} data={x} />);
    return (
      <Panel collapsible header={panelTitle}>
        <ListGroup fill>
          {rows}
        </ListGroup>
      </Panel>
    );
  }
}

NonCombatantsPanel.propTypes = {
  nonCombatants: PropTypes.object,
  addToCombatClick: PropTypes.func
};