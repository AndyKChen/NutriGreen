import React from "react";
import { connect } from "react-redux";
import { signup } from "../actions/session";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, 
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const mapStateToProps = ({ errors }) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user))
});

const Signup = ({ errors, signup }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      name: e.target[0].value,
      username: e.target[1].value,
      password: e.target[2].value,
      age: e.target[3].value,
      weight: e.target[4].value,
      height: e.target[5].value,
      gender: e.target[6].value
    };
    
    signup(user);
  };

 
  const bg = {backgroundColor: '#29a329'}

  return (
    <div>
    <MDBNavbar style={bg} dark expand="md" scrolling fixed="top">
      <MDBNavbarBrand href="/signup">
          <strong>NutriGreen</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler />
      <MDBCollapse navbar>
        <MDBNavbarNav right>
          <MDBNavItem >
              <MDBNavLink to="login">Login</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active>
              <MDBNavLink to="signup">Signup</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>

    <MDBContainer className="mt-5">     
    <form onSubmit={handleSubmit}>
    
    <MDBRow>
        <MDBCol md="6">
        <MDBCard>
            <MDBCardBody>
                <p className="h4 text-center py-4 mt-2">Account Info</p>
                <div className="grey-text">
                <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    required
                    name="name"
                />
                <MDBInput
                    label="Your username"
                    icon="id-badge"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    required
                    name="username"
                />
                <MDBInput
                    label="Your Password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    required
                    name="password"
                />
                </div>
                
                </MDBCardBody>
        </MDBCard>
        </MDBCol>
        <MDBCol md="6">
        <MDBCard>
            <MDBCardBody>
                <p className="h4 text-center py-4 mt-2">About You</p>
                <div className="grey-text">
                <MDBInput
                    label="Your Age"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    required
                    name="age"
                />
                <MDBInput
                    label="Your Weight (kg)"
                    icon="weight"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    required
                    name="weight"
                />
                <MDBInput
                    label="Your Height (cm)"
                    icon="ruler-vertical"
                    group
                    type="text"
                    validate
                    required
                    name="height"
                />
                <MDBInput
                    label="Your Gender"
                    icon="venus-mars"
                    group
                    type="text"
                    validate
                    required
                    name="gender"
                />
                </div>
                
                </MDBCardBody>
            </MDBCard>
            </MDBCol>   
    </MDBRow>
   
    <div className="text-center py-4 mt-3">
    <MDBBtn color="green" type="submit" className="text-center">
        Register
    </MDBBtn>
    </div>
    </form>
    </MDBContainer>
    </div>
)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);