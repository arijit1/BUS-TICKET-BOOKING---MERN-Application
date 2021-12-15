import React from 'react';
import './CSS/start.css';
import bus from '../images/Bus-Transparent.png';
import { connect } from 'react-redux';
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from 'react-router-dom';

import { Login, Signup } from './services_index';

class Start extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isLoggedIn: false
        }
    }
    
    handleLoginData = (status) => {
        this.setState({isLoggedIn: status});
    }
    render() {
        return (<>
            {(this.state.isLoggedIn ?<Redirect to="/plantravel"/> :

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                            <div className="start">
                                <div className="start-box">
                                    <img src={bus} alt="Bus" width="450px" height="400px" />
                                </div>
                                <Router>
                                    <div className="input-detail">
                                        <div className="form-head">
                                            <span>Already have an account? </span>
                                            <NavLink to="/login">LogIn.</NavLink>
                                            <span>or </span>
                                            <NavLink to="/"> Signup.</NavLink>
                                        </div>
                                        <Switch>
                                            <Route exact path="/" component={Signup} />
                                            <Route path="/login" render={() => 
                                            <Login onLoginStatusChange={this.handleLoginData} />} />
                                        </Switch>
                                    </div>
                                </Router>
                                <div className="col-sm-1"></div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>)
    }
}
const mapStateToProps = state => {
    return {
        ctr: state,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Store_Travel_Detail: (data) => dispatch({ type: 'TRAVELDETAIL', value: data })
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Start);