/*
 *
 * No citations were used for this page
 * 
 */

function updateLocation(locationID, city, state, country) {
    console.log("locationID: ", locationID);

    var showSomethingModal = document.getElementById('update-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    showSomethingModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

    
    document.getElementById("update-locationID").value = locationID
    document.getElementById("update-city").value = city
    document.getElementById("update-state").value = state
    document.getElementById("update-country").value = country

}

function hideLocationModal() {
    var showSomethingModal = document.getElementById('update-modal')
    var modalBackdrop = document.getElementById('modal-backdrop')

    showSomethingModal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')

}

function updateUser(userID, first, last, username, email, password){
    var showSomethingModal = document.getElementById('update-modal-user');
    var modalBackdrop = document.getElementById('modal-backdrop-user');

    showSomethingModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

    document.getElementById("update-userID").value = userID
    document.getElementById("update-fName").value = first
    document.getElementById("update-lName").value = last
    document.getElementById("update-username").value = username
    document.getElementById("update-email").value = email
    document.getElementById("update-password").value = password 
}

function hideUserModal() {
    var showSomethingModal = document.getElementById('update-modal-user')
    var modalBackdrop = document.getElementById('modal-backdrop-user')

    showSomethingModal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')

}

function updateCuisineType(cuisineID, type){
    var showSomethingModal = document.getElementById('update-modal-cuisine');
    var modalBackdrop = document.getElementById('modal-backdrop-cuisine');

    showSomethingModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

    document.getElementById("update-cuisineID").value = cuisineID
    document.getElementById("update-type").value = type

}

function hideCuisineTypeModal() {
    var showSomethingModal = document.getElementById('update-modal-cuisine')
    var modalBackdrop = document.getElementById('modal-backdrop-cuisine')

    showSomethingModal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')

}

function updateChains(chainID, name){
    var showSomethingModal = document.getElementById('update-modal-chain');
    var modalBackdrop = document.getElementById('modal-backdrop-chain');

    showSomethingModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

    document.getElementById("update-chainID").value = chainID
    document.getElementById("update-name").value = name

}

function hideChainModal() {
    var showSomethingModal = document.getElementById('update-modal-chain')
    var modalBackdrop = document.getElementById('modal-backdrop-chain')

    showSomethingModal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')

}

function updateReview(reviewID, restaurantName, userName, review) {
    var showSomethingModal = document.getElementById('update-modal-review');
    var modalBackdrop = document.getElementById('modal-backdrop-review');

    showSomethingModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

    
    document.getElementById("update-reviewID").value = reviewID

    document.getElementById("restaurantNameNoChange").innerHTML = restaurantName
    document.getElementById("userNameNoChange").innerHTML = userName

    document.getElementById("update-review").value = review

}

function hideReviewModal() {
    var showSomethingModal = document.getElementById('update-modal-review')
    var modalBackdrop = document.getElementById('modal-backdrop-review')

    showSomethingModal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')

}

function updateRestaurant(resID, locID, location, chainID, chainName, name, des, avgR, avgP, pop){
    var showSomethingModal = document.getElementById('update-modal-restaurant');
    var modalBackdrop = document.getElementById('modal-backdrop-restaurant');

    showSomethingModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
    console.log("Why are you notworking")

    document.getElementById("update-restaurantID").value = resID
    // document.getElementById("update-location").value = locID
    // document.getElementById("update-name").value = chainID
    document.getElementById("update-restaurantName").value = name
    document.getElementById("update-description").value = des
    document.getElementById("popularOrder").value = pop 

    var avgRatingSelect = document.getElementById("update-avgRating");
    for (var i = 0; i < avgRatingSelect.options.length; i++) {

        if (avgRatingSelect.options[i].value === avgR) {
            avgRatingSelect.selectedIndex = i;
            break;
        }
    }

    // Set the value of the select dropdown for Average Price
    var avgPriceSelect = document.getElementById("update-avgPrice");
    for (var j = 0; j < avgPriceSelect.options.length; j++) {
        if (avgPriceSelect.options[j].value === avgP) {
            avgPriceSelect.selectedIndex = j;
            break;
        }
    }

    // Update location FK dropdown such that it goes to current value for record
    var locationDropdown = document.getElementById("select-update-location");
    for (var i = 0; i < locationDropdown.options.length; i++) {
        if (locationDropdown.options[i].getAttribute("data-location") === location) {
            locationDropdown.selectedIndex = i;
            break;
        }
    }

    // Update chain name FK dropdown such that it goes to current value for record
    var chainDropdown = document.getElementById("select-update-chain");
    for (var j = 0; j < chainDropdown.options.length; j++) {
        if (chainDropdown.options[j].getAttribute("data-chainName") === chainName) {
            chainDropdown.selectedIndex = j;
            break;
        }
    }


}

function hideRestaurantModal() {
    var showSomethingModal = document.getElementById('update-modal-restaurant')
    var modalBackdrop = document.getElementById('modal-backdrop-restaurant')

    showSomethingModal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')
}

// Select all edit buttons with class "edit-button"
const editButtons = document.querySelectorAll('.edit-button');
const chainButton = document.querySelectorAll('.edit-button-chain')
const rcButton = document.querySelectorAll('.edit-button-rc')


// Add event listener to each edit button
editButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Extract restaurant details from button attributes
        const restaurantID = this.getAttribute('data-restaurantID');
        const locationID = this.getAttribute('data-locationID');
        const location = this.getAttribute('data-location');
        const chainID = this.getAttribute('data-chainID');
        const chainName = this.getAttribute('data-chainName');
        const restaurantName = this.getAttribute('data-restaurantName');
        const description = this.getAttribute('data-description');
        const avgRating = this.getAttribute('data-avgRating');
        const avgPrice = this.getAttribute('data-avgPrice');
        const popularOrder = this.getAttribute('data-popularOrder');

        // Call updateRestaurant function with extracted parameters
        updateRestaurant(restaurantID, locationID, location, chainID, chainName, restaurantName, description, avgRating, avgPrice, popularOrder);
    });
});

