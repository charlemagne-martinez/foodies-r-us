/*
 * Citation: Citation is from node.js starter code
 * Date: 02/28/2024
 * Adapted from: Github page
 * Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
 */ 

function deleteUser(userID) {
    console.log("deleteUser.js is connected!");

    let link = '/delete-user';

    // Put our data we want to send in a javascript object
    let data = {
        userID: userID
    };

    $.ajax(
    {
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result)
        {
            deleteRow(userID)
        } 
    });

}


// check this again later
function deleteRow(userID)
{
    let table = document.getElementById("users-table");
    for (let i = 0, row; row = table.rows[i]; i++) 
    {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == userID) 
       {
            table.deleteRow(i);
            deleteDropDownMenuOption(userID);
            break;
       }
    }
}

function deleteDropDownMenuOption(userID)
{
    let selectMenu = document.getElementById("updateUser")
    for (let i = 0; i < selectMenu.length; i++)
    {
        if (Number(selectMenu.options[i].value) == Number(userID))
        {
            selectMenu[i].remove();
            break;
        }
    }
}