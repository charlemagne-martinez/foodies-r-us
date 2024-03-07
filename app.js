/*
 * Citation: Citation is from node.js starter code
 * Date: 02/28/2024
 * Copied from: Github page
 * Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
 */ 
// App.js

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 7677;                 // Set a port number at the top so it's easy to change in the future
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
    let query2 = "SELECT * FROM RestaurantChains"
    db.pool.query(query2, function(error,rows,fields){
        res.render("pages/restaurantChains", {data: rows})
    })
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

// Helper function to fetch restaurants and users data
function fetchDropdownData(req, res, next) {
    let query1 = "SELECT restaurantName FROM Restaurants";
    let query2 = "SELECT CONCAT(fName, ' ', lName) AS userName FROM Users";

    // First grab the Restaurants attribute we want, restaurantName
    db.pool.query(query1, function(error1, restaurantResults, fields) {
        if (error1) {
            console.log(error1);
            return next(error1);
        }

        // Then grab the Users attributes we want, a concatenation of first and last name for readability
        db.pool.query(query2, function(error2, userResults, fields) {
            if (error2) {
                console.log(error2);
                return next(error2);
            }

            // Attach fetched data to request object
            req.dropdownData = {
                restaurantName: restaurantResults,
                fullName: userResults
            };
            next();
        });
    });
}


app.get('/reviews', fetchDropdownData, function(req, res){
    let query2 = `SELECT Reviews.reviewID, 
    Restaurants.restaurantName, 
    CONCAT(Users.fName, ' ', Users.lName) AS userName, 
    review FROM Reviews 
    INNER JOIN Restaurants ON Reviews.restaurantID = Restaurants.restaurantID 
    INNER JOIN Users ON Reviews.userID = Users.userID`
    // let query2 = "SELECT * FROM Reviews"
    // console.log(query2);
    db.pool.query(query2, function(error, rows, fields){
        res.render("pages/reviews", {data: rows, dropdownData: req.dropdownData});
    })
})

app.post('/add-review-form', function(req, res){
    let data = req.body;
    console.log("Review record added:", data);

    let query1 = `INSERT INTO Reviews (restaurantID, userID, review) 
                  SELECT 
                      (SELECT restaurantID FROM Restaurants WHERE restaurantName = ?), 
                      (SELECT userID FROM Users WHERE CONCAT(fName, ' ', lName) = ?),
                      ?`;

    db.pool.query(query1, [data.restaurantName, data.userName, data.review], function(error, results, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/reviews');
        }
    });
});

app.post('/add-chain-form', function(req, res){
    let data = req.body

    query1 = `INSERT INTO RestaurantChains (name) VALUES ('${data.name}')`
    db.pool.query(query1, function(error,rows,fields){
        if (error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/restaurantChains')
        }
    })
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
    console.log("User added!")
    console.log(data)

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

app.post('/update-review-form', function(req,res){
    let data = req.body
    console.log(data)

    let query1 = `UPDATE Reviews SET 
    review = '${data.review}'
    WHERE reviewID = ${data.reviewID}`
    db.pool.query(query1, function(error,rows,fields){
        if (error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/reviews')
        }
    })
})

app.post('/update-user-form', function(req, res){
    let data = req.body
    console.log("User updated!")
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

app.post('/update-chain-form', function(req, res){
    let data = req.body
    console.log(data)
    let query1 = `UPDATE RestaurantChains SET
    name = "${data.name}"
    WHERE restaurantChainID = ${data.chainID}`
    db.pool.query(query1, function(error,rows,fields){
        if (error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/restaurantChains')
        }
    })
})


app.delete('/delete-review', function(req, res, next)
{
    console.log("Entered delete-review route!")

    let data = req.body;
    let reviewID = parseInt(data.reviewID);
    let deleteReview = `DELETE FROM Reviews WHERE reviewID = ?`;

    db.pool.query(deleteReview, [reviewID], function(error, rows, fields)
    {
        if (error)
        {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
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