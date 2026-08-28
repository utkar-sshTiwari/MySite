document.addEventListener('DOMContentLoaded', () => {
    const windowEl = document.getElementById('mac-window');
    const titleText = document.getElementById('mac-title-text');
    const subHeader = document.getElementById('mac-sub-header');
    const contentBody = document.getElementById('mac-content-body');
    const closeBtn = document.getElementById('mac-close-btn');

    // Dynamic data store for each section
    const windowData = {
        velocity: {
            title: "Mac OS 9 : Velocity",
            sub: "System Performance / Bio",
            content: `
                <p><strong>[VELOCITY]</strong></p>
                <p>Fast web builds, efficient codebases, and snappy UI interactions.</p>
                <p>I focus on building lightweight, performant web applications with strong modern foundations.</p>
            `
        },
        design: {
            title: "Mac OS 9 : Design",
            sub: "Visual Style / Aesthetic",
            content: `
                <p><strong>[DESIGN]</strong></p>
                <p>Specializing in retro computing visuals, Y2K digital nostalgia, and shoegaze/synthwave themes.</p>
                <p>Focused on bold typography, grid alignments, and expressive textures.</p>
            `
        },
        comfort: {
            title: "Mac OS 9 : Comfort",
            sub: "User Experience / Stack",
            content: `
                <p><strong>[COMFORT]</strong></p>
                <p>Crafting intuitive user interfaces and comfortable web experiences.</p>
                <p>Tech Stack: HTML5, SCSS, JavaScript, React, and Canvas/Three.js.</p>
            `
        }
    };

    // Open modal with dynamic content on clicking any trigger word
    document.querySelectorAll('.interactive-word').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const key = trigger.getAttribute('data-window');
            const data = windowData[key];

            if (data) {
                titleText.textContent = data.title;
                subHeader.textContent = data.sub;
                contentBody.innerHTML = data.content;
                windowEl.classList.add('active');
            }
        });
    });

    // Close window
    closeBtn.addEventListener('click', () => {
        windowEl.classList.remove('active');
    });
});
