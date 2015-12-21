import React from 'react';
import {IndexLink, Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
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
            <Nav>
              <LinkContainer to="/about"><NavItem eventKey={1}>About</NavItem></LinkContainer>
              <NavDropdown eventKey={2} title="Artwork" id='artwork-ddl'>
                <LinkContainer to="/art/plein-air"><MenuItem eventKey={2.1}>Pein Air</MenuItem></LinkContainer>
                <LinkContainer to="/art/portraits-and-figures"><MenuItem eventKey={2.2}>Portraits &amp; Figures</MenuItem></LinkContainer>
                <LinkContainer to="/art/stills-from-life"><MenuItem eventKey={2.3}>Stills from Life</MenuItem></LinkContainer>
                <LinkContainer to="/art/traditional"><MenuItem eventKey={2.4}>Traditional</MenuItem></LinkContainer>
                <LinkContainer to="/art/archive"><MenuItem eventKey={2.5}>Archive</MenuItem></LinkContainer>
              </NavDropdown>
              <LinkContainer to="/exhibits"><NavItem eventKey={3}>Galleries &amp; Exhibits</NavItem></LinkContainer>
              <LinkContainer to="/classes"><NavItem eventKey={4}>Classes</NavItem></LinkContainer>
              <LinkContainer to="/blog"><NavItem eventKey={4}>Blog</NavItem></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className='nav-after'/>
        {this.props.children}
      </div>
    );
  },
  // handleSelect: function(p1, p2) {
  //   if(typeof p1 === 'number' && typeof p2 === 'string') {
  //     // (key, path)
  //     this.handleTransition(p1, p2);
  //   } else if(typeof p1 === 'object' && p2 === 'number') {
  //     // MenuItem API docs appear to lie about onSelect params
  //     // https://react-bootstrap.github.io/components.html#menu-items
  //     // documented: (eventKey, href, target)
  //     // actual, as of 12/2015: (event, eventKey)
  //     var path = p1 && p1.target && p1.target.pathname;
  //     this.handleTransition(p2, path);
  //   }
  // },
  // handleTransition: function(key, path) {
  //   console.log(`To: ${path} (${key})`);
  //   this.setState({activeItem: key});
  //   this.props.history.pushState(null, path);
  // },

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
