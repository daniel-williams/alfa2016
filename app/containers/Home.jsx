import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Modal} from 'react-bootstrap';

export default React.createClass({
    mixins: [PureRenderMixin],
    getInitialState: function() {
        return {
            showModal: false
        };
    },
    render: function() {
        return (
            <div className='container'>
                <div className='col-xs-6'>OMG</div>
                <div className='col-xs-6'>It's Bootstrap!</div>
                <div className='col-xs-4'>
                    <button className='btn btn-primary' onClick={this.handleClick}>react-bootstrap? <i className='glyphicon glyphicon-cog'/></button>
                </div>

                <Modal  id='test-modal' ref='modal' show={this.state.showModal} onHide={this.close} dialogClassName='sky-modal' backdrop='static'>
                    <Modal.Header>
                        <Modal.Title>Modal Title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        React Bootstrap reporting for duty!
                    </Modal.Body>

                    <Modal.Footer>
                        <button className='btn btn-default' onClick={this.handleClick}>close</button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    },

    handleClick: function(e) {
        e.preventDefault();
        this.setState({
            showModal: !this.state.showModal
        });
    }
});
