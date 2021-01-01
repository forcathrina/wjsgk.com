import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Card>
        <CardBody>
          <CardTitle tag="h5">게시판 만들기</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">김승직</CardSubtitle>
          <CardText>설명을 써야 하는 공간</CardText>
          <Button href="https://github.com/forcathrina/wjsgk.com/releases" target="_blank">Github</Button>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default Home;