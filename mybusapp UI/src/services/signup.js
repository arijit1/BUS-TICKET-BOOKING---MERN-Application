import React from 'react';
import './CSS/signup.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitButton: true,
            nameError: true,
            emailError: true,
            passwordError: true,
            contactError: false,
            userData: [{
            }]
        }
    }

    validateEmail = (e) => {
        let C_email = document.registration.useremail.value;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (C_email !== "") {
            if (!C_email.match(mailformat)) {
                this.setState({ emailError: true });
                document.getElementById("EmailErrorMsg").innerHTML = "Enter Valid Email";
            } else {
                document.getElementById("EmailErrorMsg").innerHTML = "";
                this.setState({ emailError: false });
            }
        } else {
            this.setState({ emailError: true });
            document.getElementById("EmailErrorMsg").innerHTML = "Enter Email Please";
        }
    }

    confirmPassword = (e) => {
        let status = false;
        let C_password = document.registration.userpwd.value;
        let C_confirmPassword = document.registration.cnfrmuserpwd.value;
        if (C_password.length < 8) {
            status = false;
            this.setState({ passwordError: true });
            document.getElementById("passwordErrorMsg").innerHTML = "Max Length Should be 8";
        }
        else {
            status = true;
            this.setState({ passwordError: false });
            document.getElementById("passwordErrorMsg").innerHTML = "";
        }

        if (C_password.length === 0) {
            this.setState({ passwordError: true });
            document.getElementById("passwordErrorMsg").innerHTML = "Enter Password";
        }

        if (status === true) {
            if (C_confirmPassword !== C_password && C_password !== "") {
                this.setState({ passwordError: true });
                document.getElementById("ConfirmpasswordErrorMsg").innerHTML = "Wrong Password";
            }
            else {
                this.setState({ passwordError: false });
                document.getElementById("ConfirmpasswordErrorMsg").innerHTML = "";
            }
        }
    }
    validatePassword = (e) => {
        let C_password = document.registration.userpwd.value;
        if (C_password.length < 8) {
            this.setState({ passwordError: true });
            document.getElementById("passwordErrorMsg").innerHTML = "Max Length Should be 8";
        }
        else {
            this.setState({ passwordError: false });
            document.getElementById("passwordErrorMsg").innerHTML = "";
        }
        if (C_password.length === 0) {
            this.setState({ passwordError: true });
            document.getElementById("passwordErrorMsg").innerHTML = "Enter Password";
        }
        this.confirmPassword();
    }
    digits_count = (n) => {
        var count = 0;
        if (n >= 1) ++count;

        while (n / 10 >= 1) {
            n /= 10;
            ++count;
        }
        return count;
    }
    getContactNumber = () => {
        let contactNumber = document.getElementById("userContact").value;

        var num = parseInt(contactNumber);
        var count = this.digits_count(num);
        //console.log(count);
        if (count === 10) { return contactNumber; }
        else { return 0; }
    }
    validateNumber = (e) => {
        let C_number = document.registration.userContact.value;
        var contactNumber = isNaN(Number(C_number));
        if (!contactNumber) {
            this.setState({ contactError: false });
            document.getElementById("ContactNumberErrorMsg").innerHTML = "";
        } else {
            this.setState({ contactError: true });
            document.getElementById("ContactNumberErrorMsg").innerHTML = "Enter Valid Number";
        }
    }

    Namevalidation = (e) => {
        let C_name = document.registration.userName.value;
        if (C_name === "") {
            this.setState({ nameError: true });
            document.getElementById("NameErrorMsg").innerHTML = "Enter Name";
        } else {
            this.setState({ nameError: false });
            document.getElementById("NameErrorMsg").innerHTML = "";
        }
    }
    checkAllValid = (e) => {
        let C_gender = document.registration.gender.value;
        let C_name = document.registration.userName.value;
        let C_password = document.registration.userpwd.value;
        let C_email = document.registration.useremail.value;

        var userDetail = [];
        if (this.state.emailError === false && this.state.nameError === false
            && this.state.passwordError === false && this.state.contactError === false
            && (C_gender === "male" || C_gender === "female")) {
            let C_number = this.getContactNumber();
            if (C_number !== 0) {
                userDetail.push({
                    customer_name: C_name,
                    customer_email: C_email,
                    customer_password: C_password,
                    customer_gender: C_gender,
                    customer_contact: C_number
                })
                this.setState({ userData: userDetail, submitButton: false });


            } else {
                this.setState({ submitButton: true });
            }

        } else {
            this.setState({ submitButton: true });
        }
    }
    sendData = () => {
        console.log(this.state);
        let user = this.state.userData;
        axios.post('http://localhost:9000/requestAuthentication/signup', user).then(res => {
            console.log(res);
            this.props.history.push('/login');
        }).catch(error => {
            console.log(error.message);
        })
    }

    render() {

        return (<>
            <div className="form-layout">
                <form className="form-horizontal" name="registration" onChange={this.checkAllValid}>
                    <div className="form-group">
                        <label htmlFor="userName">Name:</label>
                        <input type="text" className="form-control" id="userName" onChange={this.Namevalidation} placeholder="Enter Name" name="userName" required />
                        <span id="NameErrorMsg"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="useremail">Email Address:</label>
                        <input type="email" className="form-control" id="useremail" onChange={this.validateEmail} placeholder="Enter Email" name="useremail" required />
                        <span id="EmailErrorMsg"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userpwd">Password:</label>
                        <input type="password" className="form-control" id="userpwd" onChange={this.validatePassword} placeholder="Enter password" name="userpwd" required />
                        <span id="passwordErrorMsg"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userpwd">Confirm Password:</label>
                        <input type="password" className="form-control" id="confirmuserpwd" onChange={this.confirmPassword} placeholder="Re Enter password" name="cnfrmuserpwd" required />
                        <span id="ConfirmpasswordErrorMsg"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userContact">Contact Number:</label>
                        <input type="text" className="form-control" id="userContact" minLength={10} onChange={this.validateNumber} maxLength={10} placeholder="Enter Number" name="userContact" required />
                        <span id="ContactNumberErrorMsg"></span>
                    </div>
                    <div className="form-group">
                        <input type="radio" id="male" name="gender" value="male"
                            defaultChecked />
                        <label htmlFor="male">Male</label>
                        <input type="radio" id="female" name="gender" value="female"
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                </form>
                <button onClick={this.sendData} type="submit" id="register_button" disabled={this.state.submitButton} className="btn btn-success">Submit</button>
            </div>
        </>)
    }
}
export default withRouter(Signup);