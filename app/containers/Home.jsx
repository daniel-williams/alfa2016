import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return (
            <div className='container'>
                <div className='col-xs-6'>OMG</div>
                <div className='col-xs-6'>It's Bootstrap!</div>
                <div className='col-xs-4'><button className='btn btn-primary'><i className='glyphicon glyphicon-ok'/> Okay</button></div>
            </div>
        );
    }
});
