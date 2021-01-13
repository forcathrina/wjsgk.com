import React, { Component } from 'react'

import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

import AppNavbar from './AppNavbar';

import './ChatBox.css'
import { Container, Card,  } from 'reactstrap'

const URL = 'ws://15.165.72.25:3030'

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '익명' + Math.floor(Math.random()*100),
      messages: [],
    }
    
    this.addMessage = this.addMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.sendFile = this.sendFile.bind(this)

    this.dragOverHandler = this.dragOverHandler.bind(this)
    this.dropHandler = this.dropHandler.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  ws = new WebSocket(URL, 'echo-protocol')
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  componentDidMount() {
    this.scrollToBottom();
    this.ws.binaryType = "arraybuffer"

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('연결')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages

      //console.log('수신 message.data: ' + evt.data);

      if (evt.data instanceof ArrayBuffer) {
        console.log('수신 데이터 타입: ArrayBuffer');
        //const arrayBuffer = evt.data
        console.log('openfile')
        //this.openfile(arrayBuffer)

      } else {
        console.log('수신 데이터 타입: message');
        //console.log(evt)
        const message = JSON.parse(evt.data)
        //console.log(evt, 'evt')
        //console.log('addmessage')
        this.addMessage(message)

      }

    }

  }
  
  componentWillUnmount() {
    this.ws.onclose = () => {
      console.log('연결끊김')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }


  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: messageString.name, message: messageString.message }

    this.setState(state => ({ name: message.name }))

    this.ws.send(JSON.stringify(message))
    //this.ws.send(message)
    //console.log(this.ws)
    this.addMessage(message)
    console.log(message)
  }

  /*
  
    openfile = arrayBuffer => {
      console.log(arrayBuffer)
      
      var bytes = new Uint8Array(arrayBuffer);
  
      var image = document.getElementById('image');
      image.src = 'data:image/png;base64,'+ this.encode(bytes);
  
    }
  
  
    encode = input => {
      var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
  
      while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here
  
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
  
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
          keyStr.charAt(enc3) + keyStr.charAt(enc4);
      }
      return output;
    }
  */

  sendFile = e => {

    //let file = document.getElementById('filename').files[0];
    let file = e

    if (file === undefined) {
      alert('파일없음')
      return;

    }
    //const message = { name: name, message: file.name, filedata: file }
    //this.ws.send(JSON.stringify(message))
    //this.addMessage(message)

    //console.log(JSON.stringify(message))
    //console.log(this.ws)
    //console.log(message)
    //console.log('aaa')

    //ws.send('filename:' + file.name);


    let reader = new FileReader();
    let rawData = new ArrayBuffer();

    reader.loadend = () => {
      console.log('reader.loadend')
    }

    reader.onload = (e) => {
      //rawData = e.target.result;
      //ws.send(rawData);
      //console.log(rawData)

      rawData = Array.from(new Uint8Array(e.target.result))

      const message = { name: this.state.name, message: file.name, filedata: rawData }
      this.ws.send(JSON.stringify(message))
      //console.log(JSON.stringify(message))
      this.addMessage(message)


      console.log('파일전송')
    }

    reader.readAsArrayBuffer(file);

  }


  dropHandler = ev => {
    //console.log('dropHandler');
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          //console.log('... file[' + i + '].name = ' + file.name);
          //console.log('haha')
          this.sendFile(file)
          //console.log(file)
          

        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var j = 0; j < ev.dataTransfer.files.length; j++) {
        console.log('... file[' + j + '].name = ' + ev.dataTransfer.files[j].name);
      }
    }
  }

  dragOverHandler = ev => {
    //console.log('dragOverHandler');
    ev.preventDefault();
  }

  /*
          <input type="file" id="filename" />
          <input type="button" value="Upload" onClick={this.sendFile} />
  
          <div id="drop_zone" onDrop={this.dropHandler} onDragOver={this.dragOverHandler}>
            <p>Drag one or more files to this Drop Zone ...</p>
          </div>
  */

  render() {
    return (
      <div>
        <AppNavbar/>

        <Container>
          
          <Card className='cardsize'>
          
            <div className="chatbox" onDrop={this.dropHandler} onDragOver={this.dragOverHandler}>
            
              

              <div className="chat-messages">
                {this.state.messages.slice(0).reverse().map((message, index) =>
                  <ChatMessage
                    key={index}
                    message={message.message}
                    name={message.name}
                    myname={this.state.name}
                    file={message.filedata}
                  />

                )}
                <div style={{ float: "left", clear: "both" }}
                  ref={(el) => { this.messagesEnd = el; }}>
                </div>

              </div>


            </div>

            <ChatInput
              //ws={this.ws}
              //??
              onSubmitMessage={messageString => this.submitMessage(messageString)}
            />

          </Card>


        </Container>








      </div>

    )
  }
}

export default Chat