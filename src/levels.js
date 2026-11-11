
const levelItems = {
    regular: null,

    // O'Shaughnessy Science Hall: classrooms, offices, and labs
    oss: [
        'organics-apple-core',
        'organics-coffee-cup',
        'organics-coffee-sleeve',
        'organics-napkin',
        'organics-teabag',

        'recycling-aluminum-can',
        'recycling-cardboard',
        'recycling-glass-bottle',
        'recycling-paper',
        'recycling-plastic-containers',

        'specialty-batteries',
        'specialty-computer-part',
        'specialty-lightbulb',
        'specialty-plastic-bag',

        'trash-chip-bag',
        'trash-gum',
        'trash-utensil'
    ],

    // Anderson Student Center: dining, coffee, and events
    asc: [
        'organics-apple-core',
        'organics-cheeseburger',
        'organics-chicken-bone',
        'organics-coffee-cup',
        'organics-coffee-grounds',
        'organics-coffee-sleeve',
        'organics-cutlery',
        'organics-flowers',
        'organics-napkin',
        'organics-napkins',
        'organics-plate',
        'organics-teabag',

        'recycling-aluminum-can',
        'recycling-cardboard',
        'recycling-carton',
        'recycling-glass-bottle',
        'recycling-paper',
        'recycling-plastic-containers',

        'trash-catering-tray',
        'trash-chip-bag',
        'trash-gum',
        'trash-ketchup-packet',
        'trash-utensil'
    ],

    // Schoenecker Center: engineering, arts, and STEAM Cafe
    scc: [
        'organics-apple-core',
        'organics-coffee-cup',
        'organics-coffee-grounds',
        'organics-coffee-sleeve',
        'organics-cutlery',
        'organics-napkin',
        'organics-teabag',

        'recycling-aluminum-can',
        'recycling-cardboard',
        'recycling-carton',
        'recycling-glass-bottle',
        'recycling-paper',
        'recycling-plastic-containers',

        'specialty-batteries',
        'specialty-computer-part',
        'specialty-lightbulb',
        'specialty-plastic-bag',

        'trash-chip-bag',
        'trash-gum',
        'trash-utensil'
    ]
};

// This is how we filter out what items show up on what level. null is everything.

// These settings control how each level appears.
// The actual items for each level remain in levelItems above.
const levelDetails = {
    regular: {
        label: 'GENERAL',
        backgroundColor: '#dbbde8',
        image: null // ie: image: 'assets/backgrounds/asc.jpg'
    },

    asc: {
        label: 'ANDERSON STUDENT CENTER',
        backgroundColor: '#d8e9cf',
        image: null
    },

    oss: {
        label: "O'SHAUGHNESSY SCIENCE HALL",
        backgroundColor: '#cddfeb',
        image: null
    },

    scc: {
        label: 'SCHOENECKER CENTER',
        backgroundColor: '#f0dfc7',
        image: null
    }
};

// Allow other files to import both objects.
export {levelItems, levelDetails};