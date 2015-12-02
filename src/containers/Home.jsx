import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators.js';

export const Home = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return <div>Home</div>;
    }
});

function mapStateToProps(state) {
    return {
    }
}

export const HomeContainer = connect(mapStateToProps, actionCreators)(Home);
