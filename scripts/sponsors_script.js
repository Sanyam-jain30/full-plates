function getDonations() {
    const donations = JSON.parse(localStorage.getItem("donations"));
    return donations;
}

function getSponsoredSponsors(donations) {
    return donations.filter(donation => donation.sponsored === true).map(donation => ({
        name: donation.sponsor,  
        amount: donation.quantity,      
        year: donation.year            
    }));
}

function displaySponsors(sortedSponsors) {
    const sponsorsList = document.getElementById('sponsors-list');
    sponsorsList.innerHTML = ''; 

    sortedSponsors.forEach(sponsor => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${sponsor.name}</span>
            <span class="amount">$${sponsor.amount}</span>
            <span>Year: ${sponsor.year}</span>
        `;
        sponsorsList.appendChild(li);
    });
}

function displayTopSponsor(sponsors) {
    if (sponsors.length === 0) return;  

    const topSponsor = sponsors.reduce((top, current) => 
        (current.amount > top.amount ? current : top), sponsors[0]);

    document.getElementById('top-sponsor-name').textContent = topSponsor.name;
    document.getElementById('top-sponsor-details').textContent = 
        `Amount: $${topSponsor.amount} | Year: ${topSponsor.year}`;
}

function sortSponsors(sponsors, criteria, order) {
    return [...sponsors].sort((a, b) => {
        if (criteria === 'amount') {
            return order === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        } else if (criteria === 'year') {
            return order === 'asc' ? a.year - b.year : b.year - a.year;
        }
    });
}

document.getElementById('sort-by-amount').addEventListener('change', (e) => {
    const donations = getDonations();
    const sponsoredSponsors = getSponsoredSponsors(donations);  
    const sortedByAmount = sortSponsors(sponsoredSponsors, 'amount', e.target.value);
    displaySponsors(sortedByAmount);
});

document.getElementById('sort-by-year').addEventListener('change', (e) => {
    const donations = getDonations();
    const sponsoredSponsors = getSponsoredSponsors(donations);  
    const sortedByYear = sortSponsors(sponsoredSponsors, 'year', e.target.value);
    displaySponsors(sortedByYear);
});

window.onload = () => {
    const donations = getDonations();
    const sponsoredSponsors = getSponsoredSponsors(donations);  
    displayTopSponsor(sponsoredSponsors);  
    displaySponsors(sponsoredSponsors);    
};

