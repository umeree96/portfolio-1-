/* ==========================================
   Umer Shahid Portfolio JavaScript
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize functions
    initCanvasParticles();
    initTypingEffect();
    initNavbarScroll();
    initMobileNav();
    initProjectFilters();
    initProjectModals();
    initSkillRings();
    initContactForm();
    initScrollReveal();
});

/* --- Canvas Particle Network --- */
function initCanvasParticles() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let particlesArray = [];
    const numberOfParticles = 80;
    
    // Adjust canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Mouse interaction coordinates
    let mouse = {
        x: null,
        y: null,
        radius: 120
    };
    
    window.addEventListener("mousemove", (event) => {
        // Only track mouse in hero area
        if (event.clientY < window.innerHeight) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        } else {
            mouse.x = null;
            mouse.y = null;
        }
    });
    
    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle blueprint
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.speedY = Math.random() * 0.8 - 0.4;
            this.color = "rgba(0, 242, 254, 0.4)";
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary collisions
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            
            // Mouse interactivity
            if (mouse.x && mouse.y) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x += forceDirectionX * force * 2;
                    this.y += forceDirectionY * force * 2;
                }
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particle bank
    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Connect particles with lines
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    opacityValue = 1 - (distance / 120);
                    ctx.strokeStyle = `rgba(79, 172, 254, ${opacityValue * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connect();
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

/* --- Typing Banner Effect --- */
function initTypingEffect() {
    const textElement = document.querySelector(".typing-text");
    if (!textElement) return;
    
    const phrases = [
        "AI Systems & Intelligent Web Apps",
        "Deep Learning Models (CNNs)",
        "Robust Web Applications",
        "Computer Vision Solutions"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of sentence
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing new phrase
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

/* --- Navbar Scroll Behavior & Active Highlighter --- */
function initNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    
    window.addEventListener("scroll", () => {
        // Shrink navbar
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
        // Active link highlighting
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}

/* --- Mobile Menu Trigger --- */
function initMobileNav() {
    const toggle = document.querySelector(".mobile-nav-toggle");
    const menu = document.querySelector(".nav-menu");
    const links = document.querySelectorAll(".nav-link");
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        const icon = toggle.querySelector("i");
        if (menu.classList.contains("active")) {
            icon.className = "fa-solid fa-xmark";
        } else {
            icon.className = "fa-solid fa-bars";
        }
    });
    
    // Close mobile menu when link is clicked
    links.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            toggle.querySelector("i").className = "fa-solid fa-bars";
        });
    });
}

/* --- Project Portfolio Filters --- */
function initProjectFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");
    
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-filter");
            
            cards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                // Add scaling animations on show/hide
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.9)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

/* --- Project Modals --- */
const projectData = {
    "carelytics": {
        title: "Carelytics AI",
        tag: "Final Year Project",
        desc: "Carelytics AI is an advanced medical diagnostics assistant designed to empower clinicians and patients by parsing and interpreting laboratory analysis and imaging scans.",
        bullets: [
            "<strong>Report Processing via OCR:</strong> Incorporated Tesseract OCR pipelines to read raw laboratory blood panels, CT scan printouts, X-rays, and PDFs.",
            "<strong>Health Analytics Engine:</strong> Programmed a decision-making model using PyTorch and TensorFlow to evaluate extracted markers for disease warning indicators.",
            "<strong>Secure Backend Foundation:</strong> Constructed the server architecture using Flask coupled with a relational MySQL database to host credentials, files, and consultation histories.",
            "<strong>Personalized Actionable Advice:</strong> Created a synthesis module generating tailored nutritional adjustments, exercise regiments, and primary healthcare suggestions based on clinical findings."
        ]
    },
    "skin-cancer": {
        title: "Skin Cancer Classification",
        tag: "AI & Deep Learning",
        desc: "Built a Deep Learning classifier tailored to review dermatological images and classify cell anomalies as benign skin lesions or malignant melanomas.",
        bullets: [
            "<strong>Data Pipeline engineering:</strong> Engineered normalizers, augmentation parameters (random flips, contrast shifts), and addressing class imbalance via weighted sampling.",
            "<strong>Convolutional Neural Network:</strong> Configured a custom CNN architecture leveraging deep residual structures for feature maps learning.",
            "<strong>Frameworks & Tools:</strong> Developed and verified models inside Google Colab using PyTorch and Keras backends.",
            "<strong>Metric Assessment:</strong> Achieved outstanding accuracy margins verified through confusion matrices, F1-scores, and ROC curves."
        ]
    },
    "fruit": {
        title: "Fruit Classification CNN",
        tag: "AI & Deep Learning",
        desc: "Designed and trained an image classification neural network aimed at sorting and classifying agricultural products, serving as a prototype for automated sorting machinery.",
        bullets: [
            "<strong>Dataset Curation:</strong> Organized thousands of high-definition fruit category images, applying normalization and resizing scripts.",
            "<strong>PyTorch Optimization:</strong> Constructed deep neural network layers using PyTorch featuring Batch Normalization, Max Pooling, and Dropout to combat overfitting.",
            "<strong>Image Processing:</strong> Standardized image attributes utilizing OpenCV libraries.",
            "<strong>High Precision Outcomes:</strong> Tuned hyperparameters to hit high classification precision values suitable for logistics deployments."
        ]
    },
    "restaurant": {
        title: "Delicacy Restaurant Website",
        tag: "Web Development Project",
        desc: "Created a highly styled, modern promotional platform and booking system for a fine dining restaurant client.",
        bullets: [
            "<strong>Interactive Menu Showcase:</strong> Programmed vanilla JavaScript loops to render menu categories dynamically with pricing and nutrition details.",
            "<strong>Responsive Layout Engineering:</strong> Designed visual structures utilizing CSS grids, flexboxes, and CSS media queries to guarantee flawless operations across mobile, tablet, and desktop viewports.",
            "<strong>VS Code Architecture:</strong> Written clean, modular HTML5 and CSS3 documents following clean organization standards.",
            "<strong>Interactive Features:</strong> Added dynamic reservation request validation and elegant slider transitions for food features."
        ]
    }
};

function initProjectModals() {
    const modal = document.getElementById("project-modal");
    const closeBtn = document.querySelector(".close-modal");
    const triggerLinks = document.querySelectorAll(".project-link");
    const modalBody = document.getElementById("modal-project-details");
    
    if (!modal || !closeBtn || !modalBody) return;
    
    triggerLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const projectId = link.getAttribute("data-project");
            const data = projectData[projectId];
            
            if (data) {
                // Populate modal content
                let bulletsHtml = data.bullets.map(b => `<li>${b}</li>`).join("");
                
                modalBody.innerHTML = `
                    <span class="modal-project-cat">${data.tag}</span>
                    <h3 class="modal-project-title">${data.title}</h3>
                    <p class="modal-project-desc">${data.desc}</p>
                    <h4 class="modal-section-title">Key Work & Responsibilities:</h4>
                    <ul class="modal-project-bullets">
                        ${bulletsHtml}
                    </ul>
                `;
                
                modal.classList.add("active");
                document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
            }
        });
    });
    
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    });
    
    // Close modal on clicking outside content area
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
}

/* --- SVG Skill Ring Animations --- */
function initSkillRings() {
    const skillSection = document.getElementById("skills");
    const rings = document.querySelectorAll(".ring-fill");
    
    if (!skillSection || rings.length === 0) return;
    
    // Match stroke dashoffset with percentage targets
    const ringPercentages = {
        "ai-ring": 0.90,  // 90%
        "dl-ring": 0.85,  // 85%
        "web-ring": 0.80  // 80%
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                rings.forEach(ring => {
                    let ringClass = "";
                    if (ring.classList.contains("ai-ring")) ringClass = "ai-ring";
                    if (ring.classList.contains("dl-ring")) ringClass = "dl-ring";
                    if (ring.classList.contains("web-ring")) ringClass = "web-ring";
                    
                    const percent = ringPercentages[ringClass];
                    if (percent) {
                        const radius = 50;
                        const circumference = 2 * Math.PI * radius; // 314
                        const offset = circumference - (percent * circumference);
                        ring.style.strokeDashoffset = offset;
                    }
                });
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillSection);
}

/* --- Contact Form Processing (Linked to Backend API) --- */
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
            // Determine the API endpoint URL dynamically
            // If opened via file:// protocol, direct requests to localhost:3000
            let apiUrl = "/api/contact";
            if (window.location.protocol === "file:") {
                apiUrl = "http://localhost:3000/api/contact";
            }

            // Send API call to Express backend
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nameVal,
                    email: emailVal,
                    subject: subjectVal,
                    message: messageVal
                })
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                // Success response animation
                form.innerHTML = `
                    <div class="form-success-message" style="text-align: center; padding: 2.5rem 1.5rem; color: #00f2fe; border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; background: rgba(0, 242, 254, 0.05); animation: modalSlideIn 0.4s ease;">
                        <i class="fa-solid fa-circle-check" style="font-size: 3.5rem; margin-bottom: 1.25rem; color: #10b981;"></i>
                        <h3 style="font-family: var(--font-heading); font-size: 1.6rem; margin-bottom: 0.75rem; color: #fff;">Message Sent Successfully!</h3>
                        <p style="color: var(--text-secondary); max-width: 450px; margin: 0 auto; line-height: 1.6;">${result.message}</p>
                    </div>
                `;
            } else {
                // Backend validation errors or handled issues
                const errorMsg = result.errors ? result.errors.join("<br>") : (result.message || "Something went wrong.");
                throw new Error(errorMsg);
            }
            
        } catch (error) {
            console.error("[Form Submit Error]:", error);
            
            // Format a friendly error message for network connection failures
            let userFriendlyMsg = error.message;
            if (error instanceof TypeError && error.message.includes("fetch")) {
                userFriendlyMsg = "Could not connect to the backend server API. Please ensure that you have started your local server by running <code>npm run dev</code> inside the project folder, and that it is listening on port 3000.";
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

/* --- Timeline Scroll-Reveal Animations --- */
function initScrollReveal() {
    const revealItems = document.querySelectorAll(".scroll-reveal");
    
    if (revealItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    // Add CSS properties to timeline items to support animation
    revealItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";
        item.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        observer.observe(item);
    });
    
    // Add dynamic CSS class handler
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .scroll-reveal.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
}
