images = ["../images/ngo1.jpg", "../images/ngo2.jpg", "../images/ngo3.jpg", "../images/ngo4.jpg", "../images/ngo5.jpg"];

window.onload = function() {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    const foodCardsContainer = document.getElementById("foodCards");
    const availableDonations = donations.filter(donation => !donation.collected);

    availableDonations.forEach((donation, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${donation.foodName}</h3>
            <p><strong>Restaurant Name:</strong> ${donation.restaurantName}</p>
            <p><strong>Quantity:</strong> ${donation.quantity} servings</p>
            <p><strong>Expiry Date:</strong> ${donation.expiryDate}</p>
            <p class="sponsored">${donation.sponsored ? `Sponsored by: ${donation.sponsor}` : 'Not Sponsored'}</p>
            <button data-index="${index}">Collect Food</button>
        `;

        foodCardsContainer.appendChild(card);

        const collectButton = card.querySelector("button");

        collectButton.addEventListener("click", function() {
            const selectedIndex = this.getAttribute("data-index");
            const ngoName = document.getElementById("ngoName").value.trim();

            if (!ngoName) {
                alert("Please enter your NGO's name.");
                return;
            }

            donations[selectedIndex].collected = true;
            donations[selectedIndex].ngo = ngoName;
            donations[selectedIndex].ngoimage = images[Math.floor(Math.random() * images.length)];

            localStorage.setItem("donations", JSON.stringify(donations));
            
            document.getElementById("thankYouMessage").classList.remove("hidden");
            foodCardsContainer.innerHTML = '';
        });
    });
};

