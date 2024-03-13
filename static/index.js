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

function hideSellSomethingModal() {
    var showSomethingModal = document.getElementById('update-modal')
    var modalBackdrop = document.getElementById('modal-backdrop')

    showSomethingModal.classList.add('hidden')
    modalBackdrop.classList.add('hidden')

}

function handleModalAcceptClick() {
    
    //clear items
    hideSellSomethingModal()
    
}


window.addEventListener('DOMContentLoaded', function () {

    var modalAcceptButton = document.getElementById('modal-accept')
    if (modalAcceptButton) {
        modalAcceptButton.addEventListener('click', handleModalAcceptClick)
    }

    var modalHideButtons = document.getElementsByClassName('modal-hide-button')
    for (var i = 0; i < modalHideButtons.length; i++) {
        modalHideButtons[i].addEventListener('click', hideSellSomethingModal)
    }

})

