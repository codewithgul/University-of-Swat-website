document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. DISPLAY CURRENT DATE
    // =====================================

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


    // =====================================
    // 2. STUDENT QUICK ACCESS SEARCH
    // =====================================

    const searchInput = document.getElementById("student-search");
    const cards = document.querySelectorAll(".quick-card");
    const message = document.getElementById("search-message");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText = searchInput.value.trim().toLowerCase();
            let visibleCards = 0;

            cards.forEach(function (card) {

                const cardText = card.textContent.toLowerCase();

                if (cardText.includes(searchText)) {
                    card.hidden = false;
                    visibleCards++;
                } else {
                    card.hidden = true;
                }

            });

            if (message) {
                if (visibleCards === 0) {
                    message.textContent = "No matching services found.";
                } else {
                    message.textContent = "";
                }
            }

        });

    }


    // =====================================
    // 3. BACK TO TOP AND SCROLL DOWN
    // =====================================

    const backToTop = document.getElementById("backToTop");
    const scrollDown = document.getElementById("scrollDown");

    function updateScrollButtons() {

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
                    ? "block"
                    : "none";
        }

    }

    window.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    updateScrollButtons();

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


    // =====================================
    // 4. READING PROGRESS BAR
    // =====================================

    const progressBar = document.getElementById("progressBar");

    function updateProgressBar() {

        if (!progressBar) return;

        const scrollTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        let progress = 0;

        if (pageHeight > 0) {
            progress = (scrollTop / pageHeight) * 100;
        }

        progressBar.style.width = progress + "%";

    }

    window.addEventListener("scroll", updateProgressBar);
    window.addEventListener("resize", updateProgressBar);

    updateProgressBar();


    // =====================================
    // 5. ACTIVE NAVIGATION HIGHLIGHT
    // =====================================

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(
        ".navbar .nav-link[href^='#']"
    );

    function updateActiveLink() {

        let currentSection = "";

        const scrollPosition = window.scrollY + 180;

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const linkTarget = link.getAttribute("href");

            if (linkTarget === "#" + currentSection && currentSection !== "") {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);
    window.addEventListener("resize", updateActiveLink);

    updateActiveLink();

});