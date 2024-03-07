/*
 * Citation: Citation is from node.js starter code
 * Date: 03/06/2024
 * Adapted from: Github page
 * Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
 */ 

function deleteReview(reviewID) {
    console.log("deleteReview.js is connected!");

    let link = '/delete-review';

    // Put our data we want to send in a javascript object
    let data = {
        reviewID: reviewID
    };

    $.ajax(
    {
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result)
        {
            deleteRow(reviewID)
        } 
    });

}

function deleteRow(reviewID)
{
    let table = document.getElementById("reviews-table");
    for (let i = 0, row; row = table.rows[i]; i++) 
    {
       // iterate through rows
       // rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == reviewID) 
       {
            table.deleteRow(i);
            break;
       }
    }
}