import React from 'react'; 
import styled from 'styled-components'
import {Link} from 'react-router-dom'
const ProjectDiv = styled.div`
  width: 500px;
  height: 200px;
  background: blue; 
  color: white; 
`;

class ProjectList extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    console.log(this.props.projects)
    return (
      <div>
        {this.props.projects.map(project => <Link
        key = {project.id}
        to = {{
          pathname: `/${Number(project.id)}`,
          state: {id: project.id}
        }}
        
        ><ProjectDiv key = {project.id}>
          <h2>Project Name: {project.name}</h2>
          <h5>Description: {project.description}</h5>
          <h6>Completed : {project.completed ? project.completed : "completion not none"}</h6>
        </ProjectDiv> </Link>)}
      </div>
    )
  }
}

export default ProjectList; 