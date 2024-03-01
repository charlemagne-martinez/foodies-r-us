-- Group 127 - CouchPotato Saga
-- Bruce Yan & Charlemagne Martinez

-- TO-DO (as of step 3): 
-- - SEE IF THE WAY WE'RE INSERTING INTO Restaurants IS A GOOD APPROACH
--  (specifically locationID since we're using it's name attributes rather than just the ID)
-- - decide if we want to use username in place of userID for Reviews
-- - see if we're doing the dropdowns correctly



-- To Do (as of step 2): 1 update (1 NULLable relationship, probably a 1:M?), 1 DELETE (M:N), 1 DROP-DOWN
-- , have queries for drop down menus

--Read (SELECT)
--SELECT ALL DATA TO SHOW ON UI

--Select all users
SELECT * FROM Users;
SELECT userID, username, email, password, fName as firstName, lName as lastName FROM Users;

--Select all restaurants
SELECT Restaurants.restaurantID, CONCAT(Locations.city, ", ", IFNULL(Locations.state, ", "), ", ", Locations.country) as location, RestaurantChains.name, restaurantName, description, avgRating, avgPrice, popularOrder 
FROM Restaurants
INNER JOIN Locations ON Restaurants.locationID = Locations.locationID
INNER JOIN RestaurantChains ON Restaurants.restaurantChainID = RestaurantChains.restaurantChainID;
-- INNER JOIN RestaurantCuisines ON Restaurants.restaurantID = RestaurantCuisines.restaurantID
-- INNER JOIN CuisineTypes ON RestaurantCuisines.cuisineTypeID = CuisineTypes.cuisineTypeID; 

--Select all reviews 
SELECT reviewID, Restaurants.restaurantName, Users.username, review
FROM Reviews
INNER JOIN Restaurants ON Reviews.restaurantID = Restaurants.restaurantID
INNER JOIN Users ON Reviews.userID = Users.userID;

--Select all cuisine types
SELECT cuisineTypeID, type FROM CuisineTypes;

--Select all restaurant chains
SELECT restaurantChainID, name FROM RestaurantChains;

--Select all locations
SELECT locationID, city, state, country FROM Locations;

-- Select all restaurant cuisines (intersection table)
SELECT Restaurants.restaurantName, CuisineTypes.type FROM RestaurantCuisines
INNER JOIN Restaurants ON RestaurantCuisines.restaurantID = Restaurants.restaurantID
INNER JOIN CuisineTypes ON RestaurantCuisines.cuisineTypeID = CuisineTypes.cuisineTypeID;

-- Selects for drop down menus
SELECT locationID, CONCAT(city, ", ", IFNULL(state, ""), ", ", country) as Locations FROM Locations;

SELECT restaurantChainID, name FROM RestaurantChains;

SELECT cuisineTypeID, type FROM CuisineTypes;

SELECT restaurantID, restaurantName FROM Restaurants;

SELECT userID, CONCAT(fName, " ", lName) as User FROM Users;


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

--Delete for CusisineTypes
DELETE FROM CuisineTypes
WHERE cuisineTypeID = :cuisineTypeID;

--Delete RestaurantsChains
DELETE FROM RestaurantChains
WHERE restaurantChainID = :restaurantChainID;

--Delete Locations
DELETE FROM Locations
WHERE locationID = :locationID;
