/* ==========================================
   Umer Shahid Portfolio Script
   ========================================== */

/* --- Initialization --- */
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initSkillBars();
    initProjectModals();
    initThemeToggle();
    initContactForm();
    initBackToTop();
    initParticles();
});

/* --- Smooth Navigation & Active Section --- */
function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            // Close mobile menu
            if (hamburger && navMenu) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    });

    // Active section highlighting on scroll
    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section[id]");
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });

        // Navbar background on scroll
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });
}

/* --- Scroll Reveal Animations --- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // Don't unobserve - allows re-animation if needed
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    document.querySelectorAll(".scroll-reveal").forEach(el => {
        observer.observe(el);
    });
}

/* --- Typing Effect for Hero Section --- */
function initTypingEffect() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;

    const texts = [
        "AI & Machine Learning Engineer",
        "Full-Stack Developer",
        "Python & Data Science Expert",
        "Deep Learning Specialist"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseTime = 2000;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let timeout = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            timeout = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            timeout = 500;
        }

        setTimeout(type, timeout);
    }

    type();
}

/* --- Skill Bars Animation --- */
function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute("data-progress");
                bar.style.width = targetWidth + "%";
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

/* --- Project Modals --- */
function initProjectModals() {
    const projectCards = document.querySelectorAll(".project-card");
    const modal = document.getElementById("projectModal");
    
    if (!modal) return;

    const modalClose = modal.querySelector(".modal-close");
    const modalTitle = modal.querySelector(".modal-title");
    const modalDescription = modal.querySelector(".modal-description");
    const modalTechStack = modal.querySelector(".modal-tech-stack");
    const modalLiveLink = modal.querySelector(".modal-live-link");
    const modalGithubLink = modal.querySelector(".modal-github-link");

    // Project data
    const projectData = [
        {
            title: "AI Chatbot Assistant",
            desc: "Built an advanced AI-powered customer support chatbot using natural language processing (NLP) techniques and deep learning models. The chatbot uses transformer-based architecture for context-aware responses and can handle multiple languages. Features include sentiment analysis, conversation history tracking, and seamless integration with CRM systems.",
            tech: ["Python", "TensorFlow", "NLP", "FastAPI", "React", "PostgreSQL"],
            live: "#",
            github: "#"
        },
        {
            title: "E-Commerce Analytics Dashboard",
            desc: "Developed a comprehensive real-time analytics dashboard for e-commerce businesses. Features include sales forecasting using ARIMA/Prophet models, customer segmentation analysis, product recommendation engine, and interactive data visualizations. The dashboard processes millions of transactions daily with sub-second query performance.",
            tech: ["Python", "Pandas", "Plotly", "Flask", "MongoDB", "Redis"],
            live: "#",
            github: "#"
        },
        {
            title: "Image Classification System",
            desc: "Created a high-accuracy image classification system using convolutional neural networks (CNNs) trained on custom datasets. The system achieves 98.5% accuracy on test data and supports real-time inference through an optimized deployment pipeline. Features include transfer learning, data augmentation, and model explainability tools.",
            tech: ["PyTorch", "OpenCV", "Docker", "AWS", "Flask"],
            live: "#",
            github: "#"
        },
        {
            title: "Smart Home IoT Platform",
            desc: "Designed and built an intelligent IoT platform for smart home automation. The platform uses machine learning to learn user preferences and automatically adjusts lighting, temperature, and security settings. Features include voice control integration, energy usage optimization, and predictive maintenance alerts.",
            tech: ["Python", "MQTT", "TensorFlow Lite", "React Native", "Node.js"],
            live: "#",
            github: "#"
        },
        {
            title: "Stock Market Predictor",
            desc: "Built a sophisticated stock market prediction system using LSTM neural networks and sentiment analysis from financial news. The system processes real-time market data and social media feeds to generate trading signals. Includes backtesting framework, risk assessment tools, and portfolio optimization algorithms.",
            tech: ["Python", "Keras", "Scrapy", "PostgreSQL", "D3.js"],
            live: "#",
            github: "#"
        },
        {
            title: "Restaurant Website & Booking",
            desc: "Created a highly styled, modern promotional platform and booking system for a fine dining restaurant. Features include a dynamic menu system, real-time table reservation with capacity management, and an integrated loyalty program with QR code rewards.",
            tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB"],
            live: "#",
            github: "#"
        }
    ];

    projectCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            const data = projectData[index];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalDescription.textContent = data.desc;
            
            // Populate tech stack
            modalTechStack.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join("");
            
            if (modalLiveLink) modalLiveLink.href = data.live;
            if (modalGithubLink) modalGithubLink.href = data.github;

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        // Hover effects
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
        });
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    // Close on overlay click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

