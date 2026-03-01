// Custom Scroll Effects
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .node-item, .agreement-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(el);
    });

    // Custom Observer Callback to show items
    const showItems = () => {
        document.querySelectorAll('.visible').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    };

    // Update visibility on scroll
    window.addEventListener('scroll', showItems);
    showItems(); // Initial check

    // Add Glitch effect to logo randomly
    const logo = document.querySelector('.logo');
    setInterval(() => {
        if (Math.random() > 0.95) {
            logo.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                logo.style.transform = 'translate(0, 0)';
            }, 50);
        }
    }, 100);
});

// System Status Message Rotation
const statusMsgs = [
    "SYSTEM STATUS: INITIALIZING QUANTUM OPS...",
    "SIGNAL STRENGTH: 98% - COHERENCE STABLE",
    "DECRYPTING ARCHITECT POTENTIAL...",
    "NODE 01: THE SOURCE IS ACTIVE",
    "NEWTONIAN GRAVITY BYPASSED"
];

let currentMsg = 0;
const statusEl = document.querySelector('.status-msg');

if (statusEl) {
    setInterval(() => {
        currentMsg = (currentMsg + 1) % statusMsgs.length;
        statusEl.style.opacity = '0';
        setTimeout(() => {
            statusEl.textContent = statusMsgs[currentMsg];
            statusEl.style.opacity = '1';
        }, 500);
    }, 4000);
}

// Uplink Form Handler
const uplinkForm = document.getElementById('uplinkForm');
const formStatus = document.getElementById('formStatus');

if (uplinkForm) {
    uplinkForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = uplinkForm.querySelector('input[type="email"]').value;
        const btn = uplinkForm.querySelector('button[type="submit"]');

        // Visual feedback during transmission
        btn.innerHTML = 'TRANSMITTING...';
        btn.disabled = true;
        btn.style.opacity = '0.5';

        // Post data to formsubmit.co via fetch
        fetch(uplinkForm.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
            .then(response => response.json())
            .then(data => {
                // Hide the input fields and show success message
                uplinkForm.querySelector('.form-row').style.display = 'none';
                formStatus.innerHTML = '<span class="success-msg">TRANSMISSION SUCCESSFUL. FREQUENCY SYNCED.</span>';
            })
            .catch(error => {
                // Revert on error
                btn.innerHTML = 'Initialize Link <span class="arr">→</span>';
                btn.disabled = false;
                btn.style.opacity = '1';
                formStatus.innerHTML = '<span class="error-msg">UPLINK FAILED. INTERFERENCE DETECTED.</span>';
            });
    });
}
