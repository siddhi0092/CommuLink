// Load profile data from localStorage
function loadProfile() {
    const name = localStorage.getItem("name") || "John Doe";
    const email = localStorage.getItem("email") || "john.doe@example.com";
    const bio = localStorage.getItem("bio") || "Tell us about yourself";
    const interests = localStorage.getItem("interests") || "Add your interests";
    const location = localStorage.getItem("location") || "New York, USA";

    document.getElementById("profile-name").textContent = name;
    document.getElementById("profile-email").textContent = email;
    document.getElementById("profile-location").textContent = location;

    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("bio").value = bio;
    document.getElementById("interests").value = interests;
    document.getElementById("location").value = location;
}

// Enable editing of profile fields
function enableEdit() {
    const inputs = document.querySelectorAll("#profile-form input, #profile-form textarea");
    inputs.forEach(input => input.disabled = false);
    document.querySelector(".btn-save").style.display = "block";
}

// Save profile data to localStorage
function saveProfile() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    const interests = document.getElementById("interests").value;
    const location = document.getElementById("location").value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("bio", bio);
    localStorage.setItem("interests", interests);
    localStorage.setItem("location", location);

    loadProfile(); // Refresh profile data
    alert("Profile updated successfully!");
}

// Initialize map
function initMap() {
    const map = L.map("map").setView([40.7128, -74.0060], 10); // Default to New York
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker([40.7128, -74.0060], { draggable: true }).addTo(map);
    marker.on("dragend", function (e) {
        const location = marker.getLatLng();
        localStorage.setItem("latitude", location.lat);
        localStorage.setItem("longitude", location.lng);
        alert(`Location set to: ${location.lat}, ${location.lng}`);
    });
}

// Load profile and map on page load
window.onload = function () {
    loadProfile();
    initMap();
};