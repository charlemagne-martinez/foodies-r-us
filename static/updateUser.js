
// Get the select element
let selectUser = document.querySelector('#selectUser');

// Add event listener for change event
selectUser.addEventListener("change", function (e) {
    // Get the selected option
    let selectedOption = selectUser.options[selectUser.selectedIndex];

    // Populate the form fields with the data from the selected option
    document.getElementById("update-fName").value = selectedOption.getAttribute('data-fName');
    document.getElementById("update-lName").value = selectedOption.getAttribute('data-lName');
    document.getElementById("update-email").value = selectedOption.getAttribute('data-email');
    document.getElementById("update-password").value = selectedOption.getAttribute('data-password');
    document.getElementById("update-username").value = selectedOption.getAttribute('data-username');
});
