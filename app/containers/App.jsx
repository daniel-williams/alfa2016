import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Bootstrap from '../../Web/content/styles/bootstrap.min.css';
import * as contactActions from '../actions/contactActionCreators';
import * as subscribeActions from '../actions/subscribeActionCreators';
import Header from '../pages/header';
import Footer from '../pages/footer';
import {SubscribeContainer} from './Subscribe';
require('./App.less');
require('../fonts');


let timer = null;

export const App = React.createClass({
  componentDidMount: function() {
    timer = setTimeout(this.renderSubscribe, 5000);
  },
  componentWillUnmount: function() {
    if(timer) {
      clearTimeout(timer);
    }
  },
  renderSubscribe: function() {
    console.log('subscribe');
    subscribeActions.showSubscribe();
  },
  render: function() {
    return (
      <div id='main-wrap'>
        <Header {...this.props} />
        <div id='page-wrap'>
          {this.props.children}
        </div>
        <Footer {...this.props} />
        <SubscribeContainer {...this.props} />
      </div>
    );
  },

});

function mapStateToProps(state) {
  return {
    contact: state.get('contact')
  };
}

export const AppContainer = connect(mapStateToProps, contactActions)(App);
