import React from 'react';
import Masonry from 'react-masonry-component';
import { Link } from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

const PlayerStaging = React.createClass({
  mixins: [PureRenderMixin],
  getPlayers: function() {
    return this.props.players || [];
  },
  getLink: function(player) {
    return 'player/' + player._id;
  },
  render: function() {
    var childElements = this.getPlayers().map(player =>
      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={player._id}>
        <Link to={"/player/" + player._id}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{player.name}</h3>
            </div>
            <div className="panel-body">
              <img className="img-responsive" src={player.img} alt={player.name}/>
            </div>
          </div>
        </Link>
      </div>
    );
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1>Select Your Character</h1>
          </div>
        </div>
        <Masonry className="row">
            {childElements}
        </Masonry>
      </div>
    )
  }
});


function mapStateToProps(state) {
  return {
    players: state.socket.toJS().players
  };
}
export const PlayerStagingContainer = connect(mapStateToProps)(PlayerStaging);