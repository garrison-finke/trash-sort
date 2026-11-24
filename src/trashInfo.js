/*
 * This is used for the gallery NOT for the main
 * trash logic. Easily can add and remove.
 * When adding new items, keep it in the groupings.
 */
const trashInfo = {
  // ORGANICS
  "organics-apple-core": {
    name: "Apple Core",
    description: "This is an apple so naturally as it is organic, it goes in the organics bin.",
  },
  "organics-cheeseburger": {
    name: "Cheeseburger",
    description: "Since this cheeseburger is just food, and thus is only made of organic material, it goes in the organics bin.",
  },
  "organics-chicken-bone": {
    name: "Chicken Bone",
    description: "Since this chicken bone is organic material, it goes in the organics bin.",
  },
  "organics-coffee-cup": {
    name: "Compostable Coffee Cup",
    description: "If you see the labeling on this coffee cup, it says that it is compostable as it is uses no non-compostable materials. You can find cups like this being used around campus.",
  },
  "organics-coffee-grounds": {
    name: "Coffee Grounds",
    description: "These coffee grounds go in the organics bin as the only things being disposed of are ground coffee beans and paper.",
  },
  "organics-coffee-sleeve": {
    name: "Coffee Sleeve",
    description: "This is a coffee sleeve that goes around coffee cups. Just like the coffee cups they are made of entirely compostable materials.",
  },
  "organics-compost": {
    name: "Food Scraps",
    description: "This is a conglomeration of a buch of different food scraps. Like all of the other food materials, it goes in the organics bin.",
  },
  "organics-cutlery": {
    name: "Compostable Cutlery",
    description: "These disposable utensils are compostable since they use no non-compostable materials like conventional plastics. You can find utensils like this being used around campus.",
  },
  "organics-flowers": {
    name: "Flowers",
    description: "Flowers like this are entirely compostable since they are made entirely of plant matter.",
  },
  "organics-napkin": {
    name: "Crumpled Napkin",
    description: "This napkin goes in the compost bin as it is just made out of biodegradeable paper.",
  },
  "organics-napkins": {
    name: "Napkins",
    description: "Like the other napkins, these go in the compost bin as they are made with no non-compostable materials.",
  },
  "organics-plate": {
    name: "Compostable Plate",
    description: "This plate goes in the organics bin as it is just made out of biodegradeable paper.",
  },
  "organics-teabag": {
    name: "Tea Bag",
    description: "This tea bag goes in the organics bin as both the tea and the bag are compostable.",
  },

  // RECYCLING
  "recycling-aluminum-can": {
    name: "Aluminum Can",
    description: "These aluminum cans go in the recycling bin since aluminum in a pure state like this is recycable.",
  },
  "recycling-cardboard": {
    name: "Cardboard",
    description: "Pure cardboard goes in the recycling bin.",
  },
  "recycling-carton": {
    name: "Carton",
    description: "Cartons like this can be recycled so they go in the recycling bin.",
  },
  "recycling-glass-bottle": {
    name: "Glass Bottle",
    description: "Glass bottles go in the recycling since pure glass can be recycled.",
  },
  "recycling-paper": {
    name: "Recyclable Paper",
    description: "This paper goes in the recycling since it contains some non-biodegradeable materials.",
  },
  "recycling-plastic-containers": {
    name: "Plastic Containers",
    description: "Plastic containers like this are recycleable if they have a marking designating them as recycleable plastics. This is the easiest way to determine if a plastic is recycleable.",
  },

  // SPECIALTY
  "specialty-batteries": {
    name: "Batteries",
    description: "Batteries go in the batteries section of the specialty waste bin.",
  },
  "specialty-computer-part": {
    name: "Computer Part",
    description: "Something like a computer part goes in the electronics section of the specialty waste bin.",
  },
  "specialty-lightbulb": {
    name: "Light Bulb",
    description: "Light bulbs go in the bulbs section of the specialty waste bin.",
  },
  "specialty-plastic-bag": {
    name: "Plastic Bag",
    description: "Some items are contained in special plastic bags that must go in the plastic bags section of the specialty waste bin.",
  },

  // TRASH
  "trash-catering-tray": {
    name: "Catering Tray",
    description: "This catering tray is an example of a non-recycleable plastic. As such it goes in the trash.",
  },
  "trash-chip-bag": {
    name: "Chip Bag",
    description: "The very flexible, partly plastic partly aluminum, material that can be found in objects like a bag for chips cannot be recycled so it goes in the trash.",
  },
  "trash-gum": {
    name: "Gum",
    description: "Chewing gum is a very synthetic material so it goes in the trash.",
  },
  "trash-ketchup-packet": {
    name: "Ketchup Packet",
    description: "These ketchup packets are another example of non-recycleable plastic, therefore it goes in the trash.",
  },
  "trash-paper": {
    name: "Food Wrapper",
    description: "This is a food wrapper. You might find this type of wrapper at the bottom of a basket holding food, or used to wrap food at somewhere like a fast food resturaunt. Due to the material it is made out of and that it is likely greasy, it goes in the trash.",
  },
  "trash-utensil": {
    name: "Plastic Utensils",
    description: "These are standard plastic utensils so are made using non-recycleable plastics. You can tell they are standard since there is no indication that they are compostable. Due to this, they go in the trash.",
  },
};

export { trashInfo };
