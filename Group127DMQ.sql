--SELECT ALL DATA TO SHOW ON UI

--Select all users
SELECT userID, username, email, password, fName, lName FROM Users;

--Select all restaurants
SELECT restaurantID, Locations.locationID, RestaurantChains.restaurantChainID, restaurantName, description, avgRating, avgPrice, popularOrder, photo 
FROM Restaurants
INNER JOIN Locations ON Restaurants.locationID = Locations.locationID
INNER JOIN RestaurantChains ON Restaurants.restaurantChainID = RestaurantChains.restaurantChainID; 

--Select all reviews 
SELECT reviewID, Restaurants.restaurantID, Users.userID, review
FROM Reviews
INNER JOIN Restaurants ON Reviews.restaurantID = Restaurants.restaurantID
INNER JOIN Users ON Reviews.userID = Users.userID;

--Select all cuisine types
SELECT cuisineTypeID, type FROM CuisineTypes;

--Select all restaurant chains
SELECT restaurantChainID, name FROM RestaurantChains;

--Select all locations
SELECT locationID, city, state, country FROM Locations;


--Create
INSERT INTO Users (username, email, password, fName, lName)
VALUES (:username, :email, :password, :fName, :lName);

INSERT INTO Restaurants (locationID, restaurantChainID, restaurantName, description, avgRating, avgPrice, popularOrder, photo)
VALUES (:locationID, :restaurantChainID, :restaurantName, :description, :avgRating, :avgPrice, :popularOrder, :photo);


INSERT INTO Reviews (restaurantID, userID, review)
VALUES (:restaurantID, :userID, :review);

INSERT INTO CuisineTypes (type)
VALUES (:type);

INSERT INTO RestaurantChains (name)
VALUES (:restaurantName);

INSERT INTO Locations (city, state, country)
VALUES (:city, :state, :country);

--Read


--Update

-- Update Users
UPDATE Users
SET email = :email,
    password = :password,
    fName = :fName,
    lName = :lName
WHERE username = :username;

-- Update Restaurants
UPDATE Restaurants
SET locationID = :locationID,
    restaurantChainID = :restaurantChainID,
    restaurantName = :restaurantName,
    description = :description,
    avgRating = :avgRating,
    avgPrice = :avgPrice,
    popularOrder = :popularOrder,
    photo = :photo
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


--Delete

--Delete for Users
DELETE FROM Users
WHERE username = :username;

--Delete for Restaurants
DELETE FROM Restaurants
WHERE restaurantID = :restaurantID;

--Delete for Reviews
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
