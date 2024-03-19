/*
 * Citation: Citation is from node.js starter code. Citation used for our delete function
 * Date: 03/07/2024
 * Adapted from: Github page
 * Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
 */ 

function deleteRestaurant(restaurantID) {
    console.log("deleteRestaurant.js is connected!");

    let link = '/delete-restaurant';

    // Put our data we want to send in a javascript object
    let data = {
        restaurantID: restaurantID
    };

    $.ajax(
    {
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result)
        {
            // moving this similar to in deleteUser.js which should update table w/o reloading page as well
            let table = document.getElementById("restaurant-table");
            for (let i = 0, row; row = table.rows[i]; i++) 
            {
               // iterate through rows
               // rows would be accessed using the "row" variable assigned in the for loop
               if (table.rows[i].getAttribute("data-value") == restaurantID) 
               {
                    table.deleteRow(i);
                    break;
               }
            }
        } 
    });

}

// function deleteRow(restaurantID)
// {
//     let table = document.getElementById("restaurant-table");
//     for (let i = 0, row; row = table.rows[i]; i++) 
//     {
//        // iterate through rows
//        // rows would be accessed using the "row" variable assigned in the for loop
//        if (table.rows[i].getAttribute("data-value") == restaurantID) 
//        {
//             table.deleteRow(i);
//             break;
//        }
//     }
// }