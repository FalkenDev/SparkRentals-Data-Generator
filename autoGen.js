// Generating data to database for testing
require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoURI = process.env.DBURI || "mongodb://localhost:27017";

const scooters = require("./collections/scooter.js");
const cities = require("./collections/cities.js");
const users = require("./collections/user.js");
const admins = require("./collections/admins.js");
const prepaids = require("./collections/prepaid.js");

async function deleteDatabase() {
  let client = new MongoClient(mongoURI);
  try {
    let db = client.db("spark-rentals");
    await db.dropDatabase();
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
async function generate() {
  await scooters.generateScooters();
  await cities.generateCities();
  await users.generateUsers();
  await prepaids.generatePrepaids();
  await admins.generateAdmins();
}

deleteDatabase();
generate();
