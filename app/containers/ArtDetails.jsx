import React from 'react';
import ReactDom from 'react-dom';
import {Location, Link} from 'react-router';
import {connect} from 'react-redux';
import {Modal, Grid, Row, Col} from 'react-bootstrap';

import * as actionCreators from '../actions/artActionCreators';
import {ImageLoader} from '../components/sky';
require('./ArtDetails.less');


export const ArtDetails = React.createClass({
  getInitialState: function() {
    return {
      show: true
    }
  },
  componentWillMount: function() {
    this.setState({
      galleryUrl: this.props.location.pathname.slice(0, this.props.location.pathname.lastIndexOf('/'))
    });
  },
  componentWillUnmount: function() {
    if(this.refs.modal) {
      this.refs.modal._onHide();
    }
  },
  getArtInfo: function() {
    const gallery = this.props.params.gallery;
    const aslug = this.props.routeParams.aslug;
    const items = this.props.art.get('items').toJS();

    const filtered = items.filter(item => {
      return item.galleries.indexOf(gallery) >= 0;
    });

    let artInfo = {
      galleryUrl: this.state.galleryUrl
    };

    if(filtered.length) {
      for(var i = 0; i < filtered.length; i++) {
        if(filtered[i].slug === aslug) {
          artInfo.item = filtered[i];
          artInfo.prevUrl = filtered[i-1] && artInfo.galleryUrl + '/' + filtered[i-1].slug;
          artInfo.nextUrl = filtered[i+1] && artInfo.galleryUrl + '/' + filtered[i+1].slug;
        }
      }
    }

    return artInfo;
  },
  render: function() {
    const artInfo = this.getArtInfo();
    return (
      <Modal id='art-modal' ref='modal' show={this.state.show} backdrop='static'>
        <Modal.Header>
          <Grid className='controls'>
            <Row>
              <Col xs={12}>
                {this.renderPrev(artInfo)}
                {this.renderNext(artInfo)}
                <a onClick={this.handleClose}><i className='icon-alfa-close' /></a>
              </Col>
            </Row>
          </Grid>
        </Modal.Header>
        <Modal.Body>
          {artInfo.item &&
          <div className='item-details'>
              <ImageLoader src={'/content/images/art/sm_' + artInfo.item.filename} onLoad={this.imgLoaded} style={{width:'100%',maxWidth:'100%'}}/>
          </div>}
        </Modal.Body>
      </Modal>
    );
  },

  renderPrev(artInfo) {
    return artInfo.prevUrl ? <Link to={artInfo.prevUrl}><i className='icon-alfa-arrow-left' /></Link>
                           : <i className='icon-alfa-arrow-left disabled' />
  },
  renderNext(artInfo) {
    return artInfo.nextUrl ? <Link to={artInfo.nextUrl}><i className='icon-alfa-arrow-right' /></Link>
                           : <i className='icon-alfa-arrow-right disabled' />
  },

  handleClose: function() {
    this.setState({
      show: false
    });
    // HACK djw: react-bootstrap does not expose Modal events,
    // so lets wait a tick before we transition
    setTimeout(this.backToGallery, 200);
  },
  backToGallery: function() {
    this.props.history.replaceState(null, this.state.galleryUrl);
  },

});


function mapStateToProps(state) {
  return {
    art: state.get('art')
  };
}

export const ArtDetailsContainer = connect(mapStateToProps, actionCreators)(ArtDetails);
