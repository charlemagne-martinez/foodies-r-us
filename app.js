/*
 * Citation: Citation is from node.js starter code
 * Date: 02/28/2024
 * Copied from: Github page
 * Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
 */ 
// App.js

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 7676;                 // Set a port number at the top so it's easy to change in the future
var db = require('./database/db-connector') // connect to our database file

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine("handlebars", exphbs.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))


app.get('/', function(req,res){
    res.render('pages/home')
})
app.get('/cuisineTypes', function(req,res){
    res.render('pages/cuisineTypes')
})
app.get('/locations', function(req,res){
    let query1 = "SELECT * FROM Locations"
    db.pool.query(query1, function(error, rows, fields){
        res.render("pages/locations", {data: rows});
    })
})
app.get('/restaurants', function(req,res){
    res.render("pages/restaurants")
})
app.get('/restaurantChains', function(req,res){
    res.render("pages/restaurantChains")
})
app.get('/restaurantCuisines', function(req,res){
    res.render("pages/restaurantCuisines")
})
app.get('/users', function(req, res){
    let query2 = "SELECT * FROM Users"
    db.pool.query(query2, function(error, rows, fields){
        res.render("pages/users", {data: rows});
    })
})
app.get('/reviews', function(req, res){
    res.render("pages/reviews")
})

// Post
app.post('/add-location-form', function(req, res){
    let data = req.body

    query1 = `INSERT INTO Locations (city, state, country) VALUES ('${data.city}', '${data.state}', '${data.country}')`;
    db.pool.query(query1, function(error,rows,fields){
        if (error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/locations')
        }
    })
})

app.post('/add-user-form', function(req, res){
    let data = req.body

    query1 = `INSERT INTO Users (username, email, password, fName, lName) VALUES ('${data.username}', '${data.email}', '${data.password}', '${data.fName}', '${data.lName}')`;
    db.pool.query(query1, function(error,rows,fields){
        if (error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/users')
        }
    })
})

app.post('/update-user-form', function(req, res){
    let data = req.body
    console.log(data)

    let query1 = `UPDATE Users SET 
    username = '${data.username}', 
    email = '${data.email}', 
    password = '${data.password}', 
    fName = '${data.fName}', 
    lName = '${data.lName}' 
    WHERE userID = ${data.userID}`;

    db.pool.query(query1, function(error,rows,fields){
        if (error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/users')
        }
    })
})

app.delete('/delete-user', function(req, res, next){
    let data = req.body;
    let userID = parseInt(data.userID);
    let deleteReview = `DELETE FROM Reviews WHERE userID = ?`;
    let deleteUser = `DELETE FROM Users WHERE userID = ?`;

    db.pool.query(deleteReview, [userID], function(error, rows, fields)
    {
        if (error) 
        {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else 
        {
            db.pool.query(deleteUser, [userID], function(error, rows, fields){
                if (error) 
                {
                    console.log(error);
                    res.sendStatus(400);
                } 
                else 
                {
                    res.sendStatus(204);
                    // res.redirect('/users')
                }
            })
        }
    })
})


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});