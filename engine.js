class VisualNovelEngine {
    constructor() {
        this.currentScene = null;
        this.scenesData = {};
        this.handlers = {};
        this.mainDiv = document.getElementById('main');
        this.dialogBox = null;
        this.characterBox = null;

        this.setupDOM();
        this.setupEventDelegation();
    }

    setupDOM() {
        // Create containers if they don't exist
        this.mainDiv.innerHTML = `
            <div id="background-layer" class="layer"></div>
            <div id="character-layer" class="layer"></div>
            <div id="dialog-layer" class="layer">
                <div id="dialog-box">
                    <div id="character-name"></div>
                    <div id="dialog-text"></div>
                </div>
                <div id="choices-container"></div>
            </div>
        `;

        this.backgroundLayer = document.getElementById('background-layer');
        this.characterLayer = document.getElementById('character-layer');
        this.dialogBox = document.getElementById('dialog-box');
        this.characterNameEl = document.getElementById('character-name');
        this.dialogTextEl = document.getElementById('dialog-text');
        this.choicesContainer = document.getElementById('choices-container');

        // Optional: hide dialog box initially
        this.dialogBox.style.display = 'none';
    }

    setupEventDelegation() {
        this.mainDiv.addEventListener('click', (e) => {
            const targetScene = e.target.closest('[next_scene]')?.getAttribute('next_scene');
            if (targetScene) {
                this.renderScene(targetScene);
            }

            // Click to advance dialogue
            if (e.target.closest('#dialog-box') && this.currentScene) {
                const scene = this.scenesData[this.currentScene];
                if (scene.dialog && scene.dialog.length > 0) {
                    this.advanceDialog(scene);
                }
            }
        });
    }

    init(gameData) {
        this.scenesData = gameData.scenes || {};
        this.triggerEvent('dataLoaded');
        this.startVisualNovel();
    }

    startVisualNovel() {
        const startingScene = this.scenesData['start_screen'] ? 'start_screen' : 'block_1';
        if (this.scenesData[startingScene]) {
            this.renderScene(startingScene);
        } else {
            console.error('No starting scene found');
        }
    }

    renderScene(sceneId) {
        const prevScene = this.currentScene;
        if (prevScene && this.scenesData[prevScene]?.onLeave) {
            this.scenesData[prevScene].onLeave();
        }

        const scene = this.scenesData[sceneId];
        if (!scene) {
            console.error(`Scene ${sceneId} not found`);
            return;
        }

        // Reset layers
        this.backgroundLayer.style.backgroundImage = 'none';
        this.backgroundLayer.style.backgroundColor = 'transparent';
        this.characterLayer.innerHTML = '';
        this.choicesContainer.innerHTML = '';
        this.dialogBox.style.display = 'none';

        // Background
        if (scene.background) {
            this.setBackground(scene.background);
        }

        // Color overlay (optional mood)
        if (scene.color) {
            this.backgroundLayer.style.backgroundColor = scene.color;
        }

        this.currentScene = sceneId;

        // Render character if any
        if (scene.character) {
            this.showCharacter(scene.character);
        }

        // Start dialog if exists
        if (scene.dialog && scene.dialog.length > 0) {
            scene._dialogIndex = 0; // Track current line
            this.showDialog(scene.dialog[0]);
        }

        // Render choices if any (at end of dialog)
        if (scene.choices) {
            // We'll show these after dialog ends
        }

        if (scene.onRender) {
            scene.onRender();
        }

        this.triggerEvent('sceneChanged', { sceneId });
    }

    setBackground(backgroundUrl) {
        this.backgroundLayer.style.backgroundImage = `url('${backgroundUrl}')`;
        this.backgroundLayer.style.backgroundSize = 'cover';
        this.backgroundLayer.style.backgroundPosition = 'center';
    }

showCharacter(characterData) {
    // ✅ CREATE the element first
    const charEl = document.createElement('img');
    charEl.src = characterData.sprite;
    charEl.alt = characterData.name || 'Character';
    charEl.style.position = 'absolute';
    charEl.style.bottom = '0';
    charEl.style.left = '50%';
    charEl.style.transform = 'translateX(-50%)';
    charEl.style.maxHeight = '80%';     // 👈 Scale relative to container, not viewport
    charEl.style.maxWidth = '100%';
    charEl.style.height = 'auto';
    charEl.style.width = 'auto';
    charEl.style.zIndex = '10';

    // Optional: Add expression class
    if (characterData.expression) {
        charEl.classList.add(characterData.expression);
    }

    // Clear previous characters and add new one
    this.characterLayer.innerHTML = '';
    this.characterLayer.appendChild(charEl);
}

    showDialog(dialogLine) {
        this.dialogBox.style.display = 'block';
        this.characterNameEl.textContent = dialogLine.name || '';
        this.dialogTextEl.textContent = dialogLine.text || '';

        // Style character name
        if (dialogLine.name) {
            this.characterNameEl.style.fontWeight = 'bold';
            this.characterNameEl.style.display = 'block';
        } else {
            this.characterNameEl.style.display = 'none';
        }
    }

    advanceDialog(scene) {
        const currentIndex = scene._dialogIndex || 0;
        const nextIndex = currentIndex + 1;

        if (nextIndex < scene.dialog.length) {
            scene._dialogIndex = nextIndex;
            this.showDialog(scene.dialog[nextIndex]);
        } else {
            // Dialog ended — show choices or auto-advance
            this.dialogBox.style.display = 'none';
            if (scene.choices && scene.choices.length > 0) {
                this.renderChoices(scene.choices);
            } else if (scene.autoAdvanceTo) {
                setTimeout(() => this.renderScene(scene.autoAdvanceTo), 500);
            }
        }
    }

    renderChoices(choices) {
        this.choicesContainer.innerHTML = '';
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.textContent = choice.text;
            btn.setAttribute('next_scene', choice.next);
            btn.style.display = 'block';
            btn.style.margin = '10px auto';
            btn.style.padding = '10px 20px';
            btn.style.fontSize = '16px';
            this.choicesContainer.appendChild(btn);
        });
        this.choicesContainer.style.textAlign = 'center';
    }

    on(event, handler) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        this.handlers[event].push(handler);
    }

    triggerEvent(event, data = {}) {
        if (this.handlers[event]) {
            this.handlers[event].forEach(handler => handler(data));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.vnEngine = new VisualNovelEngine();
    
    if (typeof gameData !== 'undefined') {
        vnEngine.init(gameData);
    } else {
        console.error('gameData is not defined. Make sure game.js is loaded.');
    }
});
