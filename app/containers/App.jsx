import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Bootstrap from '../../Web/content/styles/bootstrap.min.css';
require('./App.less');
require('../fonts');

import constants from '../constants';
import * as subscribeActions from '../actions/subscribeActionCreators';
import * as contactActions from '../actions/contactActionCreators';

import {Subscribe} from '../components';
import Header from '../pages/header';
import Footer from '../pages/footer';


let actions = Object.assign({}, subscribeActions, contactActions);
let subscribeTimer = null;
let subscribeDelay = constants.subscribeDelay;

export const App = React.createClass({
  componentDidMount: function() {
    subscribeTimer = setTimeout(actions.showSubscribe, subscribeDelay);
  },
  componentWillUnmount: function() {
    if(subscribeTimer) {
      clearTimeout(subscribeTimer);
    }
  },
  render: function() {
    return (
      <div id='main-wrap'>
        <Header {...this.props} />
        <div id='page-wrap'>
          {this.props.children}
        </div>
        <Footer {...this.props} />
        <Subscribe {...this.props} />
      </div>
    );
  },

});

function mapStateToProps(state) {
  return {
    user: state.get('user'),
    contact: state.get('contact'),
    subscribe: state.get('subscribe'),
  };
}

export const AppContainer = connect(mapStateToProps, actions)(App);
