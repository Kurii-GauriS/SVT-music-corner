function getUserProfile() {
    const savedProfile = localStorage.getItem("userProfile");

    if (!savedProfile) {
        return null;
    }

    return JSON.parse(savedProfile);
}


function loadUserProfile() {
    const profile = getUserProfile();

    if (!profile) {
        return;
    }

    // Profile name
    const names = document.querySelectorAll(".user-name");

    names.forEach(element => {
        element.textContent = profile.name;
    });

    // Bias name
    const biases = document.querySelectorAll(".user-bias");

    biases.forEach(element => {
        element.textContent = profile.biasName;
    });

    // Profile image
    const images = document.querySelectorAll(".user-avatar");

    images.forEach(image => {
        image.src = profile.biasImage;
        image.alt = profile.biasName;
    });
}


document.addEventListener("DOMContentLoaded", loadUserProfile);