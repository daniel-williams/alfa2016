import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators.js';

export const About = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return <div>About</div>;
    }
});

function mapStateToProps(state) {
    return {
    }
}

export const AboutContainer = connect(mapStateToProps, actionCreators)(About);
