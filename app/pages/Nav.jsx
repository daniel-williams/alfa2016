import React from 'react';
import {Location} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

require('./Nav.less');


export default React.createClass({
  getInitialState: function() {
    return {
      expanded: false,
    };
  },
  render: function() {
    let inArt = this.props.location.pathname.indexOf('/art/') >= 0 ? 'active' : '';
    let inBlog = this.props.location.pathname.indexOf('/blog/') >= 0 ? 'active' : '';

    return (
      <Navbar expanded={this.state.expanded} onToggle={this.onToggle}>
        <Navbar.Header>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onClick={this.onClick}>
            <LinkContainer to="/about">
              <NavItem eventKey={1}>About</NavItem>
            </LinkContainer>
            <NavDropdown eventKey={2} title="Artwork" id='artwork-ddl' className={inArt}>
              <LinkContainer to="/art/plein-air">
                <MenuItem eventKey={2.1}>Plein Air</MenuItem>
              </LinkContainer>
              <LinkContainer to="/art/portraits-and-figures">
                <MenuItem eventKey={2.2}>Portraits &amp; Figures</MenuItem>
              </LinkContainer>
              <LinkContainer to="/art/stills-from-life">
                <MenuItem eventKey={2.3}>Stills from Life</MenuItem>
              </LinkContainer>
              <LinkContainer to="/art/traditional">
                <MenuItem eventKey={2.4}>Traditional</MenuItem>
              </LinkContainer>
              <LinkContainer to="/art/archive">
                <MenuItem eventKey={2.5}>Archive</MenuItem>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/galleries-and-exhibitions">
              <NavItem eventKey={3}>Galleries &amp; Exhibits</NavItem>
            </LinkContainer>
            <LinkContainer to="/classes">
              <NavItem eventKey={4}>Classes</NavItem>
            </LinkContainer>
            <LinkContainer to="/blog" className={inBlog}>
              <NavItem eventKey={4}>Blog</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  },

  onClick: function(e) {
    var tgt = $(e.target).closest('li');
    if(!tgt.hasClass('dropdown')) {
      this.setState({ expanded: false });
    }
  },
  onToggle: function() {
    this.setState({ expanded: !this.state.expanded });
  },

});
