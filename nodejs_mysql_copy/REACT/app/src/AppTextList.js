import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import './App.css';
import {  Row, Container } from 'reactstrap';
import { Link,  } from 'react-router-dom';
//, CardBody Button, , Table,  
// ,withRouterCol

import AppNavbar from './AppNavbar';

//import EventsList from "./EventsList";
//import { eventsData } from "./data";

//import Card from "./Card";

function CardImage(props) {

    return (
      <div className="styleImage">
        <img className="styleImageerror"
          src={props.image}
          alt='사진 ㄱㄱ'
          />
      </div>
    );

}

/*

function CardContent(props) {
  return (
    <div className="styleCardContent">
      <p className="styleCardName">{props.cardname}</p>
      <p className="styleCardTitle">{props.cardtitle}</p>
      <p className="styleCardText">{props.cardtext}</p>
    </div>
  );
}


function CardButton(props) {
  return (
    <div className="CardButton">
      <div className="multi-button">
        <Link to={"/data/" + props.cardid}>
          <button>Edit</button>
        </Link>
        <button onClick={() => this.remove(props.cardid)}>Delete</button>
      </div>
    </div>
  )
}
*/




class TextList extends Component {

  constructor(props) {
    super(props);
    this.state = { users: [], isLoading: true, imageURL: [] };
    this.remove = this.remove.bind(this);
  }


  async componentDidMount() {
    this.setState({ isLoading: true });

    await fetch('/api/data')
      .then(response => response.json())
      .then(data => this.setState({ users: data, isLoading: false }))

  }

  async remove(id) {


    await fetch(`/api/upload/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    }).then(
      success => console.log(success, 'success file') // Handle the success response object
    ).catch(
      error => console.log(error, 'er file') // Handle the error response object
    )




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

    }).then(this.props.history.push('/data'));
  }



  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const eventsList = users.map((user, index) => {

      return (

        <div style={{ width: '350px'}} key={index}>
          <div className="styleCard">
            <CardImage
              image={'https://openimageforcathrina.s3.ap-northeast-2.amazonaws.com/images/'+user.id}
              width={user.width}
            />


            <div className="styleCardContent">
              <p>{user.id}</p>
              <p className="styleCardName">{user.username}</p>
              <p className="styleCardTitle">{user.usertitle}</p>
              <p className="styleCardText">{user.usertext}</p>
            </div>


            <div className="CardButton">
              <div className="multi-button">
                <Link to={"/data/" + user.id}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => this.remove(user.id)}>Delete</button>
              </div>
            </div>
            
            <Row></Row>

          </div>
        </div>
      )
    })
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <Row>
            {eventsList}
          </Row>
        </Container>

      </div>
    )
  }
}

TextList.defaultProps = {
  width: 350,
  cardname: "Location label",
  cardtitle: "Template - Card Title",
  cardtext: "Template description textbox"
};

export default (TextList);
