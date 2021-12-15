import React from 'react';
import { connect } from 'react-redux';
import '../CSS/confirmation.css';
import axios from 'axios';


class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        let arrivalTime, departureTime, from, to, route_ID, busType;
        this.props.ctr.counter_bus.map((val) => {
            val.map((v) => {
                arrivalTime = v.Arrival;
                departureTime = v.departure;
                from = v.from;
                to = v.to;
                route_ID = v.routeID;
                busType = v.BusType;
            })
        })
        var passengerData = [];
        let create = () => {
            for (var i = 0; i < this.props.ctr.counter_seat.length; i++) {
                this.props.ctr.counter_seat[i].map((v) => {

                    passengerData.push({
                        name: v.name,
                        age: v.age,
                        gender: v.gender,
                        seat: v.seat,
                        doj: v.doj
                    })
                })
            }
        }
        create();
        var d = new Date();
        var n = d.getTime();
        let referenceId = n + "XYZ";
        this.state = {
            arrivalTime, departureTime, from, to, route_ID,
            busType, passengerData, referenceId,
            confirmationData: {
                arrivalTime,
                departureTime, from, referenceId,
                to, route_ID, busType, passengerData
            }
        }
    }

    printTicket = () => {
        let user = this.state.confirmationData;
        axios.post('http://localhost:9000/requestAuthentication/confirmTicket', user).then(
            res => {
                console.log(res);
                if (res.data) {
                    document.getElementById("printPdfStatus").innerHTML = res.data.message;
                }
            }).catch(error => {
                document.getElementById("printPdfStatus").innerHTML = "";
                console.log(error.message);
            })
    }

    render() {
        return (<>
            {(!this.props.ctr.counter_IS_LOGGED) ?
                <span className="errorNoload">Please login To View This </span> :

                (this.props.ctr.counter_seat.length == 0) ?
                    <span className="errorNoload">Please Do the Payment</span> :
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-7">
                                <div className="booking">
                                    <div className="icon-container card-icon">
                                        <span className="booking-head">Booking Confirmation</span>
                                        <br />
                                    </div>
                                    <p className="email-message">All the details of your booking has been sent to your email</p>
                                    <div className="booking-details">
                                        <span className="reference-head">Your Booking ID</span>
                                        <span className="reference-id">{this.state.referenceId}</span>
                                        <div className="bus-detail-cnf">
                                            <p>Bus details from {this.state.from} : to {this.state.to}</p>
                                            <p>Departure Time : {this.state.departureTime}</p><p>Arrival Time : {this.state.arrivalTime}</p>
                                            <p>Date Of Travel :  {
                                                this.state.passengerData.map((v, index) => {
                                                    return (
                                                        <span key={index}>{v.doj}</span>)
                                                })
                                            }</p>
                                        </div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Age</th>
                                                    <th>Gender</th>
                                                    <th>Seat</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.passengerData.map((v, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{v.name}</td>
                                                                <td>{v.age}</td>
                                                                <td>{v.gender}</td>
                                                                <td>{v.seat}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <button onClick={this.printTicket} className="btn btn-primary">Successfully Printed</button>
                                    </div>
                                    <h2 id="printPdfStatus"></h2>
                                </div>
                            </div>
                            <div className="col-lg-3"></div>
                        </div>
                    </div>

            }

        </>)
    }
}
const mapStateToProps = state => {
    return {
        ctr: state,
    }
}

export default connect(mapStateToProps)(Confirmation);