function getDonations() {
    const donations = JSON.parse(localStorage.getItem("donations"));
    return donations.filter(donation => donation.collected === true);
}

function displayTopNgo(donations) {
    if (donations.length === 0) return;

    const topNgo = donations.reduce((top, current) => (current.quantity > top.quantity ? current : top), donations[0]);

    document.getElementById('top-ngo-name').textContent = topNgo.restaurantName;
    document.getElementById('top-ngo-details').textContent = `Food Collected: ${topNgo.quantity} tons | Year: ${topNgo.year}`;
}

function displayNgos(donations) {
    const ngosList = document.getElementById('ngos-list');
    ngosList.innerHTML = '';

    donations.forEach(ngo => {
        const card = document.createElement('div');
        card.classList.add('ngo-card');
        card.innerHTML = `
            <img src="${ngo.ngoimage}" alt="${ngo.restaurantName}">
            <h3>${ngo.restaurantName}</h3>
            <p>Food Collected: <span class="food-collected">${ngo.quantity} tons</span></p>
            <p>Year: ${ngo.year}</p>
        `;
        ngosList.appendChild(card);
    });
}

function sortNgos(donations, order) {
    return [...donations].sort((a, b) => {
        return order === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
    });
}

document.getElementById('sort-by-food').addEventListener('change', (e) => {
    const donations = getDonations();
    const sortedByFood = sortNgos(donations, e.target.value);
    displayNgos(sortedByFood);
});

window.onload = () => {
    const donations = getDonations();
    displayTopNgo(donations);
    displayNgos(donations);
};

