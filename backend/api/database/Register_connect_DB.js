const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'BUSappData';

function insertRegisterUserData(Data) {

  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected db");

    const db = client.db(dbName);
    
    db.collection('RegisteredUsers').insertOne(Data[0], function (err, r) {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);
      client.close();
    });
  });
}

function loginUserVerification (Data)  {
  
   MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to login server");

    const db = client.db(dbName);
    const col = db.collection('RegisteredUsers');
    console.log(Data);
    
    // col.findOne({$and:Data}).exec(function (err, doc) {

    //   if (doc) {
    //     console.log("---------------------------------------------");
    //     console.log("Valid Credential");
    //     console.log(doc);
    //     console.log("---------------------------------------------");
    //     client.close();
    //   }
    // });


    col.find(Data[0]).limit(1).each(function (err, doc) {

      if (doc) {
        console.log("---------------------------------------------");
        console.log("Valid Credential");
        console.log(doc);
        console.log("---------------------------------------------");
        client.close();
      }
    });
  });
}
function bookedBusData(Data) {

  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to db server");

    const db = client.db(dbName);
    db.collection('BookedBus').insertOne(Data[0], function (err, r) {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);
      client.close();
    });
  });
}
module.exports = { insertRegisterUserData, bookedBusData, loginUserVerification };