document.addEventListener('DOMContentLoaded', () => {
    console.log("Setting sail across the Grand Line!");

    /* -------------------------------
       ELEMENTS
    -------------------------------- */
    const poster = document.querySelector('.wanted-poster');
    const amount = document.querySelector('.amount');
    const contactSection = document.getElementById('contact');
    const eyes = document.querySelectorAll('.snail-eye');
    const fruits = document.querySelectorAll('.devil-fruit');
    const anchors = document.querySelectorAll('a[href^="#"]');
    const snail = document.querySelector('.snail-body');
    const sections = document.querySelectorAll('.section');

    /* -------------------------------
       WANTED POSTER: BOUNTY COUNTER
    -------------------------------- */
    let bounty = 1500000000;

    if (poster && amount) {
        poster.addEventListener('click', () => {
            bounty += 1000000;
            amount.textContent = bounty.toLocaleString() + "-";

            showImpactText('BOUNTY++', window.innerWidth / 2, window.innerHeight / 2 - 50);
            poster.classList.add('poster-pop');
            setTimeout(() => poster.classList.remove('poster-pop'), 250);
        });

        poster.addEventListener('dblclick', () => {
            document.body.classList.toggle('gear5-mode');
            showImpactText('GEAR 5!', window.innerWidth / 2, window.innerHeight / 2);
        });
    }

    /* -------------------------------
       MOUSEMOVE: POSTER TILT + EYE TRACK
    -------------------------------- */
    document.addEventListener('mousemove', (e) => {
        /* Wanted poster tilt */
        if (poster) {
            const x = (window.innerWidth / 2 - e.pageX) / 25;
            const y = (window.innerHeight / 2 - e.pageY) / 25;
            poster.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        }

        /* Den Den Mushi eye tracking */
        if (contactSection && eyes.length) {
            const rect = contactSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                eyes.forEach((eye) => {
                    const eyeRect = eye.getBoundingClientRect();
                    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

                    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
                    const distance = Math.min(
                        4,
                        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 25
                    );

                    const moveX = Math.cos(angle) * distance;
                    const moveY = Math.sin(angle) * distance;

                    eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            }
        }
    });

    /* -------------------------------
       SMOOTH SCROLLING
    -------------------------------- */
    anchors.forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* -------------------------------
       DEVIL FRUITS: HOVER + CLICK POWERS
    -------------------------------- */
    fruits.forEach((fruit) => {
        fruit.addEventListener('mouseenter', () => {
            fruit.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                fruit.style.animation = '';
            }, 500);
        });

        fruit.addEventListener('click', () => {
            const skill = fruit.textContent.trim();
            showPowerMessage(`${skill} no Mi unlocked!`);
            fruit.classList.add('fruit-pop');
            setTimeout(() => fruit.classList.remove('fruit-pop'), 250);
        });
    });

    /* -------------------------------
       DEN DEN MUSHI SPEECH BUBBLES
    -------------------------------- */
    const snailPhrases = [
        "Moshi Moshi!",
        "Captain, a message!",
        "Incoming transmission!",
        "Yohoho... type something!",
        "Signal from the Grand Line!",
        "Den Den Mushi online!"
    ];

    if (snail) {
        setInterval(() => {
            const bubble = document.createElement('div');
            bubble.className = 'snail-bubble';
            bubble.textContent = snailPhrases[Math.floor(Math.random() * snailPhrases.length)];
            snail.appendChild(bubble);

            setTimeout(() => {
                bubble.remove();
            }, 1800);
        }, 5000);
    }

    /* -------------------------------
       IMPACT TEXT ON GENERAL CLICKS
    -------------------------------- */
    const clickWords = ['BAM!', 'POW!', 'YOSHA!', 'SUPERRR!', 'BONK!', 'NICE!'];

    document.addEventListener('click', (e) => {
        if (e.target.closest('.wanted-poster') || e.target.closest('.devil-fruit')) return;

        const word = clickWords[Math.floor(Math.random() * clickWords.length)];
        showImpactText(word, e.pageX, e.pageY);
    });

    /* -------------------------------
       GEAR 5 EASTER EGG
    -------------------------------- */
    let typed = '';

    document.addEventListener('keydown', (e) => {
        typed += e.key.toLowerCase();
        typed = typed.slice(-10);

        if (typed.includes('gear5')) {
            document.body.classList.add('gear5-mode');
            showImpactText('GEAR 5 ACTIVATED!', window.innerWidth / 2, 120);

            setTimeout(() => {
                document.body.classList.remove('gear5-mode');
            }, 3000);
        }
    });

    /* -------------------------------
       SECTION REVEAL ON SCROLL
    -------------------------------- */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-show');
                }
            });
        },
        { threshold: 0.15 }
    );

    sections.forEach((section) => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });

    /* -------------------------------
       HELPERS
    -------------------------------- */
    function showImpactText(text, x, y) {
        const el = document.createElement('div');
        el.className = 'impact-text';
        el.textContent = text;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        document.body.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 800);
    }

    function showPowerMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'power-message';
        msg.textContent = text;
        document.body.appendChild(msg);

        setTimeout(() => {
            msg.remove();
        }, 1200);
    }
});