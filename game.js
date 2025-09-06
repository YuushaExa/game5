const gameData = {
    scenes: {
        start_screen: {
            background: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&w=1920',
            dialog: [
                { name: "Narrator", text: "🌟 Welcome to Alice’s Story!" },
                { name: "Narrator", text: "Click anywhere to advance dialog..." }
            ],
            autoAdvanceTo: 'scene1'
        },

        scene1: {
            background: 'https://images.unsplash.com/photo-1536782363653-3dd14a5a7e58?crop=entropy&cs=tinysrgb&fit=max&w=1920',
            character: {
                name: "Alice",
                sprite: "https://i.ibb.co/7W0WJ0F/alice-sprite.png" // ✅ Real Alice sprite!
            },
            dialog: [
                { name: "Alice", text: "Hi! I’m Alice. Nice to meet you~" },
                { name: "Alice", text: "I love tea, books, and rainy afternoons." },
                { name: "Alice", text: "What about you? What do you like?" }
            ],
            choices: [
                { text: "I like adventures!", next: 'adventure_path' },
                { text: "I prefer quiet days.", next: 'quiet_path' }
            ]
        },

        adventure_path: {
            background: 'https://images.unsplash.com/photo-1506318137075-3a73921d83af?crop=entropy&cs=tinysrgb&fit=max&w=1920',
            character: {
                name: "Alice",
                sprite: "https://i.ibb.co/7W0WJ0F/alice-sprite.png"
            },
            dialog: [
                { name: "Alice", text: "Adventures? Awesome! Let’s explore the forest tomorrow!" },
                { name: "Alice", text: "I’ll pack sandwiches and a map. You bring courage!" }
            ],
            autoAdvanceTo: 'start_screen'
        },

        quiet_path: {
            background: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fit=max&w=1920',
            character: {
                name: "Alice",
                sprite: "https://i.ibb.co/7W0WJ0F/alice-sprite.png"
            },
            dialog: [
                { name: "Alice", text: "Quiet days are the best... Let’s read together." },
                { name: "Alice", text: "I’ll make tea. You pick the book. Deal?" }
            ],
            autoAdvanceTo: 'start_screen'
        }
    }
};
