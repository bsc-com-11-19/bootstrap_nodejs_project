const express = require('express')
const mysql = require('mysql')
var session = require('express-session');
var flash = require('express-flash');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(flash());
app.use(session({
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jexy@2021",
    database: "student",

})
const pool = mysql.createPool(connection);
connection.connect(function(error) {
    if (error) {
        console.log(error.stack)
    } else {
        console.log("succesful")
    }
})
app.get('/', (req, res) => {
    connection.query("select * from maneb", function(error, rows, fields) {
        if (error) {
            console.log(error.stack)
        } else {
            console.log("connected")
            console.log(rows)
        }
    })
})
app.get('/selection', (req, res) => {
    connection.query("select * from maneb", function(error, rows, fields) {
        if (error) {
            console.log("error in your query")
        } else {
            console.log("countries successfully retrieved")

        }
        res.json(rows)

    })
})
app.get('/selection/:id', (req, res) => {
    const country_id = req.params.id;

    connection.query('SELECT * FROM maneb WHERE id', country_id, (error, rows, fields) => {
        if (error) { console.log(error.stack) } else {
            console.log('succesful')
        }
        res.send(rows);
    });

});


app.post('/users', function(req, res, next) {

    var name = req.body.name;
    var primary_school = req.body.primary_school;
    var secondary = req.body.secondary;


    var sql = `INSERT INTO maneb (name, primary_school, secondary) VALUES ("${name}", "${primary_school}", "${secondary}")`;
    connection.query(sql, function(err, result) {
        if (err) { console.log(err.stack) }
        console.log('record inserted');

        req.flash('success', 'Data added successfully!');
        res.redirect('/');
    });
    res.send("value added succesfully")
});

// catch 404 and forward to error handler


app.post('/enroll', function(req, res, next) {

    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    var email = req.body.email;
    var gender = req.body.gender;
    var p_no = req.body.p_no;


    var sql2 = `INSERT INTO enrollment (f_name, l_name, email,gender,p_no)VALUES ("${f_name}", "${l_name}", "${email}", "${gender}", "${p_no}")`;
    connection.query(sql2, function(err, result) {
        if (err) { console.log(err.stack) }
        console.log('record inserted');

        req.flash('success', 'Data added successfully!');
        res.redirect('/');
    });

});

// catch 404 and forward to error handler




app.put('/users/:id', (req, res) => {
    const id = request.params.id;

    connection.query('UPDATE test_api SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) {
            consolee.log("error occured")
        } else {
            res.send('User updated successfully.');
        }


    });
});
app.delete('/users/:id', (request, response) => {
    const country_id = request.params.id;

    pool.query('DELETE FROM test_api WHERE id', id, (error, result) => {
        if (error) {
            console.log("error")
        } else {
            res.send('User deleted.');
        }

    });
});
app.get('/student/:first_name', (req, res) => {
    // Reading isbn from the URL
    const name = req.params.name;

    // Searching books for the id
    var sql = "select first_name from maneb where first_name=req.params.first_name";
    for (let maneb of manebs) {
        if (maneb.name === sql) {
            res.json(first_name);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

app.listen(3000)