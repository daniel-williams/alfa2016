import React from 'react';
import ReactDom from 'react-dom';
import {Location, Link} from 'react-router';
import {connect} from 'react-redux';
import {Modal, Grid, Row, Col} from 'react-bootstrap';

import * as artActions from '../actions/artActionCreators';
import * as inquiryActions from '../actions/inquiryActionCreators';

import {Icon, ImageLoader} from '../components';
import ArtInquiry from './ArtInquiry';
require('./ArtDetails.less');


let actions = Object.assign({}, artActions, inquiryActions);

export const ArtDetails = React.createClass({
  getInitialState: function() {
    return {
      show: true,
      showInfo: false,
      showInquiry: false,
      itemOfInterest: null,
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
    const gallerySlug = this.props.params.gallerySlug;
    const artSlug = this.props.routeParams.artSlug;
    const items = this.props.art.get('items').toJS();

    const filtered = items.filter(item => {
      return item.galleries.indexOf(gallerySlug) >= 0;
    });

    let artInfo = {
      galleryUrl: this.state.galleryUrl
    };

    if(filtered.length) {
      for(var i = 0; i < filtered.length; i++) {
        if(filtered[i].slug === artSlug) {
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
                <a onClick={this.handleClose} className='icon'><Icon name='close' /></a>
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
                  <div className='mt'>
                    {!this.state.showInquiry && this.renderSalesInfo(artInfo.item)}
                    {this.state.showInquiry && <ArtContact item={this.state.itemOfInterest} {...this.props} />}
                  </div>
                </div>
              </div>
          </section>}
        </Modal.Body>
      </Modal>
    );
  },
  renderSalesInfo(item) {
    return item.isForSale && !item.isSold ? <div className='for-sale'><a onClick={this.handleSalesInquiry(item)}>Available for purchase.</a></div>
                                          : <h3><Icon name='sold' /> Sold</h3>
  },
  renderDimensions(item) {
    return <span className='dimensions'>{item.width + '" x ' + item.height + '"'}</span>
  },
  renderPrevIcon(artInfo) {
    this.resetInquiry();
    return artInfo.prevUrl ? <Link to={artInfo.prevUrl} className='icon'><Icon name='arrow-left' /></Link>
                           : <a className='icon disabled'><Icon name='arrow-left disabled' /></a>
  },
  renderNextIcon(artInfo) {
    this.resetInquiry();
    return artInfo.nextUrl ? <Link to={artInfo.nextUrl} className='icon'><Icon name='arrow-right' /></Link>
                           : <a className='icon disabled'><Icon name='arrow-right disabled' /></a>
  },

  renderInfoIcon() {
    return !this.state.showInfo ? <a onClick={this.handleInfoToggle} className='icon'><Icon name='info' /></a>
                                : <a className='icon disabled'><Icon name='info disabled' /></a>
  },
  renderMagnifyIcon() {
    return this.state.showInfo ? <a onClick={this.handleInfoToggle} className='icon'><Icon name='magnify' /></a>
                               : <a className='icon disabled'><Icon name='magnify disabled' /></a>
  },

  handleSalesInquiry: function(item) {
    var self = this;
    return function() {
      self.setState({
        showInquiry: true,
        itemOfInterest: item.title
      });
    }
  },
  handleInfoToggle: function() {
    this.setState({
      showInfo: !this.state.showInfo
    });
  },

  handleClose: function() {
    this.resetInquiry();
    this.setState({
      show: false
    });
    // HACK djw: react-bootstrap does not expose Modal events,
    // so lets wait a tick before we transition
    setTimeout(this.backToGallery, 200);
  },
  backToGallery: function() {
    this.props.history.pushState(null, this.state.galleryUrl);
  },

  resetInquiry: function() {
    //inquiryActions.resetInquiry();
  },

});


function mapStateToProps(state) {
  return {
    art: state.get('art'),
    inquiry: state.get('inquiry'),
    user: state.get('user'),
  };
}

export const ArtDetailsContainer = connect(mapStateToProps, actions)(ArtDetails);
