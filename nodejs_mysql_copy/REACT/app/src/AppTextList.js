import React, { Component } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Button, ButtonGroup, Container, Table, Row, Col } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, Redirect } from 'react-router-dom';

class TextList extends Component {

  constructor(props) {
    super(props);
    this.state = { users: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('api/data')
      .then(response => response.json())
      .then(data => this.setState({ users: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/datum/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    }).then(() => {
      let updatedusers = [...this.state.users].filter(i => i.id !== id);
      this.setState({ users: updatedusers });
      
    });
  }

  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
//<td style={{ whiteSpace: 'nowrap' }}>{user.username}</td> ?
    const userList = users.map(user => {
      return <tr key={user.id}>
        <td>{user.username}</td>
        <td>{user.usertext}</td>
        <td>
          <Button size="sm" color="primary" tag={Link} to={"/data/" + user.id}>수정</Button>   
          <Button className="ml-3" size="sm" color="danger" onClick={() => this.remove(user.id).then(window.location.reload())}>삭제</Button>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <Row className="mt-3">
            <Button className="ml-3" color="success" tag={Link} to="/data/new">새 글 쓰기</Button>
          </Row>
            <Table className="mt-4">
              <thead>
                <tr>
                  <th width="20%">아이디</th>
                  <th width="60%">글</th>
                  <th>수정</th>
                </tr>
              </thead>
              <tbody>
                {userList}
              </tbody>
            </Table>
        </Container>
      </div>
    );
  }
}

export default TextList;