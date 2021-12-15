import React from 'react';
import '../CSS/payment.css';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class Payment extends React.Component {
    constructor(props) {
        super(props);
        var amount;
        this.props.ctr.counter_seat.map((val) => {
            val.map((v) => { amount = v.totalPrice; })
        });
        this.state = {
            fare: amount,
            CardDetails: ""
        }
    }
    proceedToPay = () => {
        var cardNumber = document.getElementById("userCardNumber").value;
        var cardName = document.getElementById("usercardName").value;
        var expMonth = document.getElementById("expMonth").value;
        var exprYear = document.getElementById("expYear").value;
        var cvv = document.getElementById("userCvvName").value;
        console.log(cardName, cardNumber.length, exprYear, expMonth, cvv);
        if (cardName === "") {
            document.getElementById("carderrorName").innerHTML = "Enter Name";
        }
        else if (cardNumber === "" || cardNumber.length !== 16) {
            document.getElementById("carderrorNumber").innerHTML = "Enter 16 digit Card Number";
        }
        else if (expMonth === "MON") {
            document.getElementById("carderrorNumber").innerHTML = "";
            document.getElementById("carderrorYear").innerHTML = "Enter Expiry Month";
        } else if (exprYear === "YEAR") {
            document.getElementById("carderrorYear").innerHTML = "Enter Expiry Year";
        }
        else if (cvv === "") {
            document.getElementById("carderrorYear").innerHTML = "";
            document.getElementById("carderrorCVV").innerHTML = "Enter CVV";
        }
        else {
            document.getElementById("carderrorCVV").innerHTML = "";
            this.props.history.push("/confirmation");
        }
    }
    render() {
        return (<>
            {(!this.props.ctr.counter_IS_LOGGED) ? <span className="errorNoload">Please Login To Pay</span> :
                (this.props.ctr.counter_seat.length == 0) ? <span className="errorNoload">Please Select Seats</span> :
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-7">
                                <div className="payment">
                                    <div className="icon-container card-icon">
                                        <span className="total_Amount">Amount Payable</span>
                                        <span className="amount">Rs. {this.state.fare}.00</span>
                                        <br />
                                    </div>
                                    <div className="payment-details">

                                        <p>Name On Card</p><span className="carderror" id="carderrorName"></span>
                                        <div className="form-group">
                                            <input type="text" onMouseOver={this.focusStyle} className="form-control" id="usercardName" placeholder="Arijit Sengupta" name="userName" required />
                                        </div>
                                        <p>Card Number</p><span className="carderror" id="carderrorNumber"></span>
                                        <div className="form-group">
                                            <input type="number" className="form-control" id="userCardNumber" minLength={16} maxLength={16} placeholder="xxxx-xxxx-xxxx-xxxx" name="userName" required />
                                        </div>
                                        <p>Expiry Date</p><span className="carderror" id="carderrorYear"></span>
                                        <div className="form-group">
                                            <select id="expYear">
                                                <option >YEAR</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2023">2024</option>
                                                <option value="2023">2025</option>
                                                <option value="2023">2026</option>
                                                <option value="2023">2027</option>
                                                <option value="2023">2028</option>
                                            </select>
                                            <select id="expMonth">
                                                <option >MON</option>
                                                <option value="01">JAN</option>
                                                <option value="02">FEB</option>
                                                <option value="03">MAR</option>
                                                <option value="04">APR</option>
                                                <option value="05">MAY</option>
                                                <option value="06">JUN</option>
                                                <option value="07">JUL</option>
                                                <option value="08">AUG</option>
                                                <option value="09">SEP</option>
                                                <option value="10">OCT</option>
                                                <option value="11">NOV</option>
                                                <option value="12">DEC</option>
                                            </select>
                                        </div>
                                        <p>CVV</p> <span className="carderror" id="carderrorCVV"></span>
                                        <div className="form-group">
                                            <input type="password" className="form-control" id="userCvvName" placeholder="***" name="userName" minLength={3} maxLength={3} required />
                                        </div>
                                        <button onClick={this.proceedToPay}
                                            type="submit" className="btn btn-success">Proceed to Pay</button>

                                    </div>
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
export default withRouter(connect(mapStateToProps)(Payment));