

const gameState = {
    globalCount: 0,
    previousScene: null,

};

const gameData = {
    scenes: {
        start_screen: {
              background: "https://raw.githubusercontent.com/YuushaExa/game2/refs/heads/main/Image_fx%20(1).jpg",
    buttons: [
        {
            type: "image",
            position: "50px 100px auto auto",
            image: "https://img.bunnyccdn.co/_r/300x400/100/7e/c8/7ec8bff42801bd63cd0b88b43d7a53d0/7ec8bff42801bd63cd0b88b43d7a53d0.jpg",
            alt: "Button Image",
            next_scene: "block_3",
            width: "150px"
        },
        {
            type: "text",
            position: "150px 200px auto auto",
            text: "Continue",
            color: "#FFFFFF",
            background: "#FF5733",
            class: "special-button"
        }
    ],
        },
          block_12: {
 dialog: [
                {
                    name: "Character 1",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the first dialogue."
                },
                {
                    name: "Character 1",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the second dialogue."
                },
                {
                    name: "Character 2",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the third dialogue.",
                }
     ]
          },
        block_1: {
            background: "https://raw.githubusercontent.com/YuushaExa/game2/refs/heads/main/Image_fx%20(1).jpg",
                buttons: [
        {
            type: "image",
            position: "50px 100px auto auto",
            image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/assets_task_01jwk89ve6fzxsq6q3fppt7eaa_1748697957_img_0.webp",
            alt: "Button Image",
            width: "150px"
        }
    ],
             dialog: [
                {
                    name: "Character 1",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the first dialogue."
                },
                {
                    name: "Character 1",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the second dialogue."
                },
                {
                    name: "Character 2",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the third dialogue.",
 choices: [
                {
                    text: "Go to the park",
                    next_scene: "block_3"
                },
                {
                    text: "Stay here",
                    next_scene: "block_3"
                },
                {
                    text: "Ask for more information",
                    next_scene: "start_screen"
                }
            ]
        }
            ],

        },

 

 block_2: {
            background: {
                type: "color",
                source: "#f0f0f0"
            },
        html: `
          <style>
                    div#counter {
                        background: #fff;
                        }
                        </style>
        <div id="counter">${gameState.globalCount}</div>
                  <button id="incrementBtn">Click to +1</button>
                  <button class="start-btn" next_scene="start_screen">Return to Home</button>`,
   onRender: function() {
        const counterElement = document.getElementById('counter');
        const incrementBtn = document.getElementById('incrementBtn');

        // Set initial value
        counterElement.textContent = gameState.globalCount;
        
        // Manual increment button
        incrementBtn.addEventListener('click', function() {
            gameState.globalCount++;
            counterElement.textContent = gameState.globalCount;
        });
        
        // Start new auto-increment
        gameState.autoIncrement = setInterval(function() {
            gameState.globalCount++;
            counterElement.textContent = gameState.globalCount;
        }, 1000);
},
               onLeave: function() {
        // Clear the interval when leaving the scene
        if (gameState.autoIncrement) {
            clearInterval(gameState.autoIncrement);
            gameState.autoIncrement = null;
        }
    },
                      next_scene: "block_1"
        },

      options: {
            html: `
                <style>
                    .options-menu {
                        background: #3f51b5;
                        color: white;
                        padding: 30px;
                        border-radius: 10px;
                        max-width: 500px;
                        margin: auto;
                    }
                    .back-btn {
                        padding: 10px 20px;
                        background-color: #ff6b6b;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        margin-top: 20px;
                        cursor: pointer;
                    }
                </style>
                <div class="options-menu">
                    <h2>Options</h2>
                    <div id="language-switcher">
                        <button data-lang="en">English</button>
                        <button data-lang="ru">Русский</button>
                    </div>

        <button class="btn btn-primary" next_scene="start_screen">Back</button>
                </div>
            `,
        },


           
    }
};
