/*
 * Citation: Citation is from node.js starter code. Citations were used to setup all our app routes. 
                                                    Functioncs like Fetchdropwdown data were of our own creations 
                                                    including the queries written.
 * Date: 02/28/2024
 * Copied from: Adapted from Github page
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

/* * * * * * * * * * * * * * * * * * * * * * * * * * *

SELECT (Read)

* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/cuisineTypes', function(req,res){
    let query1 = "SELECT * FROM CuisineTypes"
    db.pool.query(query1, function(error, rows, fields){
        console.log("CuisineTypes records:", rows)
        res.render("pages/cuisineTypes", {data: rows});
    })
})

app.get('/locations', function(req,res){
    let query1 = "SELECT * FROM Locations"
    db.pool.query(query1, function(error, rows, fields){
        res.render("pages/locations", {data: rows});
    })
})

// Helper function to fetch locations and restaurant chain data.
// Using to populate dropdown for Adding a Restaurant to directly grab all FK references
// from their respective entities, rather than populating based on current attributes in Restaurants
function fetchDropdownRestaurants(req, res, next)
{
    let query1 = `SELECT CONCAT(city, ", ", IFNULL(CONCAT(state, ", "), ""), country) as location FROM Locations`;
    let query2 = `SELECT name FROM RestaurantChains`;

    // First we grab the Locations attribute we want, a concat of city, state, country
    db.pool.query(query1, function(error1, locationResults, fields)
    {
        if (error1)
        {
            console.log(error1);
            return next(error1);
        }

        // Then we grab the RestaurantChains attribute we want, name
        db.pool.query(query2, function(error2, restaurantChainResults, fields)
        {
            if (error2)
            {
                console.log(error2);
                return next(error2);
            }

            // If no error, attach fetched data to request object
            req.restaurantsDropdownData = 
            {
                locationName: locationResults,
                chainName: restaurantChainResults
            }
            next();
        });
    });
}


app.get('/restaurants', fetchDropdownRestaurants, function(req,res){
    let query1 = `SELECT Restaurants.restaurantID, 
                Locations.locationID,
                RestaurantChains.restaurantChainID,
                CONCAT(city, ", ", IFNULL(CONCAT(state, ", "), ""), country) as location, 
                RestaurantChains.name, 
                restaurantName, 
                description, 
                avgRating, 
                avgPrice, 
                popularOrder 
                FROM Restaurants
                INNER JOIN Locations ON Restaurants.locationID = Locations.locationID
                LEFT JOIN RestaurantChains ON Restaurants.restaurantChainID = RestaurantChains.restaurantChainID
                ORDER BY Restaurants.restaurantID;`
    db.pool.query(query1, function(error, rows, fields){
        console.log('Restaurants records:\n', rows)
        res.render("pages/restaurants", {data: rows, restaurantsDropdownData: req.restaurantsDropdownData});
    })

})

app.get('/restaurantChains', function(req,res){
    let query2 = "SELECT * FROM RestaurantChains"
    db.pool.query(query2, function(error,rows,fields){
        res.render("pages/restaurantChains", {data: rows})
    })
})


// Helper function to fetch restaurants and cuisine type data.
// Using to populate dropdown for Adding a RestaurantCuisine record to directly grab all FK references
// from their respective entities, rather than populating based on current attributes in RestaurantCuisines
function fetchDropdownRestaurantCuisines(req, res, next)
{
    let query1 = `SELECT restaurantName FROM Restaurants;`;
    let query2 = `SELECT type FROM CuisineTypes`;

    // First we grab the Restaurants attribute we want, restaurantName
    db.pool.query(query1, function(error1, restaurantResults, fields)
    {
        if (error1)
        {
            console.log(error1);
            return next(error1);
        }

        // Then we grab the CuisineTypes attribute we want, type
        db.pool.query(query2, function(error2, cuisineTypeResults, fields)
        {
            if (error2)
            {
                console.log(error2);
                return next(error2);
            }

            // console.log("Restaurants:", restaurantResults);
            // console.log("Cuisine Types:", cuisineTypeResults);

            // If no error, attach fetched data to request object
            req.restaurantCuisinesDropdownData = 
            {
                restaurantName: restaurantResults,
                cuisineTypeName: cuisineTypeResults
            }
            next();
        });
    });
}

app.get('/restaurantCuisines', fetchDropdownRestaurantCuisines, function(req, res){
    let query1 = `SELECT Restaurants.restaurantID, 
                        CuisineTypes.cuisineTypeID, 
                        Restaurants.restaurantName,
                        CuisineTypes.type
                    FROM RestaurantCuisines
                    INNER JOIN Restaurants ON RestaurantCuisines.restaurantID = Restaurants.restaurantID
                    INNER JOIN CuisineTypes ON RestaurantCuisines.cuisineTypeID = CuisineTypes.cuisineTypeID
                    ORDER BY Restaurants.restaurantID, CuisineTypes.cuisineTypeID;`
    db.pool.query(query1, function(error, rows, fields){
        console.log('RestaurantCuisines records:\n', rows)
        res.render("pages/restaurantCuisines", {data: rows, restaurantCuisinesDropdownData: req.restaurantCuisinesDropdownData});
    });
});

app.get('/users', function(req, res){
    let query2 = "SELECT * FROM Users"
    db.pool.query(query2, function(error, rows, fields){
        res.render("pages/users", {data: rows});
    })
})

// Helper function to fetch restaurants and users data.
// Using to populate dropdown for Adding a Review to directly grab all FK references
// from their respective entities, rather than populating based on current attributes in Reviews.
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
    INNER JOIN Users ON Reviews.userID = Users.userID
    ORDER BY Reviews.reviewID`
    // let query2 = "SELECT * FROM Reviews"
    db.pool.query(query2, function(error, rows, fields){
        res.render("pages/reviews", {data: rows, dropdownData: req.dropdownData});
    })
})



/* * * * * * * * * * * * * * * * * * * * * * * * * * *

INSERT (Create)

* * * * * * * * * * * * * * * * * * * * * * * * * * */

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

