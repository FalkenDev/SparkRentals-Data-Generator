// Data generator for admins collection
const { MongoClient, ObjectId } = require("mongodb");
const mongoURI = process.env.DBURI || "mongodb://localhost:27017";

const admins = {
  createCryptPass: async function (password) {
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  generateAdmins: async function () {
    let pass1 = await admins.createCryptPass("admin");
    let pass2 = await admins.createCryptPass("admin");

    let admin1 = {
      firstName: "Sparkrentals",
      lastName: "Admin",
      email: "admin@sparkrentals.software",
      password: pass1,
    };

    let admin2 = {
      firstName: "Sparkrentals",
      lastName: "SparkBot",
      email: "spark-bot@sparkrentals.software",
      password: pass2,
    };

    let client = new MongoClient(mongoURI);
    try {
      let db = client.db("spark-rentals");
      let admins_collection = db.collection("admins");
      await admins_collection.insertMany([admin1, admin2]);
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }

    console.log("-> Admins Generate DONE");
  },
};

module.exports = admins;
