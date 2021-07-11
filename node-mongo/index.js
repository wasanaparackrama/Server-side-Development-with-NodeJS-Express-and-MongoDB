//mogo client connect to server
const MongoClient = require('mongodb').MongoClient;
//sset module
const assert = require('assert');

//connection to server port nmbr for mongodb
const url = 'mongodb://localhost:27017/';
//go to db
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    collection.insertOne({"name": "Uthappizza", "description": "test"},
    (err, result) => {
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);
        //search every thing in collection
        collection.find({}).toArray((err, docs) => {
            //callback function check to make sure error is ot null
            assert.equal(err,null);
            
            console.log("Found:\n");
            console.log(docs);
            //drop the specify clean up the db
            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);

                client.close();
            });
        });
    });

});