import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

require('./Nav.less');

export default React.createClass({
  render: function() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/about">
              <NavItem eventKey={1}>About</NavItem>
            </LinkContainer>
            <NavDropdown eventKey={2} title="Artwork" id='artwork-ddl'>
              <LinkContainer to="/art/plein-air">
                <MenuItem eventKey={2.1}>Pein Air</MenuItem>
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
            <LinkContainer to="/exhibits">
              <NavItem eventKey={3}>Galleries &amp; Exhibits</NavItem>
            </LinkContainer>
            <LinkContainer to="/classes">
              <NavItem eventKey={4}>Classes</NavItem>
            </LinkContainer>
            <LinkContainer to="/blog">
              <NavItem eventKey={4}>Blog</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});