app.post('/add-restaurantCuisine-form', function(req, res){
    let data = req.body;
    console.log("RestaurantCuisines record added:", data);

    let query1 = `INSERT INTO RestaurantCuisines (restaurantID, cuisineTypeID)
                  SELECT
                      (SELECT restaurantID FROM Restaurants WHERE restaurantName = ?),
                      (SELECT cuisineTypeID FROM CuisineTypes WHERE type = ?)`;
            
    
    db.pool.query(query1, [data.restaurantName, data.type], function(error, results, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/restaurantCuisines');
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

app.post('/add-restaurant-form', function(req, res) {
    let data = req.body;
    console.log("Restaurant record added:", data);

    let query = `INSERT INTO Restaurants (locationID, restaurantChainID, restaurantName, description, avgRating, avgPrice, popularOrder)
    SELECT 
        (SELECT locationID FROM Locations WHERE CONCAT(city, ", ", IFNULL(CONCAT(state, ", "), ""), country) = ?),
        (SELECT restaurantChainID FROM RestaurantChains WHERE name = ?),
        ?, ?, ?, ?, ?`;


    // `INSERT INTO Restaurants (locationID, restaurantChainID, restaurantName, description, avgRating, avgPrice, popularOrder)
    // VALUES (?, ?, ?, ?, ?, ?, ?)`;
    

    

    db.pool.query(query, [data.location, data.name, data.restaurantName, data.description, data.avgRating, data.avgPrice, data.popularOrder], function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(400);
        } else {
            res.redirect('/restaurants');
        }
    });
});


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


app.post('/add-cuisine-form', function(req, res){
    let data = req.body

    query1 = `INSERT INTO CuisineTypes (type) VALUES ('${data.type}')`
    db.pool.query(query1, function(error,rows,fields){
        if (error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/cuisineTypes')
        }
    })
})

/* * * * * * * * * * * * * * * * * * * * * * * * * * *

UPDATE (Update)

* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.post('/update-review-form', function(req,res){
    let data = req.body;
    console.log("Review record updated: ", data);

    let query1 = `UPDATE Reviews SET 
    review = ?
    WHERE reviewID = ?`;

    db.pool.query(query1, [data.review, data.reviewID], function(error,rows,fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        }
        else{
            res.redirect('/reviews');
        }
    })
})

app.post('/update-location-form', function(req,res){
    let data = req.body
    console.log("Location record updated: ", data)

    let query1 = `UPDATE Locations SET 
    city = '${data.city}',
    state = '${data.state}',
    country = '${data.country}'
    WHERE locationID = ${data.locationID}`
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

app.post('/update-user-form', function(req, res){
    let data = req.body
    console.log("User record updated: ", data)

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


app.post('/update-cuisine-form', function(req, res){
    let data = req.body
    let query1 = `UPDATE CuisineTypes SET
    type = "${data.type}"
    WHERE cuisineTypeID = ${data.cuisineID}`
    db.pool.query(query1, function(error,rows,fields){
        if (error){
            console.log(error)
            res.sendStatus(400)
        }
        else{
            res.redirect('/cuisineTypes')
        }
    })
})

app.post('/update-restaurant-form', function(req, res) {
    let data = req.body;
    console.log("Restaurant record update: ", data);


    // Use parameterized queries to prevent SQL injection
    let query1 = `UPDATE Restaurants 
                    SET 
                        locationID = (SELECT locationID 
                                        FROM Locations 
                                        WHERE CONCAT(city, ", ", IFNULL(CONCAT(state, ", "), ""), country) = ?),
                        restaurantChainID = (SELECT restaurantChainID
                                                FROM RestaurantChains
                                                WHERE name = ?),
                        restaurantName = ?,
                        description = ?,
                        avgRating = ?,
                        avgPrice = ?,
                        popularOrder = ?
                    WHERE restaurantID = ?`;

    let queryParams = [
        data.location,
        data.chain || null,
        data.restaurantName,
        data.description,
        data.avgRating,
        data.avgPrice,
        data.popularOrder,
        data.restaurantID
    ];

    db.pool.query(query1, queryParams, function(error, rows, fields) {
        if (error) {
            console.error('Error updating restaurant:', error);
            res.sendStatus(500); // Internal Server Error
        } else {
            res.redirect('/restaurants');
        }
    });
});

app.post('/update-rc-form', function(req, res)
{
    let data = req.body;
    console.log("RestaurantCuisines record update: ", data);

    let query = `UPDATE RestaurantCuisines
    SET cuisineTypeID = (
        SELECT cuisineTypeID
        FROM CuisineTypes
        WHERE type = "${data.type}"
    )
    WHERE restaurantID = "${data.restaurantID}"`;
    
    // `UPDATE RestaurantCuisines
    // SET cuisineTypeID = "${data.cuisineTypeID}"
    // WHERE restaurantID = "${data.restaurantID}"`;

    db.pool.query(query, function(error, rows, fields)
    {
        if (error)
        {
            console.log("Error updating RestaurantCuisines record: ", error)
            res.sendStatus(400)
        }

        else
        {
            res.redirect('/restaurantCuisines')
        }
    })

})


/* * * * * * * * * * * * * * * * * * * * * * * * * * *

DELETE (Delete)

* * * * * * * * * * * * * * * * * * * * * * * * * * */

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
                }
            })
        }
    })
})

