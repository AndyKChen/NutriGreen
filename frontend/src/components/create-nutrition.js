import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MDBCard, MDBCardTitle, MDBBtn } from 'mdbreact';
import { connect } from "react-redux";
import "../App.css"
import Navbar from "./nav";

const mapStateToProps = ({ session }) => ({
  session: session
});

// Nutrionix API
const YOUR_APP_ID   = 'abaabcb1'; // Your APP ID
const YOUR_API_KEY  = '1e06591a4219571251ca5b190b0a23c0'; // Your KEY


class CreateNutrition extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);

    this.state = {
      description: '',
      date: new Date(),
      selectedFile: null
    }
  }

  fileSelectedHandler(e) {
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const nutritionix = require("nutritionix-api");
    nutritionix.init(YOUR_APP_ID,YOUR_API_KEY);

    nutritionix.natural.search(this.state.description).then(result => {
          
      var calories, fat, sugar, carbs, cholesterol, protein;

      calories = fat = sugar = carbs = cholesterol = protein = 0;

      for (var x in result.foods) {
          calories += result.foods[x].nf_calories
          fat += result.foods[x].nf_total_fat
          sugar += result.foods[x].nf_sugars
          carbs += result.foods[x].nf_total_carbohydrate
          cholesterol += result.foods[x].nf_cholesterol
          protein += result.foods[x].nf_protein
      }

      const data = new FormData();

      data.append('calories', calories)
      data.append('fat', fat)
      data.append('sugar', sugar)
      data.append('carbs', carbs)
      data.append('cholesterol', cholesterol)
      data.append('protein', protein)
      data.append('date', this.state.date)
      data.append('description', this.state.description)
      data.append('foodImage', this.state.selectedFile)
      data.append('username', this.props.session.username)

      console.log(data);

      axios.post('http://localhost:5000/api/nutrition/add', data)
        .then(res => console.log(res))
        .catch((err) => console.log(err));
          
      setTimeout(() => { window.location = '/nutrition-logs'}, 1500);

      
    }).catch((err) => {
      console.log(err)
    });
  }

  render() {
    return (
      <div>
      <Navbar/>
      <MDBCard className="container">
      <div style={{marginTop:"1.5rem", marginBottom:"1rem"}}>
        <MDBCardTitle><b>Create New Nutrition Log</b></MDBCardTitle>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Upload food image!</label><br></br>
            <input type="file" onChange={this.fileSelectedHandler} name="foodImage"/>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
          <MDBBtn color="green" type="submit" className="text-center">
                Create Nutrition Log
            </MDBBtn>
          </div>
        </form>
      </div>
    </MDBCard>
    </div>
    )
  }
}

export default connect(
  mapStateToProps
)(CreateNutrition)