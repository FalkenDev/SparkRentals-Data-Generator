// Data Generator for users collection
var hat = require("hat");
const { MongoClient, ObjectId } = require("mongodb");
const mongoURI = process.env.DBURI || "mongodb://localhost:27017";

const users = {
  getScooter: async function (city) {
    let client3 = new MongoClient(mongoURI);
    try {
      let db = client3.db("spark-rentals");
      let scooters_collection = db.collection("scooters");
      let scooter = await scooters_collection.findOne({ owner: city });
      return [scooter._id.toString(), scooter.name];
    } catch (error) {
      console.log(error);
    } finally {
      await client3.close();
    }
  },

  createCryptPass: async function (password) {
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  createId: async function () {
    return hat();
  },

  generateUsers: async function () {
    async function createAUser() {
      const response = await fetch(`https://randomuser.me/api/`);
      return response.json();
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * max) + 1;
    }

    let pass1 = await users.createCryptPass("Benjamin1337");
    let pass2 = await users.createCryptPass("Kalle1337");
    let pass3 = await users.createCryptPass("Zelda1337");

    let scooterArray1 = await users.getScooter("Karlskrona");
    let scooterArray2 = await users.getScooter("Halmstad");
    let scooterArray3 = await users.getScooter("Stockholm");

    let user11 = {
      //_id will be added when pushed to db
      googleId: null,
      firstName: "Benjamin",
      lastName: "Sven",
      phoneNumber: "0701234567",
      email: "benjamin.sven@gmail.com",
      password: pass1,
      balance: 225.5,
      autoGen: true,
    };

    let user22 = {
      //_id will be added when pushed to db
      googleId: null,
      firstName: "Kalle",
      lastName: "Bertan",
      phoneNumber: "0702345678",
      email: "kalle.bertan@hotmail.se",
      password: pass2,
      balance: 145,
      autoGen: true,
    };

    let user33 = {
      //_id will be added when pushed to db
      googleId: null,
      firstName: "Zelda",
      lastName: "Samba",
      phoneNumber: "0703456789",
      email: "zelda.samba@gmail.com",
      password: pass3,
      balance: 765,
      autoGen: true,
    };

    let history1 = {
      _id: new ObjectId(),
      scooterName: scooterArray1[1],
      scooterID: scooterArray1[0],
      date: "4/09/2021",
      startPosition: { latitude: "50", longitude: "62" },
      endPosition: { latitude: "50", longitude: "62" },
      totalMin: 5,
      totalPrice: 20,
      distance: 20,
    };

    let history2 = {
      _id: new ObjectId(),
      scooterName: scooterArray2[1],
      scooterID: scooterArray2[0],
      date: "01/02/2022",
      startPosition: { latitude: "50", longitude: "62" },
      endPosition: { latitude: "50", longitude: "62" },
      totalMin: 25,
      totalPrice: 145,
      distance: 12,
    };

    let history3 = {
      _id: new ObjectId(),
      scooterName: scooterArray3[1],
      scooterID: scooterArray3[0],
      date: "22/09/2022",
      startPosition: { latitude: "50", longitude: "62" },
      endPosition: { latitude: "50", longitude: "62" },
      totalMin: 45,
      totalPrice: 225,
      distance: 16,
    };

    let client2 = new MongoClient(mongoURI);
    try {
      let db = client2.db("spark-rentals");
      let users_collection = db.collection("users");
      await users_collection.insertMany([user11, user22, user33]);

      let user1 = await users_collection.findOne({ firstName: "Benjamin" });
      let user1id = user1._id.toString();
      await users_collection.updateOne(
        { _id: ObjectId(user1id) },
        { $push: { history: history1 } }
      );

      let user2 = await users_collection.findOne({ firstName: "Kalle" });
      let user2id = user2._id.toString();
      await users_collection.updateMany(
        { _id: ObjectId(user2id) },
        { $push: { history: history2 } }
      );

      let user3 = await users_collection.findOne({ firstName: "Zelda" });
      let user3id = user3._id.toString();
      await users_collection.updateMany(
        { _id: ObjectId(user3id) },
        { $push: { history: history3 } }
      );
    } catch (e) {
      console.log(e);
    } finally {
      await client2.close();
    }

    let client = new MongoClient(mongoURI);
    try {
      let db = client.db("spark-rentals");
      let users_collection = db.collection("users");
      for (
        let userCreate = 0;
        userCreate < process.env.CREATE_USER;
        userCreate++
      ) {
        userData = await createAUser();
        let userField = {
          //_id will be added when pushed to db
          googleId: null,
          firstName: userData.results[0].name.first,
          lastName: userData.results[0].name.last,
          phoneNumber: userData.results[0].phone,
          email: userData.results[0].email,
          password: await users.createCryptPass(
            userData.results[0].login.password
          ),
          balance: getRandomInt(500),
          history: [
            {
              _id: new ObjectId(),
              scooterName: scooterArray1[1],
              scooterID: scooterArray1[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray3[1],
              scooterID: scooterArray3[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray3[1],
              scooterID: scooterArray3[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray1[1],
              scooterID: scooterArray1[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: 45,
              totalPrice: 225,
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
            {
              _id: new ObjectId(),
              scooterName: scooterArray2[1],
              scooterID: scooterArray2[0],
              date: `${getRandomInt(30)}/0${getRandomInt(9)}/2022`,
              startPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              endPosition: {
                latitude: getRandomInt(40),
                longitude: getRandomInt(50),
              },
              totalMin: getRandomInt(60),
              totalPrice: getRandomInt(300),
            },
          ],
          autoGen: true,
        };
        await users_collection.insertOne(userField);
      }
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
    console.log("-> User Generate DONE");
  },
};

module.exports = users;
