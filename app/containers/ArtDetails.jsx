import React from 'react';
import ReactDom from 'react-dom';
import {Location, Link} from 'react-router';
import {connect} from 'react-redux';
import {Modal, Grid, Row, Col} from 'react-bootstrap';

import * as artActions from '../actions/artActionCreators';
import * as inquiryActions from '../actions/inquiryActionCreators';

import {Icon, ImageLoader} from '../components';
import Inquiry from '../pages/Inquiry';
require('./ArtDetails.less');


let actions = Object.assign({}, artActions, inquiryActions);

export const ArtDetails = React.createClass({
  getInitialState: function() {
    return {
      show: true,
      showInfo: false,
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
    const item = artInfo.item;
    const viewMode = this.state.showInfo ? 'show-info' : '';

    return (
      <Modal id='art-modal' ref='modal' show={this.state.show} backdrop='static'>
        <Modal.Header>
          <div className='controls clearfix'>
              <div className='col-0'>
                {this.renderPrevIcon(artInfo.prevUrl)}
                {this.renderNextIcon(artInfo.nextUrl)}
              </div>
              <div className='col-0 sep'></div>
              <div className='col-0'>
                {this.renderInfoIcon()}
                {this.renderMagnifyIcon()}
              </div>
              <div className='col-0 pull-right'>
                <a onClick={this.handleClose} className='icon'><Icon name='close' onClick={actions.resetInquiry} /></a>
              </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {item &&
            <section className={'item-details ' + viewMode}>
              <div className='img-panel'>
                <ImageLoader src={'/content/images/art/' + item.slug + '-lg.jpg'} />
              </div>
              <div className='info-panel'>
                <div className='info-wrap'>
                  <h3>{item.title}</h3>
                  <p>{this.renderDimensions(item)}{item.description}</p>
                  <div className='inquiry mt'>
                    {this.renderSalesInfo(item)}
                    {this.renderSalesInquiry(item)}
                  </div>
                </div>
              </div>
          </section>}
        </Modal.Body>
      </Modal>
    );
  },
  renderSalesInfo(item) {
    return item.isSold ? <h3><Icon name='sold' /> Sold</h3> : null;
  },
  renderSalesInquiry(item) {
    return (item.isForSale && !item.isSold) ? <Inquiry item={item} {...this.props} /> : null;
  },
  renderDimensions(item) {
    return <span className='dimensions'>{item.width + '" x ' + item.height + '"'}</span>
  },
  renderPrevIcon(url) {
    return url ? <Link to={url} className='icon'><Icon name='arrow-left' onClick={actions.resetInquiry} /></Link>
               : <a className='icon disabled'><Icon name='arrow-left disabled' /></a>
  },
  renderNextIcon(url) {
    return url ? <Link to={url} className='icon'><Icon name='arrow-right' onClick={actions.resetInquiry} /></Link>
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
    this.props.history.pushState(null, this.state.galleryUrl);
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