chainButton.forEach(button => {
    button.addEventListener('click', function() {
        const chainID = this.getAttribute('data-chainID')
        const name = this.getAttribute('data-name')
        updateChains(chainID,name)
    })
})

rcButton.forEach(button => {
    button.addEventListener('click', function() {
        const restID = this.getAttribute('data-restaurantID')
        const name = this.getAttribute('data-restaurantName')
        const cuisineID = this.getAttribute('data-cuisineID')
        const type = this.getAttribute('data-type')
        updateRC(restID, name, cuisineID, type)
    })
})

function updateRC(restID, restaurantName, cuisineID, type){
    console.log("updateRC function in index.js is being called!!")
    console.log("restaurantID: ", restID);
    console.log("restaurantName: ", restaurantName);
    console.log("cuisineID: ", cuisineID);
    console.log("type: ", type);

    var showSomethingModal = document.getElementById('update-modal-RC');
    var modalBackdrop = document.getElementById('modal-backdrop-RC');

    showSomethingModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

    document.getElementById("update-resaurantID").value = restID;
    document.getElementById("restaurantNameNoChange").innerHTML = restaurantName;

    // Update the dropdown option so that it goes to the current selected cuisine for the record
    var cuisineDropdown = document.getElementById("select-cuisine-update");
    for (var j = 0; j < cuisineDropdown.options.length; j++) {
        if (cuisineDropdown.options[j].getAttribute("data-cuisineType") === type) {
            cuisineDropdown.selectedIndex = j;
            break;
        }
    }
    // document.getElementById("update-type").value = type;
}

function hideRCModal() {
    var showSomethingModal = document.getElementById('update-modal-RC')
    var modalBackdrop = document.getElementById('modal-backdrop-RC')

    showSomethingModal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')

}



window.addEventListener('DOMContentLoaded', function () {
    var modalAcceptButton1 = document.getElementById('modal-accept')
    if (modalAcceptButton1) {
        modalAcceptButton1.addEventListener('click', hideLocationModal)
        modalAcceptButton1.addEventListener('click', hideCuisineTypeModal)
        modalAcceptButton1.addEventListener('click', hideUserModal)
        modalAcceptButton1.addEventListener('click', hideChainModal)
        modalAcceptButton1.addEventListener('click', hideReviewModal)
        modalAcceptButton1.addEventListener('click', hideRestaurantModal)
        modalAcceptButton1.addEventListener('click', hideRCModal)


    }

    var modalHideButtons1 = document.getElementsByClassName('modal-hide-button')
    for (var i = 0; i < modalHideButtons1.length; i++) {
        modalHideButtons1[i].addEventListener('click', hideLocationModal)
        modalHideButtons1[i].addEventListener('click', hideCuisineTypeModal)
        modalHideButtons1[i].addEventListener('click', hideUserModal)
        modalHideButtons1[i].addEventListener('click', hideChainModal)
        modalHideButtons1[i].addEventListener('click', hideReviewModal)
        modalHideButtons1[i].addEventListener('click', hideRestaurantModal)
        modalHideButtons1[i].addEventListener('click', hideRCModal)

    }

})

