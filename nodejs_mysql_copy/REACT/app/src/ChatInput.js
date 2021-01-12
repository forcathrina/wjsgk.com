import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Form, FormGroup, Input, } from 'reactstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }


  messageinfo = {
    message: '',
    name: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      message: this.messageinfo,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let message1 = { ...this.state.message };
    message1[name] = value;

    this.setState(state => ({
      message: message1
    }))

  }

  handleSubmit(e) {
    e.preventDefault()
    //console.log(this.state.message)
    this.props.onSubmitMessage(this.state.message)//내보내기

    /*
    let message1 = { ...this.state.message };
    message1['message'] = '';
    this.setState(state => ({
      message: message1
    }))
    */

    let event = {target : {value: '', name: 'message'}}
    this.handleChange(event)


  }

  handleEnter(e) {
    //console.log(e.key)
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      //console.log("Enter");
      this.handleSubmit(e);
      // callMyFunction();
    }
  }
  
  


  render() {

    const { message } = this.state;


    return <div >

      <Container>
        <Form onSubmit={this.handleSubmit}>

            <FormGroup>
              <Input
                type="text"
                name="name"
                id='name'
                placeholder={'아이디'}
                value={message.name}
                onChange={this.handleChange}
              />
            </FormGroup>
          

            <FormGroup>
              <Input
                type="textarea"
                name="message"
                placeholder={'메세지 (Enter -> 전송)\n사진은 채팅창에 끌어다 넣기'}
                value={message.message}
                onChange={this.handleChange}
                onKeyUp={this.handleEnter}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" value={'Send'}>전송</Button>
            </FormGroup>

        </Form>

      </Container>
    </div>





  }
}

export default ChatInput