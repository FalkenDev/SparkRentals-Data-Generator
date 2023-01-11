// Data Generator for Prepaid collection
var hat = require("hat");
const { MongoClient, ObjectId } = require("mongodb");
const mongoURI = process.env.DBURI || "mongodb://localhost:27017";

const prepaids = {
  generatePrepaids: async function () {
    let client = new MongoClient(mongoURI);
    try {
      let db = client.db("spark-rentals");
      let prepaid_collection = db.collection("prepaid");

      for (let i = 0; i < process.env.CREATE_PREPAID; i++) {
        let data = {
          code: hat(),
          totalUses: Math.floor(Math.random() * (500 - 200 + 1)) + 1,
          users: [],
          usesLeft: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
          amount: Math.floor(Math.random() * (500 - 10 + 1)) + 10,
        };
        await prepaid_collection.insertOne(data);
      }

      for (let i = 0; i < process.env.CREATE_SINGLE_PREPAID; i++) {
        let data = {
          code: hat(),
          totalUses: 1,
          users: [],
          usesLeft: 1,
          amount: Math.floor(Math.random() * (500 - 10 + 1)) + 10,
        };
        await prepaid_collection.insertOne(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
    console.log("-> Prepaid Generate DONE");
  },
};

module.exports = prepaids;
