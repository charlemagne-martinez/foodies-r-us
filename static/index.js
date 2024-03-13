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

function hideLocationgModal() {
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






window.addEventListener('DOMContentLoaded', function () {
    var modalAcceptButton1 = document.getElementById('modal-accept')
    if (modalAcceptButton1) {
        modalAcceptButton1.addEventListener('click', hideLocationgModal)
        modalAcceptButton1.addEventListener('click', hideCuisineTypeModal)
        modalAcceptButton1.addEventListener('click', hideUserModal)

    }

    var modalHideButtons1 = document.getElementsByClassName('modal-hide-button')
    for (var i = 0; i < modalHideButtons1.length; i++) {
        modalHideButtons1[i].addEventListener('click', hideLocationgModal)
        modalHideButtons1[i].addEventListener('click', hideCuisineTypeModal)
        modalHideButtons1[i].addEventListener('click', hideUserModal)

    }

    // var modalAcceptButton2 = document.getElementById('modal-accept')
    // if (modalAcceptButton2) {
    //     modalAcceptButton2.addEventListener('click', hideUserModal)
    // }

    // var modalHideButtons2 = document.getElementsByClassName('modal-hide-button')
    // for (var i = 0; i < modalHideButtons2.length; i++) {
    //     modalHideButtons2[i].addEventListener('click', hideUserModal)
    // }

    // var modalAcceptButton3 = document.getElementById('modal-accept')
    // if (modalAcceptButton3) {
    //     modalAcceptButton3.addEventListener('click', hideCuisineTypeModal)
    // }

    // var modalHideButtons3 = document.getElementsByClassName('modal-hide-button')
    // for (var i = 0; i < modalHideButtons3.length; i++) {
    //     modalHideButtons3[i].addEventListener('click', hideCuisineTypeModal)
    // }

})

