import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import './App.css';
import { Col, Row, Container } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
//, CardBody Button, , Table,  
// ,

import AppNavbar from './AppNavbar';

//import EventsList from "./EventsList";
//import { eventsData } from "./data";

//import Card from "./Card";

function CardImage(props) {
  const isImageURL = props.image;
  let listOfClasses = null;

  if (props.effect) {
    listOfClasses = "styleImage bw";
  } else {
    listOfClasses = "styleImage";
  }

  if (isImageURL) {
    return (
      <div className={listOfClasses} onClick={props.onClick}>
        <img
          style={{ width: props.width + "px", marginTop: "-8%" }}
          src={props.image}
          alt="Seattle"
        />
      </div>
    );
  }
  return null;
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
    this.state = { users: [], isLoading: true };
    //this.remove = this.remove.bind(this);
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

    }).then(this.props.history.push('/data'));
  }



  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const eventsList = users.map((user, index) => {
      return (

        <div style={{ width: this.props.width + "px" }} key={index}>
          <div className="styleCard">
            <CardImage
              image={user.image}
              width={user.width}
              effect={user.bwEffect}
              onClick={user.toggleEffect}
            />

            <div className="styleCardContent">
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
