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
      show: true,
      showInfo: false,
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
    let viewMode = this.state.showInfo ? 'show-info' : '';
    return (
      <Modal id='art-modal' ref='modal' show={this.state.show} backdrop='static'>
        <Modal.Header>
          <div className='controls clearfix'>
              <div className='col-0'>
                {this.renderPrevIcon(artInfo)}
                {this.renderNextIcon(artInfo)}
              </div>
              <div className='col-0 sep'></div>
              <div className='col-0'>
                {this.renderInfoIcon()}
                {this.renderMagnifyIcon()}
              </div>
              <div className='col-0 pull-right'>
                <a onClick={this.handleClose}><i className='icon-alfa-close' /></a>
              </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {artInfo.item &&
          <section className={'item-details ' + viewMode}>
              <div className='img-panel'>
                <ImageLoader src={'/content/images/art/' + artInfo.item.slug + '-lg.jpg'} onLoad={this.imgLoaded} style={{width:'100%',maxWidth:'100%'}}/>
              </div>
              <div className='info-panel'>
                <div className='info-wrap'>
                  <h3>{artInfo.item.title}</h3>
                  <p>{this.renderDimensions(artInfo.item)}{artInfo.item.description}</p>
                  {this.renderSalesInfo(artInfo.item)}
                </div>
              </div>
          </section>}
        </Modal.Body>
      </Modal>
    );
  },
  renderSalesInfo(item) {
    return item.isForSale && !item.isSold ? <div className='buy-now'><button className='btn btn-alfa' type='button' onClick={this.handleBuyNow}>Buy Now</button></div>
                                          : <h3><i className='icon-alfa-sold' /> Sold</h3>
  },
  renderDimensions(item) {
    return <span className='dimensions'>{item.width + '" x ' + item.height + '"'}</span>
  },
  renderPrevIcon(artInfo) {
    return artInfo.prevUrl ? <Link to={artInfo.prevUrl}><i className='icon-alfa-arrow-left' /></Link>
                           : <a className='disabled'><i className='icon-alfa-arrow-left disabled' /></a>
  },
  renderNextIcon(artInfo) {
    return artInfo.nextUrl ? <Link to={artInfo.nextUrl}><i className='icon-alfa-arrow-right' /></Link>
                           : <a className='disabled'><i className='icon-alfa-arrow-right disabled' /></a>
  },

  renderInfoIcon() {
    return !this.state.showInfo ? <a onClick={this.handleInfoToggle}><i className='icon-alfa-info' /></a>
                                : <a className='disabled'><i className='icon-alfa-info disabled' /></a>
  },
  renderMagnifyIcon() {
    return this.state.showInfo ? <a onClick={this.handleInfoToggle}><i className='icon-alfa-magnify' /></a>
                               : <a className='disabled'><i className='icon-alfa-magnify disabled' /></a>
  },

  handleBuyNow: function() {
    alert('sucker!');
  },
  handleInfoToggle: function() {
    this.setState({
      showInfo: !this.state.showInfo
    });
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
