document.addEventListener("DOMContentLoaded", () => {
    // Scroll Reveal Effect
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger on load to show initial elements

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-item");

    const highlightNavigation = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // offset for better UX
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if(link.getAttribute("href").includes(sectionId)) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", highlightNavigation);
    
    // Smooth Scrolling for Nav Links
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 40,
                    behavior: "smooth"
                });
            }
        });
    });

    // Language Toggle
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.getAttribute("data-lang");
            
            langBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            document.body.classList.remove("lang-vi", "lang-en");
            document.body.classList.add(`lang-${lang}`);
            
            localStorage.setItem("cv-lang", lang);
        });
    });

    const savedLang = localStorage.getItem("cv-lang") || "vi";
    const activeBtn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
    if(activeBtn) {
        activeBtn.click();
    }
});
