import React from 'react';
import '../CSS/reset.css';
import '../CSS/seat.css';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class SelectSeat extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        let seatingmaps = [], busName, availableseats, Source, costPerSeat, Destination,
            Date, arrivalTime, departureTime, busType, routeID, bookedSeat = [];
        props.ctr.counter_bus.map((v) => {
            v.map((val) => {
                for (var i = 1; i <= val.totalSeats; i++) {
                    seatingmaps.push(i);
                }
                busName = val.carrierName;
                bookedSeat = [...val.bookedSeats];
                routeID = val.routeId;
                Date = val.date;
                Source = val.from;
                Destination = val.to;
                busType = val.BusType;
                arrivalTime = val.Arrival;
                departureTime = val.departure;
                costPerSeat = val.fare;
                availableseats = val.availableSeat;
            })
        });
        let full_bus_detail = props.ctr.counter_bus;
        let BusSeatingMaps = [... new Set(seatingmaps)];
        this.state = {
            booked_seat: bookedSeat,
            seat_map: BusSeatingMaps,
            allSeats: [],
            selectedSeat: [],
            busInfo: full_bus_detail,
            CarrierName: busName,
            fare: costPerSeat,
            availableSeat: availableseats,
            routeId: routeID,
            busType: busType,
            source: Source,
            destination: Destination,
            departure: departureTime,
            arrival: arrivalTime,
            dateOJ: Date,
            enableMakePayment: false,
            travellerDetail: [],
            calculatedPrice: 0,
            loginStatus: this.props.ctr.counter_IS_LOGGED,

        };

    }
    componentDidMount() {
        this.allreadyBooked();
    }
    allreadyBooked = () => {
        if (this.props.ctr.counter_IS_LOGGED) {
            this.state.booked_seat.map((v) => {
                document.getElementById(v).className = "Booked";
            });
        }
    }

    makePayment = () => {
        var passengerData = [];
        var seat_status = true;
        if (this.state.selectedSeat.length === 0) {
            console.log("no seat selected");
            passengerData = [];
            document.getElementById("NoPayProceed").innerHTML = "Please Select Seat";
        } else {

            this.state.selectedSeat.map((v) => {
                console.log(v);
                var name = "-";
                var age = "-";
                var gender = "-";
                var totalPrice = "-";
                name = document.getElementById("passengerSeat" + v).value;
                age = document.getElementById("age-seat" + v).value;
                gender = "";
                if (document.querySelector('input[name="gender' + v + '"]:checked') === null) {
                    gender = "-";
                } else {
                    gender = document.querySelector('input[name="gender' + v + '"]:checked').value;
                }
                totalPrice = this.state.calculatedPrice;
                if (name === "") {
                    seat_status = false;
                    console.log("no name");
                    document.getElementById("NoPayProceed").innerHTML = "Enter Name";
                } else if (age < 1) {
                    seat_status = false;
                    console.log("no age");
                    document.getElementById("NoPayProceed").innerHTML = "Enter Valid Age";
                } else if (gender === "-") {
                    seat_status = false;
                    console.log("no gender");
                    document.getElementById("NoPayProceed").innerHTML = "select Gender";
                } else {

                    var passengerDetail = {
                        name, age, totalPrice, gender,seat:v,
                        seats: this.state.selectedSeat, routeId: this.state.routeID,
                        doj:this.state.dateOJ
                    };
                    passengerData.push(passengerDetail);
                    document.getElementById("NoPayProceed").innerHTML = "";

                }
            })
            if (seat_status === true) {
                this.props.Store_Seat_Detail(passengerData);
                this.props.history.push("/payment");
            }

        }
    }
    handleSeatSelection = (event) => {
        let addedSeat = [];
        if (event.target.className === "Booked") {

        } else {
            if (event.target.className === "selected") {
                event.target.className = "disable";
                this.removePassengerSeat(event.target.id);
                this.setState({ calculatedPrice: Number(this.state.calculatedPrice) - Number(this.state.fare) });
            } else {
                event.target.className = "selected";
                document.getElementById("NoPayProceed").innerHTML = "";
                this.passengerDetail(event.target.id);
                this.setState({ calculatedPrice: Number(this.state.calculatedPrice) + Number(this.state.fare) });
            }
            var value = document.getElementsByClassName("selected");
            for (var i = 0; i < value.length; i++) {
                addedSeat.push(value[i].outerText);
            }
            if (addedSeat.length === 0) {
                document.getElementById("AddedSeat").innerHTML = "Please Select Seats";
            } else {
                addedSeat.sort();
                document.getElementById("AddedSeat").innerHTML = addedSeat.join(",");
            }
            this.setState({ selectedSeat: addedSeat });
        }
    }

    removePassengerSeat = (id) => {
        var passengerName = document.getElementById("passengerSeat" + id);
        var passengerAge = document.getElementById("age-seat" + id);

        var passenger_male = document.getElementById("male" + id);
        var passenger_female = document.getElementById("female" + id);
        // console.log(passenger_female,passenger_male);
        var seatLabel = document.getElementById("seatLabel" + id);

        var maleLabel = document.getElementById("lmale" + id);
        var femaleLabel = document.getElementById("lfemale" + id);
        var linebreak = document.getElementById("linebreak" + id);
        var nameLabel = document.getElementById("LName" + id);
        var ageLabel = document.getElementById("Lage" + id);
        var breakLine = document.getElementById("br" + id);
        passengerName.remove();
        passengerAge.remove();
        passenger_male.remove();
        passenger_female.remove();
        seatLabel.remove();
        maleLabel.remove();
        femaleLabel.remove();
        linebreak.remove();
        nameLabel.remove();
        ageLabel.remove();
        breakLine.remove();
    }

    passengerDetail = (id) => {
        var element = document.getElementById("passenger-detail");
        var input_name = document.createElement("input");
        var input_age = document.createElement("input");

        var input_gender_male = document.createElement("input");
        var input_gender_female = document.createElement("input");

        var line_break = document.createElement("hr");
        line_break.id = "linebreak" + id;

        var seat_label = document.createElement("label");
        var gender_male_label = document.createElement("label");
        var gender_female_label = document.createElement("label");
        var Age_label = document.createElement("label");
        var Name_label = document.createElement("label");
        var br = document.createElement("br");
        br.id = "br" + id;

        seat_label.id = "seatLabel" + id;
        seat_label.setAttribute("htmlFor", id);
        seat_label.innerHTML = "Seat No-  " + id;

        Age_label.id = "Lage" + id;
        Age_label.setAttribute("htmlFor", "age-seat" + id);
        Age_label.innerHTML = "Age";

        Name_label.id = "LName" + id;
        Name_label.setAttribute("htmlFor", "passengerSeat" + id);
        Name_label.innerHTML = "Name";

        input_name.placeholder = "Name ";
        input_name.name = "PassengerName";
        input_name.id = "passengerSeat" + id;
        input_name.type = "text";
        input_name.className = "details-ForSelected-seats";
        input_name.value = "";
        input_name.placeholder = "Name ";


        input_age.className = "details-ForSelected-seats";
        //input_age.placeholder = "Age ";
        input_age.type = "number";
        input_age.id = "age-seat" + id;
        input_age.value = 0;

        gender_male_label.id = "lmale" + id;
        gender_male_label.setAttribute("htmlFor", "male" + id);
        gender_male_label.innerHTML = "Male";

        input_gender_male.type = "radio";
        input_gender_male.id = "male" + id;
        input_gender_male.value = "male";
        input_gender_male.name = "gender" + id;


        gender_female_label.id = "lfemale" + id;
        gender_female_label.setAttribute("htmlFor", "female" + id);
        gender_female_label.innerHTML = "female";

        input_gender_female.type = "radio";
        input_gender_female.id = "female" + id;
        input_gender_female.value = "female";
        input_gender_female.name = "gender" + id;


        element.appendChild(seat_label);
        element.appendChild(br);
        element.appendChild(br);
        element.appendChild(Name_label);
        element.appendChild(input_name);
        element.appendChild(Age_label);
        element.appendChild(input_age);
        element.appendChild(gender_male_label);
        element.appendChild(input_gender_male);
        element.appendChild(gender_female_label);
        element.appendChild(input_gender_female);
        element.appendChild(line_break);
    }
    render() {
        return (
            <> {(!this.props.ctr.counter_IS_LOGGED) ? <span className="errorNoload">Please Login To Select Seats</span> :
                (this.state.seat_map.length === 0 ? <span className="errorNoload">Please First Select BUS</span> :

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="seat-layout" >
                                    <span id="NoBus"></span>
                                    {
                                        (this.state.seat_map.length === 0 ?
                                            document.getElementsByClassName("seat-layout").innerHTML = "Please Select Bus First" :
                                            <div className="seat">
                                                <ul id="seat" >
                                                    {
                                                        this.state.seat_map.map((v) => {
                                                            return (<li className="disable" key={v} value={v} id={v} onClick={this.handleSeatSelection}>{v}</li>)
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                            <div className="col-lg-6">
                                <table>
                                    <thead>
                                        <tr>
                                            <th><ul><li id="available-Seat"></li></ul></th>
                                            <th>Available</th>
                                            <th><ul><li id="Selected-Seat"></li></ul></th>
                                            <th>Selected Seat</th>
                                            <th><ul><li id="Booked-Seat"></li></ul></th>
                                            <th>Booked Seat</th>
                                        </tr>
                                    </thead>
                                </table>
                                <hr />
                                <div className="back-ground">
                                    <div className="booking-summary">
                                        <span className="From-City">{this.state.source}</span>
                                        <span className="to">To</span>
                                        <span className="To-City">{this.state.destination}</span>
                                    </div>

                                    <div className="row-row-display-booking-summary">
                                        <div className="column" >
                                            <h2>Date</h2>
                                        </div>
                                        <div className="column" >
                                            <h2>{this.state.dateOJ}</h2>
                                        </div>
                                    </div>
                                    <div className="row-row-display-booking-summary">
                                        <div className="column" >
                                            <h2>Bus Name</h2>
                                        </div>
                                        <div className="column" >
                                            <h2>{this.state.CarrierName}</h2>
                                        </div>
                                    </div>
                                    <div className="row-row-display-booking-summary">
                                        <div className="column" >
                                            <h2>Fare </h2>
                                        </div>
                                        <div className="column" >
                                            <h2>{this.state.calculatedPrice}</h2>
                                        </div>
                                    </div>
                                    <div className="row-row-display-booking-summary">
                                        <div className="column" >
                                            <h2>Seats</h2>
                                        </div>
                                        <div className="column" >
                                            <span id="AddedSeat">Please Select Seats</span>
                                        </div>
                                    </div>
                                    <div className="row-row-display-booking-summary">
                                        <div className="column" >
                                            <div id="passenger-detail"></div>
                                        </div>
                                        <div className="column" >
                                        </div>
                                    </div>
                                    <button onClick={this.makePayment}
                                        className="btn btn-danger" disabled={this.state.enableMakePayment} >Make Payment</button>
                                    <span id="NoPayProceed"></span>
                                </div>
                            </div>
                        </div>
                    </div>
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
        Store_Seat_Detail: (data) => dispatch({ type: 'SEATDETAIL', value: data })
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectSeat));