/* ==========================================
   INTERACTIVE CANVAS PARTICLES
   ========================================== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 75;
const mouse = {
    x: null,
    y: null,
    radius: 120
};

// Listen for mouse movements
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Clear mouse coordinates when leaving screen
window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
});

// Handle window resizing
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle structure
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        // Bounce off screen margins
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Interaction with mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 2;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 2;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 2;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 2;
                }
            }
        }

        this.draw();
    }
}

// Generate particles
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        // Randomise colors between primary (purple) and secondary (cyan)
        let color = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.25)' : 'rgba(6, 182, 212, 0.25)';
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect nearby particles
function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width / 11) * (canvas.height / 11)) {
                opacityValue = 1 - (distance / 12000);
                ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue * 0.08})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Render loop
function animateParticles() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* ==========================================
   TYPEWRITER EFFECT
   ========================================== */
const words = ["MERN Stack Developer.", "Software Engineer in the Making.", "Java DSA Enthusiast.", "Django Backend Developer."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterSpan = document.getElementById('typewriter');

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Deleting characters
        typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing characters
        typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    if (isDeleting) {
        typeSpeed /= 2; // Delete faster
    }

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Next word
        typeSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 500);
});

/* ==========================================
   INTERACTIVE GRADIENT CARDS GLOW EFFECT
   ========================================== */
const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
};

const setupCardGlow = () => {
    document.querySelectorAll('.glass').forEach(card => {
        card.addEventListener('mousemove', handleCardMouseMove);
    });
};

document.addEventListener('DOMContentLoaded', setupCardGlow);

/* ==========================================
   MOBILE NAVIGATION TOGGLE
   ========================================== */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinksContainer.classList.contains('open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

/* ==========================================
   SCROLL EFFECT (NAVBAR SCROLLED & ACTIVE LINKS)
   ========================================== */
const navbar = document.getElementById('main-navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Background glow/solid color for navbar when scrolling
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
});

/* ==========================================
   GITHUB REPOS DYNAMIC LOADER & FALLBACKS
   ========================================== */
const fallbackRepos = [
    {
        name: "iter-event-portal",
        description: "A full-stack event management portal for ITER that allows students to browse, register, and manage campus events.",
        html_url: "https://github.com/priyanshu1617/iter-event-portal",
        language: "TypeScript",
        stargazers_count: 1,
        featured: true,
        tags: ["React", "Node.js", "Express", "MongoDB", "TypeScript"]
    },
    {
        name: "django-blog-app",
        description: "A full-featured blog application built with Django based on 'Django 5 by Example'. Perfect for sharing ideas and articles.",
        html_url: "https://github.com/priyanshu1617/django-blog-app",
        language: "Python",
        stargazers_count: 0,
        featured: true,
        tags: ["Python", "Django", "Bootstrap", "SQLite"]
    },
    {
        name: "iter-event-portal-demo",
        description: "A full-stack event management portal for ITER that allows students to browse, register, and manage campus events (Demo version).",
        html_url: "https://github.com/priyanshu1617/iter-event-portal-demo",
        language: "HTML",
        stargazers_count: 1,
        featured: false,
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        name: "Social_website",
        description: "Creating an engaging, dynamic social networking site using django.",
        html_url: "https://github.com/priyanshu1617/Social_website",
        language: "Python",
        stargazers_count: 0,
        featured: false,
        tags: ["Python", "Django", "CSS", "PostgreSQL"]
    }
];

const projectsContainer = document.getElementById('github-projects-container');

async function loadGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/priyanshu1617/repos');
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const repos = await response.json();
        
        // Remove profile README repo and empty names
        const filteredRepos = repos.filter(repo => repo.name !== 'priyanshu1617' && !repo.fork);
        
        if (filteredRepos.length === 0) {
            useFallbackProjects();
            return;
        }

        renderProjects(filteredRepos);
    } catch (error) {
        console.warn('GitHub API rate limit or error. Loading local cached projects data.', error);
        useFallbackProjects();
    }
}

function useFallbackProjects() {
    renderProjects(fallbackRepos);
}

function renderProjects(projects) {
    projectsContainer.innerHTML = '';
    
    // Sort projects to show featured or higher star count first
    const sorted = [...projects].sort((a, b) => {
        // Custom sort for our hardcoded key featured items if present
        const aFeatured = a.featured || a.name === 'iter-event-portal' || a.name === 'django-blog-app';
        const bFeatured = b.featured || b.name === 'iter-event-portal' || b.name === 'django-blog-app';
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
    });

    sorted.forEach(project => {
        // Set technology tags depending on repo properties
        let tags = project.tags || [];
        if (tags.length === 0) {
            if (project.language) {
                tags.push(project.language);
            }
            // Smart tags helper based on name
            if (project.name.toLowerCase().includes('django')) {
                tags.push('Django', 'Python');
            }
            if (project.name.toLowerCase().includes('portal')) {
                tags.push('React', 'Node.js');
            }
            // Remove duplicates
            tags = [...new Set(tags)];
        }

        const isFeatured = project.featured || project.name === 'iter-event-portal' || project.name === 'django-blog-app';
        const cardClass = isFeatured ? 'project-card glass featured' : 'project-card glass';
        
        const cardHTML = `
            <div class="${cardClass}">
                <div class="card-glow"></div>
                <div class="project-header">
                    <div class="project-folder">
                        <i class="${isFeatured ? 'fas fa-star' : 'far fa-folder'}"></i>
                    </div>
                    <div class="project-links">
                        <a href="${project.html_url}" target="_blank" aria-label="View Source on GitHub"><i class="fab fa-github"></i></a>
                    </div>
                </div>
                <h3>${formatRepoName(project.name)}</h3>
                <p>${project.description || 'No description available. Click GitHub icon to view repository code and commits.'}</p>
                <div class="project-footer">
                    <div class="project-tech">
                        ${tags.slice(0, 4).map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                    ${project.stargazers_count > 0 ? `
                    <div class="project-stars">
                        <i class="fas fa-star"></i> <span>${project.stargazers_count}</span>
                    </div>` : ''}
                </div>
            </div>
        `;
        
        projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Setup interactive card glows for newly rendered HTML elements
    setupCardGlow();
}

function formatRepoName(name) {
    // Convert django-blog-app to Django Blog App
    return name
        .split('-')
        .map(word => {
            if (word.toLowerCase() === 'dsa') return 'DSA';
            if (word.toLowerCase() === 'iter') return 'ITER';
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

// Trigger project loading
loadGitHubProjects();

/* ==========================================
   SKILLS FILTER SYSTEM
   ========================================== */
const tabButtons = document.querySelectorAll('.tab-btn');
const skillCards = document.querySelectorAll('.skill-card');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle active button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-tab');

        // Filter cards
        skillCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
                // Trigger quick enter transition
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

/* ==========================================
   SIMULATED CONTACT FORM SUBMISSION
   ========================================== */
const contactForm = document.getElementById('portfolio-contact-form');
const formFeedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const submitSpan = submitBtn.querySelector('span');
    const submitIcon = submitBtn.querySelector('i');
    
    // UI state loading
    submitSpan.textContent = 'Sending...';
    submitIcon.className = 'fas fa-spinner fa-spin';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    // Simulate sending email api call
    setTimeout(() => {
        // Reset button
        submitSpan.textContent = 'Send Message';
        submitIcon.className = 'fas fa-paper-plane';
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
        
        // Setup success feedback
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = 'Thank you! Your message was submitted successfully. (Demo Mode)';
        
        // Reset form
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formFeedback.textContent = '';
        }, 5000);
    }, 1500);
});
