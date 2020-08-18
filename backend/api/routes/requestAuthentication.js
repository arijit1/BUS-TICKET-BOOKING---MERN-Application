var express = require('express');
var router = express.Router();
var { insertRegisterUserData } = require('../database/Register_connect_DB');
var { printTicket } = require('../routes/printPdf');


router.post('/login', (req, res) => {
    console.log(req.body);
    let db = req.app.locals.db; db.collection('RegisteredUsers').find().toArray((err, result) => {
        if (err) throw err;
        //console.log(result);
        var status = false;
        for (let dataSet of result) {
            if (dataSet.customer_email === req.body[0].customer_email) {
                if (dataSet.customer_password === req.body[0].customer_password) {
                    //console.log(dataSet);
                    status=true;
                    return res.status(200).send({ message: dataSet, isValid: true });
                }
                else {
                    status=false;
                    var message = dataSet.customer_name + " You Entered Incorrect Password ";
                    //return res.send({ message: message, isValid: false });
                    return res.send({ message: message, isValid: false })
                }
            } else {
            
                //  return res.send({ message: message, isValid: false });
 
            }
        }
        if(status === false){
            var message = " You Entered Incorrect Email ";
            return res.send({ message: message, isValid: false });
        }
    })
})

router.post('/signup', function (req, res) {
    insertRegisterUserData(req.body);
    res.send({ message: "Succesfully Registered" });
})

router.post('/confirmTicket', function (req, res) {
    //console.log(req.body);
    //bookedBusData(req.body);
    printTicket(req.body);
    res.send({ message: "Pdf Generated",pdfStatus:true });
})


module.exports = router;