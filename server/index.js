const express = require('express');
const Validator = require('express-validator');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'employeesystem',
});


app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query("INSERT INTO employees(name,age,country,position,wage)VALUES(?,?,?,?,?)", [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("data entered");
            }
        }

    );

});



app.post("/userRegistration", (req, res) => {
    const companyName = req.body.companyName;
    const companyLogo = req.body.companyLogo;
    const numberofStaff = req.body.numberofStaff;
    const companyAddress = req.body.companyAddress;
    const businessEmail = req.body.businessEmail;
    const modeofBusiness = req.body.modeofBusiness;
    const businessPhone = req.body.businessPhone;
    const password = req.body.password;

    db.query("INSERT INTO users_registration (CompanyName, CompanyLogo, NumberofStaff, Company_Address, Business_Email,Mode_of_Business,BusinessPhoneNo, password)VALUES( ? , ? , ? , ? , ? , ? , ?, ? )", [companyName, companyLogo, numberofStaff, companyAddress, businessEmail, modeofBusiness, businessPhone, password],
        (err, result) => {
            if (err) {
                res.status(400).json({
                    message: "Error in Connection",
                    post: result
                })
            } else {
                res.status(201).json({
                    message: "Data Entered Successfully",
                    post: result
                })
            }
        });
});


app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
})

app.get("/login", (req, res) => {
    const Business_Email = req.body.Business_Email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users_registration WHERE Business_Email= ? AND password= ?",
         [Business_Email, password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result.data);
            } else {
                res.send(result);
                res.send({ message: "wrong Username and Passsword" });
            }

        }
    );
});

app.listen(3001, () => {
    console.log("Opps! Server is Runnung");
})