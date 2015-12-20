import React from 'react';
import {IndexLink, Link} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Col} from 'react-bootstrap';
import Bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import ImageLoader from '../components/sky/ImageLoader';
require('../../Web/content/styles/site.less');

export default React.createClass({
  render: function() {
    return (
      <div>
        <div id='logo-wrap'>
          <IndexLink to="/">
            <h1>
              <ImageLoader src='/content/images/anna-lancaster-fine-art-logo.png' className='img-responsive'/>
            </h1>
          </IndexLink>
        </div>
        <div className='nav-before'/>
        <Navbar>
          <Navbar.Header>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav onSelect={this.handleSelect}>
              <NavItem eventKey={1} href="/about">About</NavItem>
              <NavDropdown eventKey={2} title="Artwork" id='artwork-ddl'>
                <MenuItem eventKey={2.1} href="/art/plein-air">Pein Air</MenuItem>
                <MenuItem eventKey={2.2} href="/art/portraits-and-figures">Portraits &amp; Figures</MenuItem>
                <MenuItem eventKey={2.3} href="/art/stills-from-life">Stills from Life</MenuItem>
                <MenuItem eventKey={2.4} href="/art/traditional">Traditional</MenuItem>
                <MenuItem eventKey={2.5} href="/art" onSelect={this.handleMenuItemClick}>Archive</MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} href="/exhibits">Galleries &amp; Exhibits</NavItem>
              <NavItem eventKey={4} href="/classes">Classes</NavItem>
              <NavItem eventKey={4} href="/blog">Blog</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className='nav-after'/>
        {this.props.children}
      </div>
    );
  },
  handleSelect(key, path) {
    this.setState({activeItem: key});
    if (path) {
      console.log('selectTo:', path);
      // deprecated
      //this.transitionTo(href);

      // the router is now built on rackt/history, and it is a first class
      // API in the router for navigating
      this.props.history.pushState(null, path);
      // this.history.replaceState(null, `/users/${user.id}`, query);
    }
  },
  handleMenuItemClick: function(e, key) {
    e.preventDefault();
    e.stopPropagation();
    var tgt = e.target;

    this.setState({activeItem: key});

    // the router is now built on rackt/history, and it is a first class
    // API in the router for navigating
    if(tgt.href) {
      history.pushState(null, tgt.pathname);
    }
    // this.history.replaceState(null, `/users/${user.id}`, query);
  },

});

// import {Modal} from 'react-bootstrap';

// <div className='container'>
//     <div className='col-xs-4'>
//         <button className='btn btn-primary' onClick={this.handleClick}>react-bootstrap? <i className='glyphicon glyphicon-cog'/></button>
//     </div>
// </div>

// <Modal  id='test-modal' ref='modal' show={this.state.showModal} onHide={this.close} dialogClassName='sky-modal' backdrop='static'>
//     <Modal.Header>
//         <Modal.Title>Modal Title</Modal.Title>
//     </Modal.Header>
//
//     <Modal.Body>
//         React Bootstrap reporting for duty!
//     </Modal.Body>
//
//     <Modal.Footer>
//         <button className='btn btn-default' onClick={this.handleClick}>close</button>
//     </Modal.Footer>
//
// </Modal>

// handleClick: function(e) {
//     e.preventDefault();
//     this.setState({
//         showModal: !this.state.showModal
//     });
// }
