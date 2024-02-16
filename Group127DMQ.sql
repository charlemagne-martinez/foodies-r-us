--SELECT ALL DATA TO SHOW ON UI

--Select all users
SELECT userID, username, email, password, fName, lName FROM Users;

--Select all restaurants
SELECT restaurantID, Locations.locationID, RestaurantChains.restaurantChainID, restaurantName, description, avgRating, avgPrice, popularOrder, photo 
FROM Restaurants
INNER JOIN Locations ON Restaurants.locationID = Locations.locationID
INNER JOIN RestaurantChains ON Restaurants.restaurantChainID = RestaurantChains.restaurantChainID; 

--Select all reviews 
SELECT * FROM Reviews;

--Select all cuisine types
SELECT * FROM CuisineTypes;

--Select all restaurant chains
SELECT * FROM RestaurantChains;

--Select all locations
SELECT * FROM Locations;


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