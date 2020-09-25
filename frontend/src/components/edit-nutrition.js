import React, { Component } from 'react';
import Navbar from "./nav"
import axios from 'axios';
import { MDBCard, MDBCardTitle } from 'mdbreact';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../App.css"

const YOUR_APP_ID   = 'abaabcb1'; // Your APP ID
const YOUR_API_KEY  = '1e06591a4219571251ca5b190b0a23c0'; // Your KEY


export default class EditNutrition extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: '',
      date: new Date(),
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/nutrition/'+this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({
          description: response.data.description,
          date: new Date()
        })   
      })
      .catch(function (error) {
        console.log(error);
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

        const nutrition = {
            'calories': calories,
            'fat': fat,
            'sugar': sugar,
            'carbs': carbs,
            'cholesterol': cholesterol,
            'protein': protein,
            'photo': result.foods[0].photo.thumb,
            'date': this.state.date,
            'description': this.state.description
        }

        axios.post('http://localhost:5000/api/nutrition/update/' + this.props.match.params.id, nutrition)
            .then(res => console.log(res.data));

        window.location = '/nutrition-logs';
    })
  }

  render() {
    return (
    <div>
      <Navbar/>
      <MDBCard className="container">
    <div style={{marginTop:"1.5rem", marginBottom:"1rem"}}>
      <MDBCardTitle><b>Edit Nutrition Log</b></MDBCardTitle>
      <form onSubmit={this.onSubmit}>
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
          <input type="submit" value="Edit Nutrition Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    </MDBCard>
    </div>
    )
  }
}