import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import '../App.css';
import { MDBCard, MDBCardTitle, MDBBtn} from 'mdbreact';
import Navbar from "./nav"
import AvTimerOutlinedIcon from '@material-ui/icons/AvTimerOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import AccessibilityNewOutlinedIcon from '@material-ui/icons/AccessibilityNewOutlined';
import WcOutlinedIcon from '@material-ui/icons/WcOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import FilterDramaOutlinedIcon from '@material-ui/icons/FilterDramaOutlined';


const mapStateToProps = ({ session }) => ({
    session: session
  });

class Profile extends Component {
  constructor(props) {
    super(props);

    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeCalorieTarget = this.onChangeCalorieTarget.bind(this);
    this.onChangeGHGLimit = this.onChangeGHGLimit.bind(this);

    this.state = {
      age: '',
      height: '',
      weight: '',
      gender: '',
      calorie_target: '',
      ghg_limit: ''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:5000/api/users/' + this.props.session.username)
        .then(res => {
            this.setState({
                age: res.data.age,
                height: res.data.height,
                weight: res.data.weight,
                gender: res.data.gender,
                calorie_target: res.data.calorie_target,
                ghg_limit: res.data.ghg_limit
            })
        })
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    })
  }

  onChangeWeight(e) {
    this.setState({
      weight: e.target.value
    })
  }

  onChangeHeight(e) {
    this.setState({
      height: e.target.value
    })
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    })
  }

  onChangeCalorieTarget(e) {
    this.setState({
      calorie_target: e.target.value
    })
  }

  onChangeGHGLimit(e) {
    this.setState({
      ghg_limit: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      age: this.state.age,
      weight: this.state.weight,
      height: this.state.height,
      gender: this.state.gender,
      calorie_target: this.state.calorie_target,
      ghg_limit: this.state.ghg_limit
    }

    console.log(user);

    axios.post('http://localhost:5000/api/users/update/' + this.props.session.username, user)
      .then(res => console.log(res.data));

      window.location = '/profile';
  }

  render() {
    return (
      <div>
        <Navbar/>
      <MDBCard className="container">
      <div style={{marginTop:"1.5rem", marginBottom:"1rem"}}>
        <MDBCardTitle><b>Hi, {this.props.session.username}!</b></MDBCardTitle>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <PersonOutlineOutlinedIcon/><label>Age: </label>
            <input  type="Number"
                required
                className="form-control"
                value={this.state.age}
                onChange={this.onChangeAge}
                />
          </div>
          <div className="form-group"> 
            <AvTimerOutlinedIcon/><label>Weight (kg): </label>
            <input  type="Number"
                required
                className="form-control"
                value={this.state.weight}
                onChange={this.onChangeWeight}
                />
          </div>
          <div className="form-group"> 
          <AccessibilityNewOutlinedIcon/><label>Height (cm): </label>
          <input  type="Number"
              required
              className="form-control"
              value={this.state.height}
              onChange={this.onChangeHeight}
              />
        </div>
        <div className="form-group"> 
            <WcOutlinedIcon/><label>Gender: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.gender}
                onChange={this.onChangeGender}
                />
          </div>
          <div className="form-group"> 
            <FastfoodOutlinedIcon/><label>Daily Calorie Intake Target (kCal): </label>
            <input  type="Number"
                required
                className="form-control"
                value={this.state.calorie_target}
                onChange={this.onChangeCalorieTarget}
                />
          </div>
          <div className="form-group"> 
            <FilterDramaOutlinedIcon/><label>Daily GHG Emission Limit (kg): </label>
            <input  type="Number"
                required
                className="form-control"
                value={this.state.ghg_limit}
                onChange={this.onChangeGHGLimit}
                />
          </div>
          <div className="form-group">
            <MDBBtn color="green" type="submit" className="text-center">
                Update Profile
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
  )(Profile)