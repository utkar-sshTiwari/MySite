document.addEventListener('DOMContentLoaded', () => {
    const windowContainer = document.getElementById('window-container');
    let highestZIndex = 100;

    const windowData = {
        velocity: {
		title: " Velocity : _^About^_ ",
            sub: "System Info / Utkarsh Tiwari",
            content: `
                <p><strong>[ABOUT]</strong></p>
                 <p>Sup! I'm Utkarsh Tiwari, currently doing bachelors in computer science.I find cs in itself very fun and interesting but the degree is an utter waste of time.</p>
                <hr style="border: 0; border-top: 1px dashed #888; margin: 12px 0;">
                <p><strong>INTERESTED IN:</strong></p>
                <p>Computers, Mathematics, Philosophy, Literature, Music, and Films.</p>
                <br>
                <p><strong>NOT INTERESTED IN:</strong></p>
                <p>Charles Dickens.</p>
                <hr style="border: 0; border-top: 1px dashed #888; margin: 12px 0;">
                <p style="font-size: 11px; color: #555; font-style: italic;">
                    (The site, as you can see, is heavily derived from the album cover of <strong>"Velocity : Design : Comfort"</strong> by Sweet Trip, along with other synthwave/retro aesthetics.)
                </p>
            `
        },
        design: {
		title: "Design : _>Portfolio<_",
            sub: "Visual Style / Portfolio",
            content: `
                <p><strong>[PROJECTS/STUFF]</strong></p>
		<p>Graphics, procedural algorithms, and system configurations along with some web work.</p>
		<a href="https://github.com/utkar-sshTiwari" target="_blank" style="color: #0000ff; text-decoration: underline;">[View GitHub Source]</a>

		<hr style="border: 0; border-top: 1px dashed #888; margin: 10px 0;">


                <p style="font-family: monospace; font-size: 11px; line-height: 1.6;">
			<ul>
				<li> 
					Terrain Generation usig perlin noise algorithm, (Also have used perlin in creating 2D graphs). 
				</li>
				<li>
					Kernel convolution using raylib.
				</li>
				<li> 
					My current in use NixOS dot-files (also have my old arch files in git as well).
				</li>
					A fullstack appliaction for reporting civic issues on react + typescript + FastAPI + postgres. <span style="color: #666;"><i>(not a big fan of this one)</i></span>
				<li>
					An always on work Zettelkasten, that i am rapidly loosing my faith in, starting to seem like a waste. <span style="color: #666;"><i> (All regards to the obsidian/note_chud cult >__<.)</span></i>
				</li>
			</ul>
		</p>
            `
        },
        comfort: {
		title: "Comfort : =__Journal & Archive__=",
            sub: "User Experience / Stack",
            content: `
                <p><strong>[RECENT LOG / REFLECTIONS]</strong></p>
                <p> STOP! ^__< Work in Progress ^__^ +__+ 0__0 </p>
            `
        }
    };

    // Open dynamic window instance
    document.querySelectorAll('.interactive-word').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const key = trigger.getAttribute('data-window');
            const data = windowData[key];

            if (!data) return;

            // Check if window for this key is already open
            let existingWindow = document.getElementById(`mac-window-${key}`);
            if (existingWindow) {
                // Bring existing window to front
                highestZIndex++;
                existingWindow.style.zIndex = highestZIndex;
                return;
            }

            // Create new window DOM element
            highestZIndex++;
            const windowEl = document.createElement('div');
            windowEl.id = `mac-window-${key}`;
            windowEl.className = 'mac-os9-window active';
            windowEl.style.zIndex = highestZIndex;

            // Offset starting positions so stacked windows stagger nicely
            const openCount = document.querySelectorAll('.mac-os9-window').length;
            const topOffset = 10 + (openCount * 3);
            const rightOffset = 4 + (openCount * 2);
            windowEl.style.top = `${topOffset}%`;
            windowEl.style.right = `${rightOffset}rem`;

            windowEl.innerHTML = `
                <div class="mac-title-bar">
                    <button class="mac-close-btn mac-close-box"></button>
                    <div class="mac-title-stripes"></div>
                    <span class="mac-title-text">${data.title}</span>
                    <div class="mac-title-stripes"></div>
                    <div class="mac-zoom-box"></div>
                </div>
                <div class="mac-sub-header">${data.sub}</div>
                <div class="mac-content-body">${data.content}</div>
                <div class="mac-scrollbar-v"><div class="scroll-arrow-up">▲</div><div class="scroll-arrow-down">▼</div></div>
                <div class="mac-scrollbar-h"><div class="scroll-arrow-left">◄</div><div class="scroll-arrow-right">►</div></div>
            `;

            windowContainer.appendChild(windowEl);

            // Bring to front on click anywhere on the window
            windowEl.addEventListener('mousedown', () => {
                highestZIndex++;
                windowEl.style.zIndex = highestZIndex;
            });

            // Handle close button
            const closeBtn = windowEl.querySelector('.mac-close-btn');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                windowEl.remove();
            });

            // Make window draggable
            makeDraggable(windowEl);
        });
    });

    // Draggable function per window instance
    function makeDraggable(windowEl) {
        const titleBar = windowEl.querySelector('.mac-title-bar');
        const closeBtn = windowEl.querySelector('.mac-close-btn');

        let isDragging = false;
        let startX = 0, startY = 0;
        let initialLeft = 0, initialTop = 0;

        titleBar.addEventListener('mousedown', (e) => {
            if (e.target === closeBtn) return;

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            const rect = windowEl.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            windowEl.style.right = 'auto';
            windowEl.style.bottom = 'auto';
            windowEl.style.left = `${initialLeft}px`;
            windowEl.style.top = `${initialTop}px`;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            windowEl.style.left = `${initialLeft + dx}px`;
            windowEl.style.top = `${initialTop + dy}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
});
