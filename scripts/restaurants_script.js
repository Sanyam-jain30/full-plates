function getDonations() {
    const donations = JSON.parse(localStorage.getItem("donations"));
    return donations;
}

function displayTopRestaurant(donations) {
    if (donations.length === 0) return;

    const topRestaurant = donations.reduce((top, current) => 
        (current.quantity > top.quantity ? current : top), donations[0]);

    document.getElementById('top-restaurant-name').textContent = topRestaurant.restaurantName;
    document.getElementById('top-restaurant-details').textContent = 
        `Food Donated: ${topRestaurant.quantity} tons | Year: ${topRestaurant.year}`;
}

function displayRestaurants(donations) {
    const restaurantsList = document.getElementById('restaurants-list');
    restaurantsList.innerHTML = ''; 

    donations.forEach(donation => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card');
        card.innerHTML = `
            <img src="${donation.resimage}" alt="${donation.restaurantName}">
            <h3>${donation.restaurantName}</h3>
            <p>Food Donated: <span class="food-donated">${donation.quantity} tons</span></p>
            <p>Year: ${donation.year}</p>
        `;
        restaurantsList.appendChild(card);
    });
}

function sortRestaurants(donations, order) {
    return [...donations].sort((a, b) => {
        return order === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
    });
}

document.getElementById('sort-by-food').addEventListener('change', (e) => {
    const donations = getDonations();
    const sortedByFood = sortRestaurants(donations, e.target.value);
    displayRestaurants(sortedByFood);
});

window.onload = () => {
    const donations = getDonations();
    displayTopRestaurant(donations);
    displayRestaurants(donations);
};

