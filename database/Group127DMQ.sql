-- Group 127 - CouchPotato Saga
-- Bruce Yan & Charlemagne Martinez


-- ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  


--Read (SELECT)

--Select all users
SELECT * FROM Users;
SELECT userID as ID, username as Username, email as Email, password as Password, fName as `First Name`, lName as `Last Name` FROM Users;

--Select all restaurants
SELECT Restaurants.restaurantID, CONCAT(city, ", ", IFNULL(CONCAT(state, ", "), ""), country) as location, RestaurantChains.name, restaurantName, description, avgRating, avgPrice, popularOrder 
FROM Restaurants
INNER JOIN Locations ON Restaurants.locationID = Locations.locationID
LEFT JOIN RestaurantChains ON Restaurants.restaurantChainID = RestaurantChains.restaurantChainID
ORDER BY Restaurants.restaurantID;

--Select all reviews 
SELECT reviewID, Restaurants.restaurantName, CONCAT(Users.fName, ' ', Users.lName) AS userName, review
FROM Reviews
INNER JOIN Restaurants ON Reviews.restaurantID = Restaurants.restaurantID
INNER JOIN Users ON Reviews.userID = Users.userID
ORDER BY Reviews.reviewID;

--Select all cuisine types
SELECT * FROM CuisineTypes;
SELECT cuisineTypeID, type FROM CuisineTypes;

--Select all restaurant chains
SELECT * FROM RestaurantChains;
SELECT restaurantChainID, name FROM RestaurantChains;

--Select all locations
SELECT * FROM Locations;
SELECT locationID, city, state, country FROM Locations;

-- Select all restaurant cuisines (intersection table)
SELECT Restaurants.restaurantID, CuisineTypes.cuisineTypeID, Restaurants.restaurantName, CuisineTypes.type FROM RestaurantCuisines
INNER JOIN Restaurants ON RestaurantCuisines.restaurantID = Restaurants.restaurantID
INNER JOIN CuisineTypes ON RestaurantCuisines.cuisineTypeID = CuisineTypes.cuisineTypeID
ORDER BY RestaurantCuisines.restaurantID;

-- Selects for drop down menus
-- Representing locationID with concatenation of city, state, and country attributes from Locations
SELECT CONCAT(city, ", ", IFNULL(CONCAT(state, ", "), ""), country) as location FROM Locations;

SELECT name FROM RestaurantChains;

SELECT type FROM CuisineTypes;

SELECT restaurantName FROM Restaurants;

-- Representing userID with concatenation of first and last name attributes from Users
SELECT CONCAT(fName, ' ', lName) AS userName FROM Users;


-- ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  


--Create (INSERT)

INSERT INTO Users (username, email, password, fName, lName)
VALUES (:username, :email, :password, :fName, :lName);

-- Query includes SELECT subqueries for locationID and restaurantChainID, based on dropdown selections 
INSERT INTO Restaurants (locationID, restaurantChainID, restaurantName, description, avgRating, avgPrice, popularOrder)
SELECT 
  (SELECT locationID FROM Locations WHERE CONCAT(city, ", ", IFNULL(CONCAT(state, ", "), ""), country) = ?),
  (SELECT restaurantChainID FROM RestaurantChains WHERE name = ?), 
  :restaurantName, :description, :avgRating, :avgPrice, :popularOrder;

-- Query includes SELECT subqueries for restaurantID and userID, based on dropdown selections 
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

-- Query includes SELECT subqueries for restaurantID and cuisineTypeID, based on dropdown selections 
INSERT INTO RestaurantCuisines (restaurantID, cuisineTypeID)
  SELECT
      (SELECT restaurantID FROM Restaurants WHERE restaurantName = ?),
      (SELECT cuisineTypeID FROM CuisineTypes WHERE type = ?);


-- ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  


--Update (UPDATE)

-- Update Users
UPDATE Users
SET username = :username,
    email = :email,
    password = :password,
    fName = :fName,
    lName = :lName
WHERE userID = :userID;

-- Update Restaurants query has subqueries for locationID and restaurantChainID, based on dropdown selection
UPDATE Restaurants
SET 
  locationID = (SELECT locationID 
                FROM Locations 
                WHERE CONCAT(city, ", ", IFNULL(CONCAT(state, ", "), ""), country) = ?),
  restaurantChainID = (SELECT restaurantChainID
                       FROM RestaurantChains
                       WHERE name = ?),
  restaurantName = :restaurantName,
  description = :description,
  avgRating = :avgRating,
  avgPrice = :avgPrice,
  popularOrder = :popularOrder,
WHERE restaurantID = :restaurantID;

-- Update Reviews
UPDATE Reviews
SET review = :review
WHERE reviewID = :reviewID;

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

--Update RestaurantCuisines has subquery for cuisineTypeID based on dropdown selection
UPDATE RestaurantCuisines
SET cuisineTypeID = (
  SELECT cuisineTypeID
  FROM CuisineTypes
  WHERE type = ?)
WHERE restaurantID = :restaurantID;


-- ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  


--Delete (DELETE)
--Delete for Users
DELETE FROM Users
WHERE userID = :userID;

--Delete for Restaurants
DELETE FROM Restaurants
WHERE restaurantID = :restaurantID;

--Delete for Reviews in Reviews page
DELETE FROM Reviews WHERE reviewID = :reviewID;

-- Delete for Reviews when deleting user record
DELETE FROM Reviews WHERE userID = :userID;

-- Delete for Reviews when deleting restaurant record
DELETE FROM Reviews WHERE restaurantID = :restaurantID

--Delete for CusisineTypes
DELETE FROM CuisineTypes
WHERE cuisineTypeID = :cuisineTypeID;

--Delete RestaurantsChains
DELETE FROM RestaurantChains
WHERE restaurantChainID = :restaurantChainID;

--Delete Locations
DELETE FROM Locations
WHERE locationID = :locationID;

-- Delete for RestaurantCuisines in RestaurantCuisines page
DELETE FROM RestaurantCuisines
WHERE restaurantID = :restaurantID AND cuisineTypeID = :cuisineTypeID;

-- Delete for RestaurantCuisines when deleting a restaurant record
DELETE FROM RestaurantCuisines
WHERE restaurantID = :restaurantID;

-- Delete for RestaurantCuisines when deleting a cuisine type record
DELETE FROM RestaurantCuisines
WHERE cuisineTypeID = :cuisineTypeID;