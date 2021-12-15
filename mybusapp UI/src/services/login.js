import React from 'react';
import axios from 'axios';
import './CSS/login.css';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor() {
        super();
        console.log(this.props);
        this.state = {
            email: "",
            password: "",
            isLoggedIn: false,
            validationMessage: "",

        }
    }
    handle = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleLogInChange = (status) => {
        this.props.onLoginStatusChange(status);            
    }
    sendData = () => {

        let user = [{
            customer_email: this.state.email,
            customer_password: this.state.password
        }];

        axios.post('http://localhost:9000/requestAuthentication/login', user).then(
            res => {
                console.log("responsee");
                console.log(res.data.isValid);
                if (res.data.isValid === true) {
                    this.props.Store_Login_Detail(res.data.message);
                    this.props.IS_Login(true);
                    this.setState({ isLoggedIn: true });
                    this.handleLogInChange(this.state.isLoggedIn);
                } else {
                    this.props.IS_Login(false);
                    document.getElementById("loginError").innerHTML = res.data.message;
                }
            }).catch(error => {
                console.log(error.message);
            })
    }
    render() {
        return (<>
            <div className="login-form">
                <div>
                    <div className="form-group">
                        <hr />
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" name="email" onChange={this.handle} placeholder="Enter email" id="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" onChange={this.handle} name="password" className="form-control" placeholder="Enter password" id="pwd" required />
                    </div>
                    <span id="loginError"></span>
                    <button type="submit" onClick={this.sendData} className="btn btn-success">Log In</button>
                </div>
            </div>
            }
        </>)
    }
}
//redux store handling
const mapStateToProps = state => {
    return {
        ctr: state,
    }
}
const mapDispatchToProps = dispatch => {
    console.log("dispatching");
    return {
        Store_Login_Detail: (data) => dispatch({ type: 'LOGIN', value: data }),
        IS_Login: (data) => dispatch({ type: 'IS_LOGGEDIN', value: data })
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));