import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';

import { Link } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar color="dark" dark expand="md">
      
      <NavbarBrand tag={Link} to="/">게시판 홈</NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/data">게시판 보기</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/forcathrina/wjsgk.com/releases" target="_blank">GitHub</NavLink>
          </NavItem>
        </Nav>
        <Nav>
          <Button outline color="success" tag={Link} to="/data/new">새 글 쓰기</Button>   
        </Nav>
      </Collapse>
    </Navbar>;
  }
}