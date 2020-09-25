import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from "react-redux";
import '../App.css';
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBBtn} from 'mdbreact';
import EcoIcon from '@material-ui/icons/Eco';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import EmojiFoodBeverageOutlinedIcon from '@material-ui/icons/EmojiFoodBeverageOutlined';
import Navbar from "./nav";

const moment = require('moment')
const today = moment().startOf('day')
const week_start = new Date(moment(today).startOf('week')).toString().substring(0, 15);

const mapStateToProps = ({ session }) => ({
    session: session
  });

let day1 = week_start;
let day2 = new Date(moment(week_start).add(1, 'days')).toString().substring(0, 15);
let day3 = new Date(moment(week_start).add(2, 'days')).toString().substring(0, 15);
let day4 = new Date(moment(week_start).add(3, 'days')).toString().substring(0, 15);
let day5 = new Date(moment(week_start).add(4, 'days')).toString().substring(0, 15);
let day6 = new Date(moment(week_start).add(5, 'days')).toString().substring(0, 15);
let day7 = new Date(moment(week_start).add(6, 'days')).toString().substring(0, 15);


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.onChangeGraph = this.onChangeGraph.bind(this);
    
        this.state = {daily_calories:0, daily_emissions:0, sun: 0, mon: 0, tues: 0, wed: 0, thurs: 0, fri: 0, sat: 0,
                    calorie_target: 2000, ghg_limit: 8.22, total_emissions: 0, 
                    graph:'ghg', graph_title:'', graph_legend:'', graph_desc:'', 
                    outline:'', fill:'', target: []};
      }

    componentDidMount() {

        console.log(day5);

        axios.get('http://localhost:5000/api/nutrition/' + this.props.session.username)
        .then(res => {
            var total_emissions = 0;
            for (var x in res.data) {
                total_emissions += res.data[x].nutrients.emissions;
            }
            this.setState({total_emissions:total_emissions});
        })

        axios.get('http://localhost:5000/api/users/' + this.props.session.username)
        .then(res => {
            this.setState({calorie_target:res.data.calorie_target, ghg_limit:res.data.ghg_limit})
        })
        
        axios.get('http://localhost:5000/api/nutrition/today/' + this.props.session.username)
        .then(res => {
            var daily_calories = 0;
            var daily_emissions = 0;
            for (var x in res.data) {
                daily_calories += res.data[x].nutrients.calories;
                daily_emissions += res.data[x].nutrients.emissions;
            }
            console.log(daily_calories);
            console.log(daily_emissions);
            this.setState({daily_calories:daily_calories, daily_emissions:daily_emissions});
        })

       this.onChangeGraph();
    }

    onChangeGraph(e) {

        var sun = 0;
        var mon = 0;
        var tues = 0;
        var wed = 0;
        var thurs = 0;
        var fri = 0;
        var sat = 0;

        if (this.state.graph === 'calories') {
            axios.get('http://localhost:5000/api/nutrition/weekly/' + this.props.session.username)
            .then(res => {
                for (var x in res.data) {
                    let date = new Date(res.data[x].date).toString().substring(0, 15);
                    console.log(date);
                    if (date === day1) {
                        sun += res.data[x].nutrients.emissions;
                    }
                    else if (date === day2) {
                        mon += res.data[x].nutrients.emissions;
                    }
                    else if (date === day3) {
                        tues += res.data[x].nutrients.emissions;
                    }
                    else if (date === day4) {
                        wed += res.data[x].nutrients.emissions;
                    }
                    else if (date === day5) {
                        thurs += res.data[x].nutrients.emissions;
                    }
                    else if (date === day6) {
                        fri += res.data[x].nutrients.emissions;
                    }
                    else if (date === day7) {
                        sat += res.data[x].nutrients.emissions;
                    }
                }

                let target = [this.state.ghg_limit, this.state.ghg_limit, this.state.ghg_limit, this.state.ghg_limit, this.state.ghg_limit, this.state.ghg_limit, this.state.ghg_limit]

                this.setState({sun: sun.toFixed(2), mon: mon.toFixed(2), tues: tues.toFixed(2), wed: wed.toFixed(2), thurs: thurs.toFixed(2), fri: fri.toFixed(2), sat: sat.toFixed(2), 
                    graph:'ghg', graph_title:'Weekly GHG Emissions', graph_legend:"GHG Emissions (kg)", graph_desc:"View your weekly GHG emissions for food per day and compare it to your set target.",
                    outline:'#006633', fill:'rgb(41, 163, 41, 0.4)', target:target});
            })
        }

        else if (this.state.graph === 'ghg') {
            axios.get('http://localhost:5000/api/nutrition/weekly/' + this.props.session.username)
            .then(res => {
                for (var x in res.data) {
                    let date = new Date(res.data[x].date).toString().substring(0, 15);
                    console.log(date);
                    if (date === day1) {
                        sun += res.data[x].nutrients.calories;
                    }
                    else if (date === day2) {
                        mon += res.data[x].nutrients.calories;
                    }
                    else if (date === day3) {
                        tues += res.data[x].nutrients.calories;
                    }
                    else if (date === day4) {
                        wed += res.data[x].nutrients.calories;
                    }
                    else if (date === day5) {
                        thurs += res.data[x].nutrients.calories;
                    }
                    else if (date === day6) {
                        fri += res.data[x].nutrients.calories;
                    }
                    else if (date === day7) {
                        sat += res.data[x].nutrients.calories;
                    }
                }

                let target = [this.state.calorie_target, this.state.calorie_target, this.state.calorie_target, this.state.calorie_target, this.state.calorie_target, this.state.calorie_target, this.state.calorie_target]
    
                this.setState({sun: sun.toFixed(2), mon: mon.toFixed(2), tues: tues.toFixed(2), wed: wed.toFixed(2), thurs: thurs.toFixed(2), fri: fri.toFixed(2), sat: sat.toFixed(2), 
                    graph:'calories', graph_title:'Weekly Caloric Intake', graph_legend:"Calories (kCal)", graph_desc:"View your weekly caloric intake per day and compare it to your set target.",
                    outline:'#36A2EB', fill:'rgb(128, 212, 255, 0.4)', target:target})
        })}
    }

    render() {
        const daily_calorie_data = {
            labels: [
                'Calories Remaining Until Target',
                'Daily Calorie Intake',    
            ],
            datasets: [{
                data: [(this.state.calorie_target - this.state.daily_calories).toFixed(2), (this.state.daily_calories).toFixed(2)],
                backgroundColor: [
                '#80d4ff',
                '#36A2EB',
                ],
                hoverBackgroundColor: [
                '#80d4ff',
                '#36A2EB',
                ]
            }]
        };

        const daily_emission_data = {
            labels: ['Emissions Today', 'Comparitive Average', 'Emission Limit'],
            datasets: [
              {
                label: 'Total GHG Emissions (kg)',
                backgroundColor: 'rgb(41, 163, 41, 0.4)',
                borderColor: '#006633',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(173, 235, 173, 0.4)',
                hoverBorderColor: '#006633',
                data: [(this.state.daily_emissions).toFixed(2), 8.22, this.state.ghg_limit,0]
              }
            ]
          };

        const weekly_data = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                label: this.state.graph_legend,
                fill: true,
                lineTension: 0.1,
                backgroundColor: this.state.fill,
                borderColor: this.state.outline,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: this.state.outline,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: this.state.fill,
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [this.state.sun, this.state.mon, this.state.tues, this.state.wed, this.state.thurs, this.state.fri, this.state.sat]
            },
            {
                label: 'Target/Limit',
                fill: false,
                borderColor: 'rgb(230, 0, 0, 0.4)',
                data: this.state.target
            }
        ]
        };
        
        return (
            <div>
                <Navbar/>
            <div className="container">
                <div className="row" style={{marginBottom: "2rem"}}>
                <MDBCol>
                    <MDBCard style={{ width: "69.5rem" }}>
                        <MDBCardBody>
                            <MDBCardTitle><b>Welcome to your dashboard, {this.props.session.username}!</b></MDBCardTitle>
                            <MDBCardText>
                                <EmojiFoodBeverageOutlinedIcon/> Calories Remaining Today: {(this.state.calorie_target - this.state.daily_calories).toFixed(2)} |
                                <EcoIcon/> GHG Emissions Today: {(this.state.daily_emissions).toFixed(2)} kg | 
                                <CloudQueueIcon/> Total Emissions: {(this.state.total_emissions).toFixed(2)} kg
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </div>
                <div className="row">
                <MDBCol>
                    <MDBCard style={{ width: "35rem" }}>
                    <MDBCardBody>
                        <div>
                            <MDBCardTitle>Daily Caloric Intake Data</MDBCardTitle>
                            <Doughnut data={daily_calorie_data} />
                        </div>
                        <MDBCardText>
                            Total calories consumed today compared to your daily target. 
                            Change your daily target on your <Link to="/profile">profile</Link>.
                            Default is set to recommended daily average.
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol>
                    <MDBCard style={{ width: "32.5rem" }}>
                        <MDBCardBody>
                        <div>
                            <MDBCardTitle>Daily GHG Emissions Data</MDBCardTitle>
                            <Bar
                            data={daily_emission_data}
                            />
                        </div>
                            <MDBCardTitle></MDBCardTitle>
                            <MDBCardText>Compare your daily green house gas emissions to the national average and your 
                                        limit. Set your daily limit in your <Link to="/profile">profile.</Link> 
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </div>
                <div className="row" style={{marginTop:"2rem"}}>
                <MDBCol>
                    <MDBCard style={{ width: "40rem"  }}>
                        <MDBCardBody>
                        <div>
                            <MDBCardTitle>{this.state.graph_title}</MDBCardTitle>
                            <Line
                            data={weekly_data}
                            />
                        </div>  
                            <MDBCardText>{this.state.graph_desc} Set your daily limit in your <Link to="/profile">profile.</Link> 
                            </MDBCardText>
                        </MDBCardBody>
                        <div className="row" style={{margin:"auto", marginBottom:"1rem"}}>
                            <MDBBtn color="dark-green" onClick={this.onChangeGraph}>Toggle Data</MDBBtn>
                        </div>
                    </MDBCard>    
                </MDBCol>
                <MDBCol>
                    <MDBCard style={{ width: "27.5rem"}}>
                            <MDBCardBody>
                                <MDBCardTitle>Tips to Reduce GHG Emissions</MDBCardTitle>
                                <MDBCardImage className="img-fluid image" src="https://i.imgur.com/i4rO9me.png" style={{width: "10rem"}}/>
                                <MDBCardText><b>Based on your eating habits and diet, here are some ways to decrease 
                                    your carbon footprint:</b>
                                    <ul>
                                        <li>Try plant based protein such as beans, tofu, nuts, and seeds</li>
                                        <li>Reduce consumption of meat and dairy.</li>
                                        <li>Stop wasting food! Food that’s thrown away decomposes in landfills and emits methane, a particularly potent greenhouse gas</li>
                                        <li>Don't consume excess calories.</li>
                                        <li>Buy local produce. Transportation of foods contribute heavily towards GHG emissions.</li>
                                    </ul>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                </MDBCol>
                </div>
            </div>   
            </div>
            
        );
      }
}

export default connect(
    mapStateToProps
  )(Dashboard)




