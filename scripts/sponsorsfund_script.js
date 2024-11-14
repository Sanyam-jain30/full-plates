window.onload = function() {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    const restaurantCardsContainer = document.getElementById("restaurantCards");

    const unsponsoredDonations = donations.filter(donation => !donation.sponsored);

    unsponsoredDonations.forEach((donation, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${donation.restaurantName}</h3>
            <p><strong>Quantity of Food:</strong> ${donation.quantity} servings</p>
            <p><strong>Location:</strong> ${donation.location}</p>
            <p class="price"><strong>Transportation Cost:</strong> $${donation.transportationCost}</p>
            <button data-index="${index}">Donate</button>
        `;

        restaurantCardsContainer.appendChild(card);

        const donateButton = card.querySelector("button");

        donateButton.addEventListener("click", function() {
            const selectedIndex = this.getAttribute("data-index");

            const sponsorName = document.getElementById("sponsorName").value.trim();

            if (!sponsorName) {
                alert("Please enter your name or company name.");
                return;
            }

            donations[selectedIndex].sponsored = true;
            donations[selectedIndex].sponsor = sponsorName;

            localStorage.setItem("donations", JSON.stringify(donations));

            document.getElementById("thankYouMessage").classList.remove("hidden");

            restaurantCardsContainer.innerHTML = '';
        });
    });
};

