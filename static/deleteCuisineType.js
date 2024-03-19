/*
 * Citation: Citation is from node.js starter code. Citation used for our delete fucntions
 * Date: 03/07/2024
 * Adapted from: Github page
 * Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
 */ 

function deleteCuisineType(cuisineTypeID) {
    console.log("deleteCuisineType.js is connected!");

    let link = '/delete-cuisine-type';

    // Put our data we want to send in a javascript object
    let data = {
        cuisineTypeID: cuisineTypeID
    };

    $.ajax(
    {
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result)
        {
            // moving this directly here similar to deleteUser.js and other entities
            let table = document.getElementById("cuisine-table");
            for (let i = 0, row; row = table.rows[i]; i++) 
            {
                // iterate through rows
                // rows would be accessed using the "row" variable assigned in the for loop
                if (table.rows[i].getAttribute("data-value") == cuisineTypeID) 
                {
                        table.deleteRow(i);
                        break;
                }
            }
        } 
    });

}

