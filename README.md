# Data Generator for SparkRentals Project
## Content
- [About](#about)
- [Download](#download)
- [Usage](#usage)
- [License and Tools](#license-and-Tools)
## About
This project is created by 4 students who attend Blekinge Institute of Technology in web programming. We were given the task of creating a system for a scooter company where we would, among other things, create a mobile-adapted web app for the customer, administrative web interface, a simulation program for the electric scooters, an intelligence program in the bicycle and a Rest API that distributes and retrieves information from the entire system and stores the information on a database.

The entire project is available at: https://github.com/FalkenDev/V-Team-SparkRentals

### Background
The Data Generator will create so-called "dummy" data for the Spark-Rentals system to be able to test, visualize and simulate how the program works.

The client uses NodeJS where it communicates with MongoDB. The purpose of this data generator is to create predetermined data for the database in order to then make it easier to test, visualize and simulate the entire system.

## Download
### Required environment variables
***.env:***

    # Database, When using localy
    DBURI="mongodb://localhost:27017"

    # DUMMY DATA
    CREATE_USER=50
    CREATE_PREPAID=50
    CREATE_SINGLE_PREPAID=2

### Run it localy
- Fork the project / donwload the project.

>npm install

- Create .env file and insert the environment variables and change the inputs.

- Start the mongodb

>node autoGen.js

### Run it on Docker
***OPS! Don't forget to send your env file in docker run command***
> docker run -it falkendev/spark-rentals-data-generator:latest

## Usage
***Node Version: v18.12.0***
> node autoGen.js
## License and Tools
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

