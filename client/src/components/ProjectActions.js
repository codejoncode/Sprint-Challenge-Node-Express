import React from 'react'; 
import axios from 'axios';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom'; 
import styled from 'styled-components';



class ProjectActions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      actions : []
    }

  }
  componentWillMount () {
    this.fetchActions(this.props.location.state.id)
  }
  
  fetchActions = id => {
    const promise = axios.get(`http://localhost:9000/api/projects/${id}`);
    promise
      .then(response => {
        this.setState({actions: response.data, loaded: true})
      })
      .catch(error => {
        console.log(error)
      })
  }

  render(){
    console.log(this.props)
    console.log(this.state)
    if (this.state.loaded === true){
      const {name, actions, description,completed} = this.state.actions
      return (
        <div>
          <h1> Name: {name}</h1>
          <h5>Description: {description}</h5>
          <h6>Completed: {completed ? completed : "completion unknown"}</h6>
          {actions.map(action => {
            return (
              <div key = {action.id}>
                <h2>Name : {action.name}</h2>
                <h4>Description: {action.description}</h4>
                <h5>Notes: {action.notes}</h5>
                <h6>Completed : {completed ? completed : "completion unknown"}</h6>
              </div>
            )
          })}
        </div>
      )
    }
    return(
      <div> Laoding Project</div>
    )
  }
}

export default withRouter(ProjectActions)
