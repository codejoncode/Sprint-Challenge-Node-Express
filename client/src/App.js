import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import "./App.css";
import ProjectList from "./components/ProjectList";
import ProjectActions from "./components/ProjectActions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects = () => {
    const promise = axios.get("http://localhost:9000/api/projects");
    promise
      .then(response => {
        this.setState({ projects: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <ProjectList projects={this.state.projects} />}
        />
        <Route
          path="/:id"
          component={ProjectActions} />
        
      </div>
    );
  }
}

export default App;
