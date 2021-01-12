
/* 
import React, { Component } from 'react'


export default ({ name, message }) =>
  <p>
    <strong>{name}</strong> <em>{message}</em>
  </p>
*/

//import { checkPropTypes } from 'prop-types'
//import { func } from 'prop-types';
import './ChatBox.css'

function encode(input) {
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



function ChatMessage(props) {


  //console.log(props.file)

  //var bytes = new Uint8Array(props.file);
  //console.log(props.file)
  
  let imageBuffer = (props.file === undefined) ? '' : 'data:image/png;base64,' + encode(props.file);
  

  //console.log(props.myname, props.name)
  

  if (props.myname === props.name) {
    //console.log(props.file)
    
    if (imageBuffer === '') {
      return (
        <div className="message-box-holder">       
          <div className='message-box my-message-sender'>
            {props.message}<br></br>
          </div>
        </div>
      )
    }

    else {
      return (
        <div className="message-box-holder">       
          <div className='message-box my-message-sender'>
            <img src={imageBuffer} className="message-box-image" alt='upload error' />
            <br></br>
            {props.message}
          </div>
        </div>
      )

    }

  }
  else {
    if (imageBuffer === '') {
      return (

        <div className="message-box-holder">
          <div className='message-sender'>
            {props.name}
          </div>
          <div className='message-box message-partner'>
            {props.message}

          </div>
        </div>

      )


    }
    else {
      return (

        <div className="message-box-holder">
          <div className='message-sender'>
            {props.name}
          </div>
          <div className='message-box message-partner'>
            <img src={imageBuffer} className="message-box-image" alt='upload error' />
            <br></br>
            {props.message}
          </div>
        </div>
  
      )

    }


  }




}


export default ChatMessage