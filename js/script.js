// Data for circles and sections
const circlesData = [
    { title: 'Bus', image: '../images/busCat.jpg' },
    { title: 'Train', image: '../images/trainCat.jpg' },
    { title: 'Plane', image: '../images/planeCat.jpg' },
    { title: 'Concert', image: '../images/concertCat.jpg' },
    { title: 'Football', image: '../images/footballCat.jpg' },
    { title: 'Planned Trips', image: '../images/plannedTripsCat.jpg' },
    { title: 'Cinema', image: '../images/cinemaCat.jpg' }  
];

const sectionsData = [
    {
        title: 'Bus',
        items: [
            { name: 'Headset', img_path: '../images/' },
            { name: 'Keyboard', img_path: '../images/' }
        ]
    },
    {
        title: 'Train',
        items: [
            { name: 'Headset', img_path: '../images/' },
            { name: 'Keyboard', img_path: '../images/' }
        ]
    },
    {
        title: 'Plane',
        items: [
            { name: 'Headset', img_path: '../images/' },
            { name: 'Keyboard', img_path: '../images/' }
        ]
    },
    {
        title: 'Concert',
        items: [
            { name: 'Headset', img_path: '../images/' },
            { name: 'Keyboard', img_path: '../images/' }
        ]
    },
    {
        title: 'Football',
        items: [
            { name: 'Headset', img_path: '../images/' },
            { name: 'Keyboard', img_path: '../images/' }
        ]
    },
    {
        title: 'Planned Trips',
        items: [
            { name: 'Headset', img_path: '../images/' },
            { name: 'Keyboard', img_path: '../images/' }
        ]
    }
];

// Render circles independently
const section_Categories = document.getElementById('section-Categories');
function renderCircles() {
    section_Categories.innerHTML = circlesData.map(circle => `
        <div class="section-Category">
            <a href="#">
                <div class="circle" style="background-image: url(${circle.image});">
                    <div class="overlay">
                        <h5>${circle.title}</h5>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

// Render sections independently
const sections = document.getElementById('sections');
function renderSections() {
    sections.innerHTML = sectionsData.map(section => `
        <div class="section">
            <h2>${section.title}</h2>
            <div class="items">
                ${section.items.map(item => `
                    <div class="item">
                        <img src="${item.img_path}" alt="${item.name}">
                        <p>${item.name}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Render circles independently with links to their respective pages
const sections_Categories = document.getElementById('section-Categories');
function renderCircles() {
    section_Categories.innerHTML = circlesData.map(circle => `
        <div class="section-Category">
            <a href="Concert/${circle.title}.html">
                <div class="circle" style="background-image: url(${circle.image});">
                    <div class="overlay">
                        <h5>${circle.title}</h5>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

// Render sections independently
const section = document.getElementById('sections');
function renderSections() {
    sections.innerHTML = sectionsData.map(section => `
        <div class="section">
            <h2>${section.title}</h2>
            <div class="items">
                ${section.items.map(item => `
                    <div class="item">
                        <img src="${item.img_path}" alt="${item.name}">
                        <p>${item.name}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Call the render functions separately
renderCircles();
renderSections();


// ///////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', async function () {
    const userInfo = document.getElementById("user_info");
    const links = document.getElementById("links");
    const logOutBtn = document.getElementById("logout");
    const shoppingCartIcon = document.querySelector(".shopping_cart");
    const cartsProducts = document.querySelector(".carts_products");
    
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");
    let username;

    // Check if the token exists and fetch user data
    if (token) {
        try {
            // Update this URL to your actual user data endpoint
            const response = await fetch('http://127.0.0.1:5500/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                username = data.username;

                if (links) links.style.display = "none";
                if (userInfo) {
                    userInfo.style.display = "flex";
                    userInfo.innerHTML += `<a href="User/userEdit.html">${username}</a>`;
                }
            } else if (response.status === 401) {
                alert('Your session has expired. Please log in again.');
                localStorage.clear();
                window.location = "login.html";
            } else {
                console.error('Failed to fetch user data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert("An error occurred. Please try again later.");
        }
    } else {
        if (userInfo) userInfo.style.display = "none";
        if (links) links.style.display = "block";
    }

    // Log out functionality
    if (logOutBtn) {
        logOutBtn.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.clear();
            alert("You have been logged out");
            window.location = "login.html";
        });
    }

    // Show cart when clicking on the icon
    if (shoppingCartIcon) {
        shoppingCartIcon.addEventListener("click", function (event) {
            event.stopPropagation();
            cartsProducts.style.display = cartsProducts.style.display === "block" ? "none" : "block";
        });
    }

    // Hide cart when clicking outside of it
    document.addEventListener("click", function () {
        if (cartsProducts) cartsProducts.style.display = "none";
    });
});
