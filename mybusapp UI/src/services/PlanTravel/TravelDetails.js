import React from 'react';
import { ShowBusDetail } from './plan_travel_index';
import '../CSS/traveldetail.css';
import city_list from '../JSON/listofCity.json';
import { connect } from 'react-redux';


class TravelDetail extends React.Component {
    constructor(props) {
        super(props);
        let todayDate, TodayDate, dd, mm, yy;
        todayDate = new Date();
        dd = todayDate.getDate();
        mm = todayDate.getMonth() + 1;
        yy = todayDate.getFullYear();
        TodayDate = yy + "-" + 0 + mm + "-" + dd;
        this.state = {
            city: city_list,
            state_city: [],
            currentDate: TodayDate,
            JourneyDetail: {
                Boarding_City: "",
                Drop_City: "",
                JourneyDate: "",
            },
            showBus: false
        }
    }

    showBus_Detail = () => {
        if (this.state.JourneyDetail.Boarding_City === "" ||
            this.state.JourneyDetail.Drop_City === "" || this.state.JourneyDetail.JourneyDate === "") {
            alert("Enter Details...")
        } else {
            this.props.Store_Travel_Detail(this.state.JourneyDetail);
            //dispatch(StoreTravelDetail("storing travel detail"));
            this.setState({ showBus: true });
        }
    }

    componentDidMount() {
        this.loadCityFromJson();
    }
    loadCityFromJson = () => {
        let holdState = [];
        this.state.city.CITY.map((val) => holdState.push(val));
        this.setState({ state_city: holdState });

    }
    handleState = () => {
        let SourceCity = document.getElementById("Source-city").value;
        let Destination_City = document.getElementById("Destination-city").value;
        let DateOfJourney = document.getElementById("DateOfJourney").value;
        let CurrentJourneyDetail = [{
            Boarding_City: SourceCity,
            Drop_City: Destination_City,
            JourneyDate: DateOfJourney
        }]
        this.setState({ JourneyDetail: CurrentJourneyDetail, showBus: false });
    }
    swapCity = () => {
        let SourceCity = document.getElementById("Source-city").value;
        let Destination_City = document.getElementById("Destination-city").value;
        document.getElementById("Source-city").value = Destination_City;
        document.getElementById("Destination-city").value = SourceCity;
        this.setState({ showBus: false });
        this.handleState();
    }
    render() {
        return (<>
            <div className="travel-detail-portion-contents">
                <div className="row">
                    <div className="col-auto">
                        <select className="form-control" id="Source-city" onChange={this.handleState}>
                            <option value="#" >Select Source City</option>
                            {this.state.state_city.map((val) => <option key={val} value={val}>{val}</option>)}
                        </select>
                    </div>
                    <button className="reverseDestination" onClick={this.swapCity}><span>&#8592;&#8594;</span></button>
                    <div className="col-auto">
                        <select className="form-control" id="Destination-city" onChange={this.handleState}>
                            <option value="#" >Select Destination City</option>
                            {this.state.state_city.map((val) => <option key={val} value={val}>{val}</option>)}
                        </select>
                    </div>
                    <div className="col-auto">
                        <input id="DateOfJourney" className="form-control" type="date" onChange={this.handleState} min={this.state.currentDate} />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary" onClick={this.showBus_Detail}>Search Buses</button>
                    </div>
                </div>
                <hr />
            </div>
            {this.state.showBus ? <ShowBusDetail Journey_detail={this.state.JourneyDetail} /> : null}
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
    return {
        Store_Travel_Detail: (data) => dispatch({ type: 'TRAVELDETAIL', value: data })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TravelDetail);