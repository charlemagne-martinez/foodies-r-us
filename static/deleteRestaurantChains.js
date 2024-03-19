/*
 * Citation: Citation is from node.js starter code. Citation used for our delete function
 * Date: 03/06/2024
 * Adapted from: Github page
 * Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
 */ 

function deleteChains(restaurantChainID) {
    console.log("deleteRestaurantChains.js is connected!");

    let link = '/delete-restaurant-chain';

    // Put our data we want to send in a javascript object
    let data = {
        restaurantChainID: restaurantChainID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result)
        {
            // moving here similar to deleteUser.js and other entity delete js functions
            let table = document.getElementById("chains-table");
            for (let i = 0, row; row = table.rows[i]; i++) {
                // iterate through rows
                // rows would be accessed using the "row" variable assigned in the for loop
                if (table.rows[i].getAttribute("data-value") == restaurantChainID) {
                    table.deleteRow(i);
                    break;
                }
            }
        } 
    });
}
