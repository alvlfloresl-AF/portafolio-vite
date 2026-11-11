document.addEventListener("DOMContentLoaded", () => {
    const miCarrusel = new Carousel("carruselProyectos", 5);
    miCarrusel.init();

    setupNavToggle();
    setupThemeToggle();
    setupContactForm();
});

class Carousel {
    constructor(carouselId, tickTimeInSeconds = 5) {
        this.carouselHolder = document.getElementById(carouselId);
        this.track = this.carouselHolder.querySelector(".track");
        this.slides = [...this.track.querySelectorAll(".slide")];
        this.minLimit = 0;
        this.maxLimit = this.slides.length - 1;
        this.currentIndex = 0;
        this.tickTime = tickTimeInSeconds * 1000;
        this.tickerId = null;
        this.dots = [];
    }

    init() {
        this.generateNavigationUI();
        this.generateDots();
        this.updateUI();
        this.tick();
        this.carouselHolder.addEventListener("mouseenter", () => this.stop());
        this.carouselHolder.addEventListener("mouseleave", () => this.tick());
    }

    tick() {
        this.stop();
        this.tickerId = setInterval(() => this.moveNext(), this.tickTime);
    }

    stop() {
        clearInterval(this.tickerId);
    }

    moveNext() {
        const nextIndex = this.currentIndex === this.maxLimit ? this.minLimit : this.currentIndex + 1;
        this.moveTo(nextIndex);
    }

    movePrev() {
        const prevIndex = this.currentIndex === this.minLimit ? this.maxLimit : this.currentIndex - 1;
        this.moveTo(prevIndex);
    }

    moveTo(newIndex) {
        this.currentIndex = newIndex;
        this.updateUI();
    }

    updateUI() {
        this.track.style.transform = `translateX(-${100 * this.currentIndex}%)`;
        this.dots.forEach((dot, i) => dot.classList.toggle("active", i === this.currentIndex));
    }

    generateNavigationUI() {
        const btnLeft = document.createElement("button");
        const btnRight = document.createElement("button");

        btnLeft.classList.add("carousel-btn", "btnleft");
        btnLeft.innerHTML = "&#8592;";
        btnLeft.setAttribute("aria-label", "Proyecto anterior");

        btnRight.classList.add("carousel-btn", "btnright");
        btnRight.innerHTML = "&#8594;";
        btnRight.setAttribute("aria-label", "Siguiente proyecto");

        btnLeft.onclick = () => { this.movePrev(); this.tick(); };
        btnRight.onclick = () => { this.moveNext(); this.tick(); };

        this.carouselHolder.appendChild(btnLeft);
        this.carouselHolder.appendChild(btnRight);
    }

    generateDots() {
        const dotsWrap = document.createElement("div");
        dotsWrap.classList.add("carousel-dots");

        this.slides.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.setAttribute("aria-label", `Ir al proyecto ${i + 1}`);
            dot.onclick = () => { this.moveTo(i); this.tick(); };
            dotsWrap.appendChild(dot);
            this.dots.push(dot);
        });

        this.carouselHolder.insertAdjacentElement("afterend", dotsWrap);
    }
}

function setupNavToggle() {
    const toggle = document.getElementById("navToggle");
    const list = document.getElementById("navList");

    toggle.addEventListener("click", () => {
        const isOpen = list.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    list.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            list.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setupThemeToggle() {
    const button = document.getElementById("themeToggle");
    const root = document.documentElement;

    const saved = localStorage.getItem("portfolio-theme");
    if (saved) {
        root.setAttribute("data-theme", saved);
        button.textContent = saved === "light" ? "☀️" : "🌙";
    }

    button.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
        const next = current === "light" ? "dark" : "light";

        if (next === "dark") {
            root.removeAttribute("data-theme");
        } else {
            root.setAttribute("data-theme", "light");
        }

        localStorage.setItem("portfolio-theme", next);
        button.textContent = next === "light" ? "☀️" : "🌙";
    });
}

function setupContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            status.textContent = "Revisa los campos marcados antes de enviar.";
            status.style.color = "#c0392b";
            form.reportValidity();
            return;
        }
        status.textContent = "¡Gracias! Tu mensaje quedó listo para enviarse.";
        status.style.color = "";
        form.reset();
    });
}
