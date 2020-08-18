const puppeteer = require('puppeteer');

function printTicket(data) {
    console.log(data);
    var d = new Date();
    var n = d.getTime();
    var name = [];
    var age = [];
    var gender = [];
    var seat=[];
    (async function () {
        data.passengerData.map((v) => {
            name.push(v.name);
            age.push(v.age);
            gender.push(v.gender);
            seat.push(v.seat);
        })
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent(`
        <h1 style="background-color:skyblue"> BUS TRAVEL </h1>
       <p> <span>From:</span> ${data.from}  <span>to:</span> ${data.to}</p>
       <p>Bookin Id : ${data.referenceId}</p>
        <p>BusType: <span>${data.busType}</span></p> 
        <p>Departure Time: <span>${data.departureTime}</span></p>
        <p>Arrival Time: <span>${data.arrivalTime}</span></p>
        <p>Date Of Travel : ${
            data.passengerData.slice(0,1).map((key) => {return("<span>"+key.doj+"</span>")}) 
        }</p>
        <hr/>
        <p>Passenger Details</p>
        <table border="1">
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Seat</th>
                </tr>
                ${
                data.passengerData.map((key) => { //referenceId:
                    return ("<tr><td value='" + key + "'>" + key.name + "</td><td value='" + key + "'>" + key.age + "</td><td value='" + key + "'>" + key.gender + "</td><td value='" + key + "'>" + key.seat + "</td></tr>")
                })
                }
        </table>
        `);
            await page.emulateMedia('screen');
            await page.pdf({
                path: `./PDF/busApp ${n}.pdf`,
                format: 'A4',
                printBackground: true
            });
            console.log("done");
        } catch (e) {
            console.log('our error', e);
        }
    })();
}
module.exports = { printTicket };