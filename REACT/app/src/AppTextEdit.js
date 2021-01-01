import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class TextEdit extends Component {

  emptyuser = {
    username: '',
    usertext: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyuser
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const user = await (await fetch(`/api/datum/${this.props.match.params.id}`)).json();
      this.setState({item: user});
    }
  } 

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/datum', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/data');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? '글 수정하기' : '새 글 쓰기'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">아이디</Label>
            <Input type="text" name="username" id="username" value={item.username || ''}
                   onChange={this.handleChange} autoComplete="username"/>
          </FormGroup>
          <FormGroup>
            <Label for="usertext">글</Label>
            <Input type="textarea" name="usertext" id="usertext" value={item.usertext || ''}
                   onChange={this.handleChange} autoComplete="usertext"/>
             

          </FormGroup>
                    
          <FormGroup>
            <Button color="primary" type="submit">저장</Button>{' '}
            <Button color="secondary" tag={Link} to="/data">취소</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(TextEdit);