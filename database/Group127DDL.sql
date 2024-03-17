-- Group 127 - CouchPotato Saga
-- Bruce Yan & Charlemagne Martinez

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- -- -- -- -- TABLE CREATION -- -- -- -- --

-- Table structure for table `Locations`
CREATE OR REPLACE TABLE `Locations` (
  `locationID` int AUTO_INCREMENT,
  `city` varchar(50) NOT NULL,
  `state` varchar(50),
  `country` varchar(50) NOT NULL,
  PRIMARY KEY (`locationID`)
);


-- Table structure for table `RestaurantChains`
CREATE OR REPLACE TABLE `RestaurantChains` (
  `restaurantChainID` int AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`restaurantChainID`)
);

-- Table structure for table `Restaurants`
CREATE OR REPLACE TABLE `Restaurants` (
  `restaurantID` int AUTO_INCREMENT,
  `locationID` int(11) NOT NULL,
  `restaurantChainID` int(11) DEFAULT NULL,
  `restaurantName` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `avgRating` decimal(18,1) NOT NULL,
  `avgPrice` varchar(50) NOT NULL,
  `popularOrder` varchar(50) NOT NULL,
  PRIMARY KEY (`restaurantID`),
  FOREIGN KEY (`locationID`) REFERENCES `Locations`(`locationID`) ON DELETE CASCADE,
  FOREIGN KEY (`restaurantChainID`) REFERENCES `RestaurantChains`(`restaurantChainID`) ON DELETE CASCADE
);

-- Table structure for table `CuisineTypes`
CREATE OR REPLACE TABLE `CuisineTypes` (
  `cuisineTypeID` int AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`cuisineTypeID`)
);

-- Table structure for intersection table `RestaurantCuisines`
CREATE TABLE `RestaurantCuisines` (
  `restaurantID` int(11) NOT NULL,
  `cuisineTypeID` int(11) NOT NULL,
  PRIMARY KEY (`restaurantID`, `cuisineTypeID`),
  FOREIGN KEY (`restaurantID`) REFERENCES `Restaurants`(`restaurantID`) ON DELETE CASCADE,
  FOREIGN KEY (`cuisineTypeID`) REFERENCES `CuisineTypes`(`cuisineTypeID`) ON DELETE CASCADE
);


-- Table structure for table `Users`
CREATE OR REPLACE TABLE `Users` (
  `userID` int AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fName` varchar(50) NOT NULL,
  `lName` varchar(50) NOT NULL,
  PRIMARY KEY (`userID`)
);


-- Table structure for intersection table `Reviews`
CREATE OR REPLACE TABLE `Reviews` (
  `reviewID` int AUTO_INCREMENT,
  `restaurantID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `review` varchar(255) NOT NULL,
  PRIMARY KEY (`reviewID`),
  FOREIGN KEY (`restaurantID`) REFERENCES `Restaurants`(`restaurantID`) ON DELETE CASCADE,
  FOREIGN KEY (`userID`) REFERENCES `Users`(`userID`) ON DELETE CASCADE 
);


-- -- -- -- -- TABLE INSERTIONS -- -- -- -- --

-- Inserting dummy data into Locations
INSERT INTO Locations (city, state, country) VALUES 
('New York', 'NY', 'USA'),
('Los Angeles', 'CA', 'USA'),
('London', NULL, 'UK'),
('Buford', 'WY', 'USA');

-- Inserting dummy data into Restaurants
INSERT INTO Restaurants (restaurantChainID, locationID, restaurantName, description, avgRating, avgPrice, popularOrder) VALUES 
(1, 1, 'McDonald''s Times Square', 'Fast food restaurant in Times Square', 3., '$$', 'Big Mac'),
(2, 1, 'Starbucks Central Park', 'Coffee shop in Central Park', 4., '$', 'Caramel Macchiato'),
(3, 2, 'Subway Downtown LA', 'Sandwich restaurant in Downtown LA', 4., '$', 'Chicken Teriyaki Sub'),
(NULL, 3, 'Brigadiers', 'Indian restaurant in London', 4., '$$$', 'Chicken Tikka Butter Masala'),
(1, 3, 'McDonald''s Piccadilly', 'Fast food restaurant in Piccadilly Circus', 4., '$$', 'Chicken McNuggets');


-- Inserting dummy data into RestaurantChains
INSERT INTO RestaurantChains (name) VALUES 
('McDonald''s'),
('Starbucks'),
('Subway');

-- Inserting dummy data into CuisineTypes
INSERT INTO CuisineTypes (type) VALUES 
('Italian'),
('Mexican'),
('Chinese'),
('Indian');

INSERT INTO RestaurantCuisines (restaurantID, cuisineTypeID) VALUES 
(1, 1), -- McDonald's Times Square serves Italian cuisine
(2, 3), -- Starbucks Central Park serves Chinese cuisine
(3, 2), -- Subway Downtown LA serves Mexican cuisine
(3, 4), -- Subway Downtown LA also serves Indian cuisine
(4, 4), -- Brigadiers serves Indian cuisine
(5, 1); -- McDonald's Piccadilly serves Italian cuisine


-- Inserting dummy data into Users
INSERT INTO Users (username, email, password, fName, lName) VALUES 
('user1', 'user1@example.com', 'password1', 'John', 'Doe'),
('user2', 'user2@example.com', 'password2', 'Jane', 'Smith'),
('user3', 'user3@example.com', 'password3', 'Michael', 'Johnson'),
('user4', 'user4@example.com', 'password4', 'Emily', 'Brown');

-- Inserting dummy data into Reviews
INSERT INTO Reviews (restaurantID, userID, review) VALUES 
(1, 1, 'Great place for a quick meal.'),      -- Review for McDonald's Times Square
(1, 2, 'Love their fries!'),                  -- Review for McDonald's TImes Square
(2, 3, 'Amazing coffee and atmosphere.'),     -- Review for Starbucks Central Park
(3, 1, 'Healthy options and fast service.');  -- Review for Subway Downtown LA


SET FOREIGN_KEY_CHECKS=1;
COMMIT;