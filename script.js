
// ================= 1. SELECT HTML ELEMENTS =================
// We select HTML elements so JavaScript can control them.

const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const topBtn = document.getElementById("topBtn");
const currentYear = document.getElementById("currentYear");


// ================= 2. DARK / LIGHT THEME =================
// Read the saved theme when the website opens.
// If no theme was saved, use dark theme by default.

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

// Change the theme when the theme button is clicked.
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    // Check which theme is currently active.
    const isLightTheme = document.body.classList.contains("light-theme");

    // Save the selected theme so it remains after refreshing.
    if (isLightTheme) {
        localStorage.setItem("portfolio-theme", "light");
        themeBtn.textContent = "☾";
    } else {
        localStorage.setItem("portfolio-theme", "dark");
        themeBtn.textContent = "☀";
    }
});

// Set the correct icon when the page initially loads.
if (document.body.classList.contains("light-theme")) {
    themeBtn.textContent = "☾";
} else {
    themeBtn.textContent = "☀";
}


// ================= 3. MOBILE NAVIGATION =================
// Open or close the navigation menu on small screens.

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    // Change the symbol to indicate the menu state.
    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
        menuBtn.setAttribute("aria-label", "Close navigation");
    } else {
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-label", "Open navigation");
    }
});

// Close the mobile menu after clicking any navigation link.
const navigationItems = document.querySelectorAll(".nav-links a");

navigationItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-label", "Open navigation");
    });
});


// ================= 4. PROJECT FILTERS =================
// Show only the projects matching the selected category.

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // Remove the active style from all filter buttons.
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        // Highlight the button that was clicked.
        button.classList.add("active");

        // Read the selected category: all, java or javascript.
        const selectedFilter = button.dataset.filter;

        projectCards.forEach(function (card) {
            const projectCategory = card.dataset.category;

            // Show every card for "all"; otherwise show matching cards.
            if (
                selectedFilter === "all" ||
                projectCategory === selectedFilter
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});


// ================= 5. ACTIVE NAVIGATION ON SCROLL =================
// Highlight the navbar link for the section currently being viewed.

const pageSections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", function () {
    let currentSection = "";

    pageSections.forEach(function (section) {
        const sectionTop = section.offsetTop - 130;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }
    });

    navigationItems.forEach(function (link) {
        link.classList.remove("active");

        // Compare the link's href with the current section ID.
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});


// ================= 6. BACK-TO-TOP BUTTON =================
// Show the button after the user scrolls down the page.

window.addEventListener("scroll", function () {
    if (window.scrollY > 350) {
        topBtn.classList.add("visible");
    } else {
        topBtn.classList.remove("visible");
    }
});

// Scroll smoothly to the top when the button is clicked.
topBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ================= 7. AUTOMATIC FOOTER YEAR =================
// Update the copyright year automatically.

currentYear.textContent = new Date().getFullYear();