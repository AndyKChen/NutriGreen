import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from "react-redux";
import '../App.css';
import { MDBCard, MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Navbar from "./nav";

const mapStateToProps = ({ session }) => ({
  session: session
});

const Nutrition = props => (
    <tr>
      <td style={{width:"10%"}}>{props.nutrition.date.substring(0,10)}</td>
      <td style={{width:"40%"}}>{props.nutrition.description}<br></br><img src={props.nutrition.photo} alt="food pic placeholder" width="35%"></img></td>
      <td style={{width:"20%"}}>
        <ul>
          <li>Calories: {(props.nutrition.nutrients.calories).toFixed(2)}</li>
          <li>Fat: {(props.nutrition.nutrients.fat).toFixed(2)}</li>
          <li>Sugar: {(props.nutrition.nutrients.sugar).toFixed(2)}</li>
          <li>Carbohydrates: {(props.nutrition.nutrients.carbs).toFixed(2)}</li>
          <li>Cholesterol: {(props.nutrition.nutrients.cholesterol).toFixed(2)}</li>
          <li>Protein: {(props.nutrition.nutrients.protein).toFixed(2)}</li>
        </ul>
      </td>
      <td style={{width:"20%"}}>{(props.nutrition.nutrients.emissions).toFixed(2)} kg of GHGs</td>
      <td style={{width:"10%"}}>
        <Link to={"/edit-log/"+props.nutrition._id}>edit</Link> | <a href="#" onClick={() => { props.deleteNutrition(props.nutrition._id) }}>delete</a>
      </td>
    </tr>
  )

  class NutritionList extends Component {
    
    constructor(props) {
      super(props);
  
      this.deleteNutrition = this.deleteNutrition.bind(this)
  
      this.state = {nutritions: []};
    }
  
    componentDidMount() {
      
      axios.get('http://localhost:5000/api/nutrition/' + this.props.session.username)
        .then(response => {
          console.log(response);
          this.setState({ nutritions: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    deleteNutrition(id) {
      axios.delete('http://localhost:5000/api/nutrition/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        nutritions: this.state.nutritions.filter(el => el._id !== id)
      })
    }
  
    NutritionList() {
      return this.state.nutritions.map(currentnutrition => {
        return <Nutrition nutrition={currentnutrition} deleteNutrition={this.deleteNutrition} key={currentnutrition._id}/>;
      })
    }
  
    render() {
      return (
        <div>
          <Navbar/>
        <MDBCard className="container">
        <div style={{marginTop:"1.5rem", marginBottom:"1rem"}}>
          <MDBCardTitle className="font-title"><b>Nutrition Logs</b></MDBCardTitle>
          <MDBTable className="font-body">
            <MDBTableHead color="green" textWhite >
              <tr>
                  <th >Date</th>
                  <th>Description</th>
                  <th>Nutrients</th>
                  <th>Emissions</th>
                  <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              { this.NutritionList() }
            </MDBTableBody>
          </MDBTable>
        </div>
        </MDBCard>
        </div>
      )
    }
  }
  
  export default connect(
    mapStateToProps
  )(NutritionList)