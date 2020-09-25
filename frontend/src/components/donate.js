import React, { Component } from 'react';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBBtn, MDBInput} from 'mdbreact';
import { connect } from "react-redux";
import "../App.css"
import Navbar from "./nav";
import EcoIcon from '@material-ui/icons/Eco';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

const mapStateToProps = ({ session }) => ({
    session: session
  });


class Donate extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDonation = this.onChangeDonation.bind(this);

        this.state = ({total_emissions:0, daily_emissions:0, amountDonated:0, donation:0})
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/nutrition/' + this.props.session.username)
        .then(res => {
            var total_emissions = 0;
            for (var x in res.data) {
                total_emissions += res.data[x].nutrients.emissions;
            }
            this.setState({total_emissions:total_emissions});
        })

        axios.get('http://localhost:5000/api/nutrition/today/' + this.props.session.username)
        .then(res => {
            var daily_emissions = 0;
            for (var x in res.data) {
                daily_emissions += res.data[x].nutrients.emissions;
            }
            this.setState({daily_emissions:daily_emissions});
        })

        axios.get('http://localhost:5000/api/donation/' + this.props.session.username)
            .then(res => {
                this.setState({amountDonated:res.data[0].amountDonated})
            })
    }

    onChangeDonation(e) {
        this.setState({donation:e.target.value})
    }

    onSubmit(e) {
        let newAmount = Number(this.state.donation) + Number(this.state.amountDonated)
        
        this.setState({amountDonated:newAmount})

    

        const donation = {
            amountDonated: newAmount
        }

        axios.post('http://localhost:5000/api/donation/update/' + this.props.session.username, donation)
            .then(res => console.log(res.data));
        
            window.location = '/donation';
        
    }

    render() {
        let num_trees = Math.floor((Number(this.state.amountDonated))/1) 

        var imgs = [];

        for (var x=0; x < num_trees; x++) {
            imgs.push(<img src="https://i.imgur.com/AVIteIC.png" alt="tree" style={{width:"5rem"}}></img>)
        }
        return(
            <div className="container">
            <Navbar/>

            <div className="row">
                <MDBCol>
                    <MDBCard style={{ width: "35rem", marginBottom: "1rem"}}>
                    <MDBCardBody>
                        <div>
                            <MDBCardTitle><b>Your GHG Emission Data</b></MDBCardTitle>
                        </div>
                        <MDBCardText>
                            <BubbleChartIcon/> GHG Emissions Today: {(this.state.daily_emissions).toFixed(2)} kg <br></br>
                            <CloudQueueIcon/> Total Emissions: {(this.state.total_emissions).toFixed(2)} kg <br></br>   
                            <AttachMoneyIcon/>Every tree planted offsets 136 kg of GHG emissions. To offset your GHG emissions, simply donate <b>${(((this.state.total_emissions)/136)*1).toFixed(2)}</b>. <br></br>
                        </MDBCardText>
                        <MDBCardImage src="https://i.imgur.com/qiUJlMt.png" style={{width:"26.5rem"}}></MDBCardImage>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol>
                    <MDBCard style={{ width: "32.5rem", marginBottom: "1rem"}}>
                        <MDBCardBody>
                        <div>
                            <MDBCardTitle><b>Donate</b></MDBCardTitle>
    
                        </div>
                            <MDBCardTitle></MDBCardTitle>
                            <MDBCardText>
                            For every 1$ donated, another tree is planted in the world. 
                            As you donate, you will also see your own forest of virtual trees slowly grow! 
                            </MDBCardText>
                            <form onSubmit={this.onSubmit}>
                            <MDBInput
                                label="Enter donation amount"
                                icon="dollar-sign"
                                group
                                type="Number"
                                validate
                                required
                                name="name"
                                value={this.state.donation}
                                onChange={this.onChangeDonation}
                            />
                            <div className="text-center">
                                <MDBBtn color="green" type="submit" className="text-center">
                                    Donate
                                </MDBBtn>
                            </div>
                            </form>
                            <MDBCardText style={{marginTop:"2rem"}}><EcoIcon/>You have donated <b>${this.state.amountDonated} in total, </b> and planted a forest of {num_trees} trees.</MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </div>
                <div className="row">
                    {imgs}
                </div>
            </div>
        ) 
    }
}

export default connect(
    mapStateToProps
  )(Donate)
