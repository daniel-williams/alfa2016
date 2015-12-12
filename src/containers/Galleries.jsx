import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';

import * as actionCreators from '../actions/creators';


export const Galleries = React.createClass({
    mixins: [PureRenderMixin],

    isFetching: function() {
        return this.props.galleries.get('isFetching');
    },
    isLoaded: function() {
        return this.props.galleries.get('items').count() > 0;
    },
    componentWillMount: function() {
        if(!this.props.galleries.get('items').count()) {
            this.props.bootstrap();
        }
    },
    // componentWillReceiveProps: function(nextProps) {
    //     console.log('componentWillReceiveProps', nextProps, this.props);
    // },
    render: function() {
        var galleries = this.props.galleries.get('items').map((item, i) => {
            return <div key={i} dangerouslySetInnerHTML={{__html:item.get('name')}} />;
        });
        return (
            <div className='galleries'>
                <h1>galleries List</h1>
                {this.isFetching() && <div>...fetching</div>}
                {this.isLoaded() && galleries}
            </div>
        );
    },

});

function mapStateToProps(state) {
    return {
        galleries: state.get('galleries')
    }
}

export const GalleriesContainer = connect(mapStateToProps, actionCreators)(Galleries);
