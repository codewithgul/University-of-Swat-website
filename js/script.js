// Display current date

document.addEventListener("DOMContentLoaded", function () {

    const dateElement = document.getElementById("current-date");

    if (dateElement) {
        const today = new Date();

        dateElement.textContent = today.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

});

// Student Quick Access Search

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("student-search");
    const cards = document.querySelectorAll(".quick-card");
    const message = document.getElementById("search-message");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText = searchInput.value.toLowerCase();
            let visibleCards = 0;

            cards.forEach(function (card) {

                const cardText = card.textContent.toLowerCase();

                if (cardText.includes(searchText)) {
                    card.style.display = "";
                    visibleCards++;
                } else {
                    card.style.display = "none";
                }

            });

            if (visibleCards === 0) {
                message.textContent = "No matching services found.";
            } else {
                message.textContent = "";
            }

        });

    }

});

// Smart Scroll Buttons

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.getElementById("backToTop");
    const scrollDown = document.getElementById("scrollDown");

    function updateButtons() {

        const scrollPosition = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        if (backToTop) {
            backToTop.style.display =
                scrollPosition > 300 ? "block" : "none";
        }

        if (scrollDown) {
            scrollDown.style.display =
                scrollPosition + windowHeight < pageHeight - 50
                ? "block" : "none";
        }

    }

    window.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    updateButtons();

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    if (scrollDown) {
        scrollDown.addEventListener("click", function () {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth"
            });
        });
    }

});

// Reading Progress Bar

window.addEventListener("scroll", function () {

    const scrollTop = window.scrollY;
    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / pageHeight) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";

});

// Active Navigation Highlight

document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
        ".navbar .nav-link[href^='#']"
    );

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

});