/* --- Theme Toggle --- */
function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", () => {
        const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    });
}

/* --- Contact Form Processing (Web3Forms API) --- */
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Retrieve inputs
        const nameVal = document.getElementById("name").value.trim();
        const emailVal = document.getElementById("email").value.trim();
        const subjectVal = document.getElementById("subject").value.trim();
        const messageVal = document.getElementById("message").value.trim();
        const submitBtn = form.querySelector(".btn-submit");
        const originalText = submitBtn.innerHTML;
        
        // Basic frontend validation
        if (nameVal.length < 2) {
            alert("Name must be at least 2 characters long.");
            return;
        }
        if (messageVal.length < 10) {
            alert("Message must be at least 10 characters long.");
            return;
        }
        
        // Show loading spinner
        submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;
        submitBtn.disabled = true;
        
        try {
            // ============================================================
            // WEB3FORMS API — No backend server needed!
            // Emails are sent directly to umershahid2291@gmail.com
            // ============================================================
            const WEB3FORMS_ACCESS_KEY = "82f7e28d-528d-49b1-8dee-719cd04a0413";

            const formData = {
                access_key: WEB3FORMS_ACCESS_KEY,
                name: nameVal,
                email: emailVal,
                subject: subjectVal || "New Portfolio Contact Form Submission",
                message: messageVal,
                from_name: "Portfolio Contact Form",
                // Customize the email subject line
                subject: subjectVal 
                    ? `Portfolio Contact: ${subjectVal}` 
                    : "New Portfolio Contact Form Submission"
            };

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                // Success response animation
                form.innerHTML = `
                    <div class="form-success-message" style="text-align: center; padding: 2.5rem 1.5rem; color: #00f2fe; border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; background: rgba(0, 242, 254, 0.05); animation: modalSlideIn 0.4s ease;">
                        <i class="fa-solid fa-circle-check" style="font-size: 3.5rem; margin-bottom: 1.25rem; color: #10b981;"></i>
                        <h3 style="font-family: var(--font-heading); font-size: 1.6rem; margin-bottom: 0.75rem; color: #fff;">Message Sent Successfully!</h3>
                        <p style="color: var(--text-secondary); max-width: 450px; margin: 0 auto; line-height: 1.6;">Thank you for reaching out! I will get back to you as soon as possible.</p>
                    </div>
                `;
            } else {
                // Web3Forms returned an error
                const errorMsg = result.message || "Something went wrong. Please try again.";
                throw new Error(errorMsg);
            }
            
        } catch (error) {
            console.error("[Form Submit Error]:", error);
            
            // Format a friendly error message
            let userFriendlyMsg = error.message;
            if (error instanceof TypeError && error.message.includes("fetch")) {
                userFriendlyMsg = "Could not connect to the email service. Please check your internet connection and try again.";
            }
            
            // Render an error message and restore the button
            const existingErrorAlert = form.querySelector(".form-error-alert");
            if (existingErrorAlert) {
                existingErrorAlert.remove();
            }
            
            const errorDiv = document.createElement("div");
            errorDiv.className = "form-error-alert";
            errorDiv.style.cssText = "color: #ef4444; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 1rem; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem; animation: modalSlideIn 0.3s ease;";
            errorDiv.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="margin-right: 0.5rem;"></i> <strong>Error:</strong><br>${userFriendlyMsg}`;
            
            // Insert error message at the top of the form
            form.prepend(errorDiv);
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

/* --- Back to Top Button --- */
function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* --- Particle Background Effect --- */
function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 242, 254, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticleArray() {
        particles = [];
        const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = 0.15 * (1 - distance / 120);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticleArray();
    animate();

    window.addEventListener("resize", () => {
        resizeCanvas();
        initParticleArray();
    });
}

/* --- Smooth Scroll for All Anchor Links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
