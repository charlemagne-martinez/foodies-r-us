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






window.addEventListener('DOMContentLoaded', function () {
    var modalAcceptButton = document.getElementById('modal-accept')
    if (modalAcceptButton) {
        modalAcceptButton.addEventListener('click', hideLocationgModal)
    }

    var modalHideButtons = document.getElementsByClassName('modal-hide-button')
    for (var i = 0; i < modalHideButtons.length; i++) {
        modalHideButtons[i].addEventListener('click', hideLocationgModal)
    }

    var modalAcceptButton = document.getElementById('modal-accept')
    if (modalAcceptButton) {
        modalAcceptButton.addEventListener('click', hideUserModal)
    }

    var modalHideButtons = document.getElementsByClassName('modal-hide-button')
    for (var i = 0; i < modalHideButtons.length; i++) {
        modalHideButtons[i].addEventListener('click', hideUserModal)
    }

})

