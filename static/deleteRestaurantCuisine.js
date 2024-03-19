/*
 * Citation: Citation is from node.js starter code. Citation used for our delete function
 * Date: 03/16/2024
 * Adapted from: Github page
 * Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
 */ 

function deleteRestaurantCuisine(restaurantID, cuisineTypeID) {
    console.log("deleteRestaurantCuisine.js is connected!");

    let link = '/delete-restaurant-cuisine';

    // Put our data we want to send in a javascript object
    let data = {
        restaurantID: restaurantID,
        cuisineTypeID: cuisineTypeID
    };
 
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result)
        {
            // deleteRow(restaurantID, cuisineTypeID)
            // moving here similar to deleteUser.js and other files which should
            // make table update after deleting record w/o refreshing page
            let table = document.getElementById("restaurantCuisines-table");
            for (let i = 0, row; row = table.rows[i]; i++) 
            {
                // iterate through rows
                // rows would be accessed using the "row" variable assigned in the for loop
                if (table.rows[i].getAttribute("data-valueRestaurant") == restaurantID && 
                table.rows[i].getAttribute("data-valueCuisineType") == cuisineTypeID)
                {
                    table.deleteRow(i);
                    break;
                }
            }
        } 
    });
}

