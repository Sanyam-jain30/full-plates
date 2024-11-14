images = ["../images/restaurant1.jpg", "../images/restaurant2.jpg", "../images/restaurant3.jpg", "../images/restaurant4.jpg", "../images/restaurant5.jpg"];

document.getElementById("donationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const restaurantName = document.getElementById("restaurantName").value;
    const foodName = document.getElementById("foodName").value;
    const quantity = document.getElementById("quantity").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const pickupAvailability = document.getElementById("pickupAvailability").value;
    const sponsored = false;
    const location = document.getElementById("location").value;
    const year = new Date().getFullYear();
    const resimage = images[Math.floor(Math.random() * images.length)];

    const donation = {
        restaurantName,
        foodName,
        quantity,
        expiryDate,
        pickupAvailability,
        location,
        sponsored,
        year,
        resimage,
        transportationCost: Math.floor(Math.random() * 100) + 50
    };

    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.push(donation);
    
    localStorage.setItem("donations", JSON.stringify(donations));

    document.getElementById("confirmationMessage").classList.remove("hidden");
});

