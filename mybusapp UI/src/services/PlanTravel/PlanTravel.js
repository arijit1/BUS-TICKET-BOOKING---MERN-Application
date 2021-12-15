import React from 'react';
import '../CSS/plantravel.css';
import { connect } from 'react-redux';
import { TravelDetail, Payment, Confirmation, SelectSeat } from './plan_travel_index';
import { BrowserRouter as Router, NavLink, Switch, Route, withRouter } from 'react-router-dom';

class PlanTravel extends React.Component {

    constructor(props) {
        super(props);
        let userName = this.props.ctr.counter_loggin.map((v) => v.customer_name);
        this.state = {
            LoginData: userName,
            loginStatus: this.props.ctr.counter_IS_LOGGED
        }
    }
    login = () => {
        this.props.history.push("/");
    }
    logout = () => {
        this.props.IS_Login(false);
        this.setState({ loginStatus: false });
        
    }
    render() {
        return (<>
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-light justify-content-end navbar-header">
                    <div className="nav-item dropdown MyAccount">


                        {this.state.loginStatus === false ? <a onClick={this.login}>LogIn/SignUp</a>
                            : <div>
                                <p className=" dropdown-toggle" id="navbardrop" data-toggle="dropdown">
                                    My Account</p>
                                <div className="dropdown-menu">
                                    <span>Hi! {this.state.loginStatus === false ? "Login" : this.state.LoginData}</span>
                                    <span><a className="dropdown-item" onClick={this.logout}>Logout</a></span>
                                </div>
                            </div>
                        }


                        

                        <div className="dropdown-menu">

                            <span>Hi! {this.state.loginStatus === false ? "Login" : this.state.LoginData}</span>
                            <span><a className="dropdown-item" onClick={this.logout}>Logout</a></span>
                        </div>

                    </div><p className="userName-Welcome">𝓑𝓤𝓢𝓼𝓔𝓡𝓥𝓘𝓒𝓔</p>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="plan-layout">
                                <Router>
                                    <nav className="navbar navbar-expand-lg navbar-dark primary-color">
                                        <NavLink to="/plantravel" className="nav-item NavLink btn">DETAILS</NavLink>
                                        <NavLink to="/bus-seats" className="nav-item NavLink btn">SEATS</NavLink>
                                        <NavLink to="/payment" className="nav-item NavLink btn">PAYMENT</NavLink>
                                        <NavLink to="/confirmation" className="nav-item NavLink btn">CONFIRMATION</NavLink>
                                    </nav>
                                    <hr />
                                    <Switch>

                                        <Route path="/plantravel" component={TravelDetail} exact />
                                        <Route path="/bus-seats" render={() => <SelectSeat />} />
                                        <Route path="/payment" render={() => <Payment />} />
                                        <Route path="/confirmation" render={() => <Confirmation />} />
                                    </Switch>
                                </Router>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        IS_Login: (data) => dispatch({ type: 'IS_LOGGEDIN', value: data })
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlanTravel));