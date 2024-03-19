function deleteLocation(locationID) {
    console.log("deleteLocation.js is connected!");

    let link = '/delete-location';

    // Put our data we want to send in a javascript object
    let data = {
        locationID: locationID
    };

    $.ajax(
    {
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result)
        {
            // moving directly here similar to deleteUser.js which made table update w/o reloading page
            let table = document.getElementById("locations-table");
            for (let i = 0, row; row = table.rows[i]; i++) {
                // iterate through rows
                // rows would be accessed using the "row" variable assigned in the for loop
                if (table.rows[i].getAttribute("data-value") == locationID) {
                    table.deleteRow(i);
                    break;
                }
            }
        } 
    });
}

// function deleteRow(locationID){
//     let table = document.getElementById("locations-table");
//     for (let i = 0, row; row = table.rows[i]; i++) {
//         // iterate through rows
//         // rows would be accessed using the "row" variable assigned in the for loop
//         if (table.rows[i].getAttribute("data-value") == locationID) {
//             table.deleteRow(i);
//             break;
//         }
//     }
// }
