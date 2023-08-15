import axios from 'axios';
import React, { Component, useEffect } from 'react'
import {Link} from 'react-router-dom'

export default class Notes extends Component {

  constructor(props){
    super(props)
    this.state = {
      notes: []
    }
  }


  componentDidMount(){

    const id = this.props.match.params.id;
    
    const url = process.env.REACT_APP_BACKEND_URL;

    axios.get(url + "note/getnotesbycategory/" + id).then(Response => {
      this.setState({
        notes: Response.data
      })
    }).catch(error => {
      console.log('error: ', error);
    });
  }

  //prevprops ihtiyacım yoksa underline kullan. 
  //bu javascript 
  componentDidUpdate(prevProps,prevStates){

    const url = process.env.REACT_APP_BACKEND_URL;

    const id = this.props.match.params.id;
    const prevId = prevProps.match.params.id;
    
    if(id !== prevId){
      axios.get(url + "note/getnotesbycategory/" + id).then(Response => {
        this.setState({
          notes: Response.data
        })
      }).catch(error => {
        console.log('error: ', error);
      });
    }

  }

  render() {
    return (
      this.state.notes.map((element, index) => {
       return <Link key={index} to={`/Note/${element.id}`}>
          <p>{element.title}</p>
        </Link>

      })
    )
  }
}
