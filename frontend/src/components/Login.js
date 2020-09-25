import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/session";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, 
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBCardImage } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const mapStateToProps = ({ errors }) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

const Login = ({ errors, login }) => {

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    login(user);
  }

  const bg = {backgroundColor: '#29a329'}

  return (
    <div>
    <MDBNavbar style={bg} dark expand="md" scrolling fixed="top">
      <MDBNavbarBrand href="/login">
          <strong>NutriGreen</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler />
      <MDBCollapse navbar>
        <MDBNavbarNav right>
          <MDBNavItem active>
              <MDBNavLink to="login">Login</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem >
              <MDBNavLink to="signup">Signup</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>

    <MDBContainer className="mt-5">
    <MDBRow>
        <MDBCol>
        <MDBCard>
        <MDBCardBody>
        <MDBCardImage className="img-fluid image" src="https://i.imgur.com/13ahL1G.gif" style={{width: "20rem", marginTop:"1rem"}}/>
        <form onSubmit={handleSubmit}>
            <p className="h3 text-center mb-4 mt-4">Sign in</p>
            <div className="grey-text">
            <MDBInput 
                label="Type your email or username" 
                icon="envelope" 
                group 
                type="text" 
                name="username"
                validate 
                error="wrong"
                success="right" 
                required
                />
            <MDBInput 
                label="Type your password" 
                icon="lock" 
                group 
                name="password"
                type="password" 
                validate 
                required
                />
            </div>
            <div className="text-center">
            <MDBBtn color="green" type='submit'>Login</MDBBtn>
            </div>
        </form>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
    </MDBRow>
    </MDBContainer>
    </div>
  );
  

 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);