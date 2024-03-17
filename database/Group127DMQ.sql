-- Group 127 - CouchPotato Saga
-- Bruce Yan & Charlemagne Martinez

-- To-Do (as of step 4):
-- - do not think we're using the queries we have for the dropdown, as we're currently using
--   a script (currently in users.handlebars). This method tho seems to be working but go back maybe?
-- - once we get to them, look at INSERT queries that have subqueries again (Restaurants, Reviews)


-- TO-DO (as of step 3): 
-- - SEE IF THE WAY WE'RE INSERTING INTO Restaurants IS A GOOD APPROACH
--  (specifically locationID since we're using it's name attributes rather than just the ID)
-- - see if we're doing the dropdowns correctly




--Read (SELECT)
--SELECT ALL DATA TO SHOW ON UI

--Select all users
SELECT * FROM Users;
SELECT userID as ID, username as Username, email as Email, password as Password, fName as `First Name`, lName as `Last Name` FROM Users;

--Select all restaurants
SELECT Restaurants.restaurantID, CONCAT(city, ", ", IFNULL(CONCAT(state, ", "), ""), country) as location, RestaurantChains.name, restaurantName, description, avgRating, avgPrice, popularOrder 
FROM Restaurants
INNER JOIN Locations ON Restaurants.locationID = Locations.locationID
LEFT JOIN RestaurantChains ON Restaurants.restaurantChainID = RestaurantChains.restaurantChainID
ORDER BY Restaurants.restaurantID;
-- INNER JOIN RestaurantCuisines ON Restaurants.restaurantID = RestaurantCuisines.restaurantID
-- INNER JOIN CuisineTypes ON RestaurantCuisines.cuisineTypeID = CuisineTypes.cuisineTypeID; 

--Select all reviews 
SELECT reviewID, Restaurants.restaurantName, CONCAT(Users.fName, ' ', Users.lName) AS userName, review
FROM Reviews
INNER JOIN Restaurants ON Reviews.restaurantID = Restaurants.restaurantID
INNER JOIN Users ON Reviews.userID = Users.userID
ORDER BY Reviews.reviewID;

--Select all cuisine types
SELECT cuisineTypeID, type FROM CuisineTypes;

--Select all restaurant chains
SELECT restaurantChainID, name FROM RestaurantChains;

--Select all locations
SELECT locationID, city, state, country FROM Locations;

-- Select all restaurant cuisines (intersection table)
SELECT Restaurants.restaurantName, CuisineTypes.type FROM RestaurantCuisines
INNER JOIN Restaurants ON RestaurantCuisines.restaurantID = Restaurants.restaurantID
INNER JOIN CuisineTypes ON RestaurantCuisines.cuisineTypeID = CuisineTypes.cuisineTypeID
ORDER BY RestaurantCuisines.restaurantID;

-- Selects for drop down menus
SELECT CONCAT(city, ", ", IFNULL(CONCAT(state, ", "), ""), country) as location FROM Locations;

SELECT name as chainName FROM RestaurantChains;

SELECT cuisineTypeID, type FROM CuisineTypes;

SELECT restaurantName FROM Restaurants;

SELECT CONCAT(fName, " ", lName) as userName FROM Users;


--Create (INSERT)
INSERT INTO Users (username, email, password, fName, lName)
VALUES (:username, :email, :password, :fName, :lName);

INSERT INTO Restaurants (locationID, restaurantChainID, restaurantName, description, avgRating, avgPrice, popularOrder)
VALUES (
  SELECT locationID
  FROM Locations
  WHERE CONCAT(city, ', ', IFNULL(state, ', '), country) = :locationID, 
  SELECT restaurantChainID
  FROM RestaurantChains
  WHERE name = :name, 
  :restaurantName, :description, :avgRating, :avgPrice, :popularOrder);


INSERT INTO Reviews (restaurantID, userID, review)
VALUES (
  SELECT restaurantID
  FROM Restaurants
  WHERE restaurantName = :restaurantName, 
  SELECT userID
  FROM Users
  WHERE CONCAT(fName, ' ', lName) = :userID, 
  :review);

-- This one works
INSERT INTO Reviews (restaurantID, userID, review) 
  SELECT 
    (SELECT restaurantID FROM Restaurants WHERE restaurantName = ?), 
    (SELECT userID FROM Users WHERE CONCAT(fName, ' ', lName) = ?),
    ?;

INSERT INTO CuisineTypes (type)
VALUES (:type);

INSERT INTO RestaurantChains (name)
VALUES (:restaurantName);

INSERT INTO Locations (city, state, country)
VALUES (:city, :state, :country);

INSERT INTO RestaurantCuisines (restaurantID, cuisineTypeID)
VALUES (:restaurantID, :cuisineTypeID)


--Update (UPDATE)

-- Update Users
UPDATE Users
SET username = :username,
    email = :email,
    password = :password,
    fName = :fName,
    lName = :lName
WHERE userID = :userID;

-- Update Restaurants
UPDATE Restaurants
SET locationID = :locationID,
    restaurantChainID = :restaurantChainID,
    restaurantName = :restaurantName,
    description = :description,
    avgRating = :avgRating,
    avgPrice = :avgPrice,
    popularOrder = :popularOrder,
WHERE restaurantID = :restaurantID;

-- Update Reviews
UPDATE Reviews
SET review = :review
WHERE restaurantID = :restaurantID
  AND userID = :userID;

--Update CuisineTypes
UPDATE CuisineTypes
SET type = :type
WHERE cuisineTypeID = :cuisineTypeID;

--Update RestaurantChains
UPDATE RestaurantChains
SET name = :name
WHERE restaurantChainID = :restaurantChainID;

--Update Locations
UPDATE Locations
SET city = :city,
    state = :state,
    country = :country
WHERE locationID = :locationID;

UPDATE RestaurantCuisines
SET cuisineTypeID = :cuisineTypeID
WHERE restaurantID = :restaurantID;

--Delete (DELETE)

--Delete for Users
DELETE FROM Users
WHERE userID = :userID;

--Delete for Restaurants
DELETE FROM Restaurants
WHERE restaurantID = :restaurantID;

--Delete for Reviews
DELETE FROM Reviews WHERE userID = :userID;

DELETE FROM Reviews
WHERE restaurantID = :restaurantID
  AND userID = :userID;

-- This one works
DELETE FROM Reviews WHERE reviewID = :reviewID;

--Delete for CusisineTypes
DELETE FROM CuisineTypes
WHERE cuisineTypeID = :cuisineTypeID;

--Delete RestaurantsChains
DELETE FROM RestaurantChains
WHERE restaurantChainID = :restaurantChainID;

--Delete Locations
DELETE FROM Locations
WHERE locationID = :locationID;


-- Delete RestaurantCuisines
DELETE FROM RestaurantCuisines
WHERE cuisineTypeID = :cuisineTypeID;

DELETE FROM RestaurantCuisines
WHERE restaurantID = :restaurantID;

DELETE FROM RestaurantCuisines
WHERE restaurantID = :restaurantID AND cuisineTypeID = :cuisineTypeID