app.delete('/delete-restaurant-chain', function(req, res, next)
{
    let data = req.body;
    let restaurantChainID = parseInt(data.restaurantChainID);
    let deleteRestaurant = `DELETE FROM Restaurants WHERE restaurantChainID = ?`;
    let deleteChain = `DELETE FROM RestaurantChains WHERE restaurantChainID = ?`;

    db.pool.query(deleteRestaurant, [restaurantChainID], function(error, rows, fields)
    {
        if (error)
        {
            console.log(error);
            res.sendStatus(400);
        }

        else
        {
            db.pool.query(deleteChain, [restaurantChainID], function(error, rows, fields)
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
        }
    })
})

app.delete('/delete-cuisine-type', function(req, res, next)
{
    console.log("In delete-cuisine-type route!")

    let data = req.body;
    let cuisineTypeID = parseInt(data.cuisineTypeID);
    let deleteRestaurantCuisine = `DELETE FROM RestaurantCuisines WHERE cuisineTypeID = ?`;
    let deleteCuisineType = `DELETE FROM CuisineTypes WHERE cuisineTypeID = ?`;

    // First delete from RestaurantCuisines, which has a FK reference to cuisineTypeID
    db.pool.query(deleteRestaurantCuisine, [cuisineTypeID], function(error, rows, fields)
    {
        if (error)
        {
            console.log(error);
            res.sendStatus(400);
        }

        // Afterwards, delete from CuisineTypes based on the same cuisineTypeID
        else 
        {
            db.pool.query(deleteCuisineType, [cuisineTypeID], function(error, rows, fields)
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
        }
    })
})


app.delete('/delete-location', function(req, res, next)
{
    console.log("In delete-location route!")

    let data = req.body;
    let locationID = parseInt(data.locationID);
    let deleteRestaurant = `DELETE FROM Restaurants WHERE locationID = ?`;
    let deleteLocation = `DELETE FROM Locations WHERE locationID = ?`;

    // First we delete respective Restaurants record, as there is a locationID FK it references for Locations
    db.pool.query(deleteRestaurant, [locationID], function(error, rows, fields)
    {
        if (error)
        {
            console.log(error)
            res.sendStatus(400)
        }
        
        // Afterwards we then delete the Locations record itself based on locationID
        else
        {
            db.pool.query(deleteLocation, [locationID], function(error, rows, fields)
            {
                if (error)
                {
                    console.log(error)
                    res.sendStatus(400)
                }

                else
                {
                    res.sendStatus(204)
                }
            })
        }
    })
})


app.delete('/delete-restaurant', function(req, res, next) 
{
    console.log("In delete-restaurant route!")

    let data = req.body;
    let restaurantID = parseInt(data.restaurantID);
    let deleteRestaurantCuisine = `DELETE FROM RestaurantCuisines WHERE restaurantID = ?`;
    let deleteReview = `DELETE FROM Reviews WHERE restaurantID = ?`;
    let deleteRestaurant = `DELETE FROM Restaurants WHERE restaurantID = ?`;

    // First, we delete the record from RestaurantCuisine, as it has a FK referring to restaurantID of Restaurants
    db.pool.query(deleteRestaurantCuisine, [restaurantID], function(error, rows, fields) {
        if (error) 
        {
            console.log(error);
            res.sendStatus(400);
        } 
        else 
        {
            // Then, we delete the record from Reviews, as it also has a FK referring to restaurantID of Restaurants
            db.pool.query(deleteReview, [restaurantID], function(error, rows, fields) {
                if (error) 
                {
                    console.log(error);
                    res.sendStatus(400);
                } 
                else 
                {
                    // Finally, we delete the Restaurants record itself
                    db.pool.query(deleteRestaurant, [restaurantID], function(error, rows, fields) 
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
                    });
                }
            });
        }
    });
});

app.delete('/delete-restaurant-cuisine', function(req, res, next)
{
    console.log("In delete-restaurant-cuisine route!")

    let data = req.body;
    let restaurantID = parseInt(data.restaurantID);
    let cuisineTypeID = parseInt(data.cuisineTypeID);

    let deleteRestaurantCuisine = `DELETE FROM RestaurantCuisines
    WHERE restaurantID = ? AND cuisineTypeID = ?`;

    db.pool.query(deleteRestaurantCuisine, [restaurantID, cuisineTypeID], function(error, rows, fields)
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


/*
    LISTENER
*/
app.listen(PORT, function(){ 
    // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});