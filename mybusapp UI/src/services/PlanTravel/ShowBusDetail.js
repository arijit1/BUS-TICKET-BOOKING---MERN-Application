import React from 'react';
import '../CSS/busdetail.css';
import busDetail from '../JSON/busDetails.json';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class ShowBusDetail extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        let start = props.Journey_detail[0].Boarding_City;
        let stop = props.Journey_detail[0].Drop_City;
        let date = props.Journey_detail[0].JourneyDate;
        this.state = {
            CustomerStart: start,
            CustomerStop: stop,
            CustomerDate: date,
            AvailableBuses: []
        }
    }
    componentDidMount() {
        this.showBus();
    }
    showBus = () => {
        let allBusDetail = [];
        busDetail.map((v) => {
            if (this.state.CustomerStart === v.from && this.state.CustomerStop === v.to && this.state.CustomerDate === v.date) {
                allBusDetail.push(v);
            }
            return allBusDetail;
        });
        this.setState({ AvailableBuses: allBusDetail });
    }
    gotoSeat = (id) => {
        let data = [];
        busDetail.map((v) => {
            if (v.routeId === id) {
                data.push(v);
            }
        });
        this.props.Store_Bus_Detail(data)
        this.props.history.push("bus-seats");
    }

    render() {
        return (<> {this.state.CustomerStart === this.state.CustomerStop ?
            <span className="Source-Destination-Same errorNoload">Source and Destination Cannot be same</span> :
            ((this.state.AvailableBuses.length === 0 ? <span className="No-Bus_Found errorNoload">No Bus Found</span>
                :
                <div className="bus-detail-content">
                    <table className="table bus-table">
                        <thead>
                            <tr>
                                <th scope="col">BusName</th>
                                <th scope="col">Route</th>
                                <th scope="col">Departure Time</th>
                                <th scope="col">Arrival Time</th>
                                <th scope="col">Date</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.AvailableBuses.map((v) => {
                                return (
                                    <tr key={v.routeId} id={v.routeId}>
                                        <td>{v.carrierName}</td>
                                        <td>{v.route}</td>
                                        <td>{v.departure}</td>
                                        <td>{v.Arrival}</td>
                                        <td>{v.date}</td>
                                        <td>{v.fare}</td>
                                        <td><button className="btn btn-success" onClick={() => this.gotoSeat(v.routeId)}>view seat</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
            )}
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
        Store_Bus_Detail: (data) => dispatch({ type: 'BUSDETAIL', value: data })
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowBusDetail));