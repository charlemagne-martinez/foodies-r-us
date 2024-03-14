function updateLocation(locationID, city, state, country) {
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

function updateReview(reviewID, review) {
    var showSomethingModal = document.getElementById('update-modal-review');
    var modalBackdrop = document.getElementById('modal-backdrop-review');

    showSomethingModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

    
    document.getElementById("update-reviewID").value = reviewID
    document.getElementById("update-review").value = review

}

function hideReviewModal() {
    var showSomethingModal = document.getElementById('update-modal-review')
    var modalBackdrop = document.getElementById('modal-backdrop-review')

    showSomethingModal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')

}

function updateRestaurant(resID, locID, chainID, name, des, avgR, avgP, pop){
    var showSomethingModal = document.getElementById('update-modal-restaurant');
    var modalBackdrop = document.getElementById('modal-backdrop-restaurant');

    showSomethingModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');

    document.getElementById("update-restaurantID").value = resID
    document.getElementById("update-location").value = locID
    document.getElementById("update-name").value = chainID
    document.getElementById("update-restaurantName").value = name
    document.getElementById("update-description").value = des
    document.getElementById("update-avgRating").value = avgR 
    document.getElementById("update-avgPrice").value = avgP
    document.getElementById("popularOrder").value = pop 

    var locationDropdown = document.getElementById("select-update-location");
    for (var i = 0; i < locationDropdown.options.length; i++) {
        if (locationDropdown.options[i].getAttribute("data-locationID") === locID) {
            locationDropdown.selectedIndex = i;
            break;
        }
    }

    // Select the option in the chain dropdown whose data-chainID matches chainID
    var chainDropdown = document.getElementById("select-update-chain");
    for (var j = 0; j < chainDropdown.options.length; j++) {
        if (chainDropdown.options[j].getAttribute("data-chainID") === chainID) {
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



window.addEventListener('DOMContentLoaded', function () {
    var modalAcceptButton1 = document.getElementById('modal-accept')
    if (modalAcceptButton1) {
        modalAcceptButton1.addEventListener('click', hideLocationModal)
        modalAcceptButton1.addEventListener('click', hideCuisineTypeModal)
        modalAcceptButton1.addEventListener('click', hideUserModal)
        modalAcceptButton1.addEventListener('click', hideChainModal)
        modalAcceptButton1.addEventListener('click', hideReviewModal)
        modalAcceptButton1.addEventListener('click', hideRestaurantModal)


    }

    var modalHideButtons1 = document.getElementsByClassName('modal-hide-button')
    for (var i = 0; i < modalHideButtons1.length; i++) {
        modalHideButtons1[i].addEventListener('click', hideLocationModal)
        modalHideButtons1[i].addEventListener('click', hideCuisineTypeModal)
        modalHideButtons1[i].addEventListener('click', hideUserModal)
        modalHideButtons1[i].addEventListener('click', hideChainModal)
        modalHideButtons1[i].addEventListener('click', hideReviewModal)
        modalHideButtons1[i].addEventListener('click', hideRestaurantModal)
        
    }

})

