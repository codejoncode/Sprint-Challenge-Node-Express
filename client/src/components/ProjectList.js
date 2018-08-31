import React from 'react'; 
import styled from 'styled-components'

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
        {this.props.projects.map(project => <ProjectDiv key = {project.id}>
          <h2>Project Name: {project.name}</h2>
          <h5>Description: {project.description}</h5>
          <h6>Completed : {project.completed ? project.completed : "completion not none"}</h6>
        </ProjectDiv>)}
      </div>
    )
  }
}

export default ProjectList; 