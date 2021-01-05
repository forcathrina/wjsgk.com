import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

//import axios from 'axios';


class TextEdit extends Component {

  emptyuser = {
    username: '',
    usertext: '',
    usertitle: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyuser,
      selectedFile: null,
      editid: 0,
      isLoading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
  }



  async componentDidMount() {
    this.setState({ isLoading: true })

    if (this.props.match.params.id !== 'new') {
      const user = await (await fetch(`/api/datum/${this.props.match.params.id}`)).json();
      this.setState({ item: user });
    }

    let editid = await (await fetch(`/api/editid`)).json();

    console.log(editid,'editid const')

    this.setState({editid: editid})

    console.log(this.state.editid,'editid state')


    this.setState({ isLoading: false })

  }



  /*
    async componentDidMount() {
      if (this.props.match.params.id !== 'new') {
        const user = await (await fetch(`/api/datum/${this.props.match.params.id}`)).json();
        this.setState({ item: user });
      }
  
      this.setState({ isLoading: false });
      await fetch('api/data')
        .then(response => response.json())
        .then(data => this.setState({ users: data, isLoading: false }));
    }
  */

  //STRING
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item1 = { ...this.state.item };
    item1[name] = value;
    //this.setState({ item });
    //this.setState({item})
    //console.log(this.state.selectedFile)
    this.setState(state => ({
      item: item1
    }))

  }

  handleFileInput(event) {
    //this.state.selectedFile  = event.target.files[0]

    console.log(event.target.files[0], 'target')


    this.setState({selectedFile: event.target.files[0]})

    console.log(event.target.files, 'target list')
    console.log(this.state.selectedFile, 'fileinput')
    

  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    const formData = new FormData();
    console.log(this.state.selectedFile, 'handlesubmit')
    if (this.state.selectedFile !== null) {
      console.log(this.state.selectedFile, 'selectedfile')

      formData.append('userfile', this.state.selectedFile, this.state.editid);
    }

    await fetch('/api/upload', {
      method: 'POST',

      body: formData

    }).then(
      success => console.log(success, 'success') // Handle the success response object
    ).catch(
      error => console.log(error, 'er') // Handle the error response object
    )


    await fetch('/api/datum', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
      redirect: 'follow'
      

    }).then(() => this.props.history.push('/data')).catch(error => {
      console.log(error)
    })


  }

  //FILE




  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const { item } = this.state;
    let title = <h2>{item.id ? '글 수정하기' : '새 글 쓰기'}</h2>;

    return <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <FormGroup>
            <Label for="username">아이디</Label>
            <Input type="text" name="username" id="username" value={item.username || ''}
              onChange={this.handleChange} autoComplete="username" />
          </FormGroup>
          <FormGroup>
            <Label for="usertitle">제목</Label>
            <Input type="text" name="usertitle" id="usertitle" value={item.usertitle || ''}
              onChange={this.handleChange} autoComplete="usertitle" />
          </FormGroup>
          <FormGroup>
            <Label for="usertext">글</Label>
            <Input type="textarea" name="usertext" id="usertext" value={item.usertext || ''}
              onChange={this.handleChange} autoComplete="usertext" />
          </FormGroup>
          <FormGroup>
            <Label for="userfile">파일</Label>
            <Input type="file" name="userfile" id="userfile"
              onChange={this.handleFileInput} />
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