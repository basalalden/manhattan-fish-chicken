export interface MenuItemVariant {
  label: string;
  price: string;
}

export interface MenuItem {
  name: string;
  price?: string;
  description?: string;
  variants?: MenuItemVariant[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  // ── SPECIALS ─────────────────────────────────────────
  {
    id: "our-specials",
    name: "Our Specials",
    items: [
      {
        name: "Sampler 1",
        price: "25.99",
        description:
          "2 Pc Fish (Catfish, Perch, Tilapia or Whiting), 4 Wing Dings, 5 Large Shrimp, 5 Jumbo Popcorn Chicken, 3 Wings, Fries",
      },
      {
        name: "Sampler 2",
        price: "21.99",
        description:
          "5 Large Shrimp, 5 Wing Dings, 5 Jumbo Popcorn Chicken, Fries",
      },
      {
        name: "5 Whole Wings + 5 Pc Fish",
        price: "25.99",
        description:
          "Includes Large Fries. Catfish, Perch, Tilapia or Whiting",
      },
      {
        name: "Large Hand Battered Shrimp",
        price: "13.99",
        description: "15 Pc Large Hand Battered Shrimp",
      },
      {
        name: "10 Pc Wings + 10 Pc Fish",
        price: "38.99",
        description: "Catfish, Perch, Tilapia, Whiting, or White Bass",
      },
      {
        name: "10 Whole Wings + 10 Pc Fish",
        price: "43.99",
        description:
          "Catfish, Perch, Tilapia or Whiting. Includes Large Fries & Large Coleslaw",
      },
      {
        name: "50 Whole Wings",
        price: "98.99",
        description: "1/2 Pan French Fries",
      },
      {
        name: "10 Whole Wings w/ Small Fries",
        price: "22.99",
      },
      {
        name: "10 Whole Wings + 10 Shrimp",
        price: "29.99",
        description: "With 1 Large Side & 2 Kool Aid",
      },
      {
        name: "10 Pc Fish + 10 LG. Battered Shrimp",
        price: "34.99",
        description: "With 1 Large Side",
      },
    ],
  },
  {
    id: "sweet-spicy-offers",
    name: "Sweet N Spicy Offers",
    description: "Manhattan's New Sweet N Spicy Chicken and Fish.",
    items: [
      {
        name: "Sweet N Spicy Chicken",
        description: "Combo includes Small Fries & Small Kool Aid.",
        variants: [
          { label: "Only", price: "13.00" },
          { label: "Combo", price: "18.00" },
        ],
      },
      {
        name: "Sweet N Spicy Fish",
        description: "Combo includes Small Fries & Small Kool Aid.",
        variants: [
          { label: "Only", price: "13.00" },
          { label: "Combo", price: "18.00" },
        ],
      },
    ],
  },
  {
    id: "family-meals",
    name: "Family Meals",
    items: [
      {
        name: "Family Meal 1",
        price: "21.99",
        description:
          "Includes 1 Large Fries. 8 Pc Fish — Choice of Catfish, Ocean Perch, Whiting or Tilapia",
      },
      {
        name: "Family Meal 2",
        price: "49.99",
        description:
          "Includes 2 Large Sides. 10 Pc Fish (Catfish, Perch, Whiting or Tilapia), 10 Pc Chicken (Legs & Thighs or Wings), 10 Pc Battered Shrimp",
      },
      {
        name: "Family Meal 3",
        price: "89.99",
        description:
          "20 Pc Fish (Catfish, Perch, Whiting or Tilapia), 20 Pc Chicken (Legs & Thighs or Wings), 20 Pc Battered Shrimp, Includes 2 Large Side",
      },
    ],
  },
  {
    id: "lunch-specials",
    name: "$13 Lunch Specials",
    description: "Served with Fries & Small Kool Aid. All Day. Plus Tax. Limited Time Offer.",
    items: [
      { name: "2 Pc Fish", description: "Choice of Catfish, Perch, Whiting or Tilapia", price: "13.00" },
      { name: "3 Whole Wings or Dark Meat", price: "13.00" },
      { name: "6 Jumbo Popcorn Chicken", price: "13.00" },
      { name: "6 Flavored Wing Dings", price: "13.00" },
      { name: "1 Pc Fish & 4 Flavored Wing Dings", price: "13.00" },
      { name: "2 Whole Wings & 1 Pc Fish", price: "13.00" },
      { name: "6 Pc Catfish Nuggets", price: "13.00" },
      { name: "2 Chicken Tenders", price: "13.00" },
      { name: "6 Pc Large Shrimp", price: "13.00" },
    ],
  },
  {
    id: "dinner-specials",
    name: "$18 Dinner Specials",
    description: "Served with Fries & Kool Aid. All Day. Plus Tax. Limited Time Offer.",
    items: [
      { name: "6 Whole Wings or Dark Meat", price: "18.00" },
      { name: "10 Flavored Wing Dings", price: "18.00" },
      { name: "3 Whole Wings & 3 Pc Fish", price: "18.00" },
      { name: "4 Chicken Tenders", price: "18.00" },
      { name: "10 Pc Catfish Nuggets", price: "18.00" },
      { name: "4 Pc Fish", description: "Choice of Catfish, Perch, Whiting, White Bass or Tilapia", price: "18.00" },
      { name: "10 Jumbo Popcorn Chicken", price: "18.00" },
      { name: "3 Pc Fish & 5 Flavored Wing Dings", price: "18.00" },
      { name: "10 Large Hand Battered Shrimp", price: "18.00" },
      { name: "6 Jumbo Shrimp", price: "18.00" },
    ],
  },
  {
    id: "monday-thursday-specials",
    name: "Monday thru Thursday Specials",
    description: "SAUCE EXTRA - SAME DAY PICKUP",
    items: [
      { name: "50 Spicy Popcorn Chicken (Jumbo Size)", price: "48.00", description: "Original Price $49.99" },
      { name: "50 Spicy Wing Dings", price: "48.00", description: "Original Price $49.99" },
      { name: "15 Dark Legs & Thighs", price: "25.00", description: "Original Price $29.99" },
      { name: "50 Large Battered Shrimp", price: "32.00", description: "Original Price $36.99" },
      { name: "50 Filet Catfish Nuggets", price: "35.00", description: "Original Price $43.99" },
    ],
  },

  // ── FISH ─────────────────────────────────────────────
  {
    id: "fish-plates",
    name: "Fish Plates",
    description: "Add Small Fries $4.49. All raw and fresh meat pricing are subject to market change.",
    items: [
      { name: "Whiting", variants: [{ label: "4pc", price: "10.99" }, { label: "6pc", price: "11.99" }] },
      { name: "White Bass", variants: [{ label: "4pc", price: "10.99" }, { label: "6pc", price: "11.99" }] },
      { name: "Tilapia", variants: [{ label: "4pc", price: "10.99" }, { label: "6pc", price: "11.99" }] },
      { name: "Ocean Perch", variants: [{ label: "4pc", price: "10.99" }, { label: "6pc", price: "11.99" }] },
      { name: "Catfish", variants: [{ label: "4pc", price: "10.99" }, { label: "6pc", price: "11.99" }] },
      { name: "Catfish Nuggets", variants: [{ label: "10pc", price: "9.49" }, { label: "20pc", price: "16.49" }] },
      { name: "Pickerel", price: "10.99", description: "2pc" },
      { name: "Orange Roughy", price: "11.49", description: "2pc" },
      { name: "Cod", price: "11.49", description: "3pc" },
    ],
  },
  {
    id: "fish-bucket",
    name: "Fish Bucket",
    description: "Catfish, Perch, Tilapia, Whiting",
    items: [
      {
        name: "Fish Bucket",
        variants: [
          { label: "10 Pc", price: "19.99" },
          { label: "20 Pc", price: "35.99" },
          { label: "25 Pc", price: "41.99" },
          { label: "50 Pc", price: "77.99" },
          { label: "100 Pc", price: "137.99" },
        ],
      },
    ],
  },
  {
    id: "shrimp",
    name: "Shrimp",
    description: "Large Hand Battered. Add Small Fries $4.49.",
    items: [
      {
        name: "Shrimp",
        variants: [
          { label: "10 Pc", price: "9.49" },
          { label: "20 Pc", price: "17.99" },
          { label: "30 Pc", price: "23.99" },
          { label: "50 Pc", price: "38.99" },
        ],
      },
      {
        name: "Jumbo Shrimp",
        variants: [
          { label: "10 Pc", price: "17.99" },
          { label: "20 Pc", price: "29.99" },
        ],
      },
    ],
  },
  {
    id: "oyster",
    name: "Oyster",
    items: [{ name: "Oyster", price: "8.99", description: "12 Pc" }],
  },
  {
    id: "lobster-crab",
    name: "Lobster & Crab",
    items: [
      { name: "1 lb Snow Crab w/ 1 pc corn", price: "34.99" },
      { name: "1 Lobster tail w/ fries, 1 pc corn", price: "22.99" },
      { name: "3 pc Crab Cakes", price: "8.99" },
    ],
  },

  // ── CHICKEN ──────────────────────────────────────────
  {
    id: "whole-wings",
    name: "Whole Wings or Dark Meat",
    description: "Add Small Fries $4.49",
    items: [
      {
        name: "Whole Wings",
        variants: [
          { label: "3 Pc", price: "6.49" },
          { label: "5 Pc", price: "11.49" },
          { label: "10 Pc", price: "19.49" },
          { label: "15 Pc", price: "29.99" },
          { label: "20 Pc", price: "38.99" },
          { label: "30 Pc", price: "57.99" },
          { label: "50 Pc", price: "94.99" },
          { label: "100 Pc", price: "184.99" },
        ],
      },
    ],
  },
  {
    id: "flavored-wing-dings",
    name: "Flavored Wing Dings",
    description: "Honey BBQ, Honey Garlic, Buffalo, Lemon Pepper, Original",
    items: [
      {
        name: "Wing Dings",
        variants: [
          { label: "10 Pc", price: "13.99" },
          { label: "20 Pc", price: "19.99" },
          { label: "30 Pc", price: "29.99" },
          { label: "50 Pc", price: "49.99" },
          { label: "100 Pc", price: "99.99" },
        ],
      },
    ],
  },
  {
    id: "jumbo-popcorn-chicken",
    name: "Jumbo Popcorn Chicken",
    items: [
      {
        name: "Popcorn Chicken",
        variants: [
          { label: "10 Pc", price: "12.99" },
          { label: "20 Pc", price: "18.99" },
          { label: "30 Pc", price: "31.99" },
          { label: "50 Pc", price: "49.99" },
        ],
      },
    ],
  },
  {
    id: "tenders",
    name: "Tenders",
    items: [
      {
        name: "Chicken Tenders",
        variants: [
          { label: "5 Pc", price: "10.99" },
          { label: "10 Pc", price: "19.99" },
          { label: "15 Pc", price: "29.99" },
          { label: "20 Pc", price: "36.99" },
        ],
      },
    ],
  },
  {
    id: "chicken-gizzard",
    name: "Chicken Gizzard",
    items: [{ name: "Chicken Gizzard", price: "8.99" }],
  },

  // ── COMBOS ───────────────────────────────────────────
  {
    id: "fish-chicken-combo",
    name: "Fish & Chicken Combo",
    description:
      "Includes small fries. Fish choices: Catfish, Perch, Whiting, Tilapia, White Bass.",
    items: [
      { name: "4 Wings & 5 Shrimp", price: "15.99" },
      { name: "3 Pc Fish & 5 Shrimp", price: "15.99" },
      { name: "3 Pc Fish & 4 Wings", price: "17.99" },
      { name: "2 Pc Fish, 2 Wings & 5 Shrimp", price: "17.99" },
      { name: "3 Pc Fish & 5 Pc Jumbo Shrimp", price: "18.99" },
    ],
  },

  // ── APPETIZERS ───────────────────────────────────────
  {
    id: "appetizers",
    name: "Appetizers",
    items: [
      { name: "Onion Rings", price: "5.49" },
      { name: "Mushrooms", price: "5.49" },
      { name: "Okra", price: "5.49" },
      { name: "Cauliflower", price: "5.49" },
      { name: "Jalapeno Poppers (6pc)", price: "5.49" },
      { name: "Hushpuppies (8pc)", price: "5.49" },
      { name: "Fried Green Tomatoes", price: "5.49" },
      { name: "Zucchini (10pc)", price: "5.49" },
      { name: "Fried Pickles", price: "5.49" },
      { name: "Fried Green Beans", price: "5.49" },
      { name: "Cheese Sticks (6pc)", price: "5.49" },
      { name: "Hot Sauce (Bottle)", price: "3.99" },
      { name: "Pickled Jalapeno", price: "1.99" },
    ],
  },

  // ── SIDES ────────────────────────────────────────────
  {
    id: "sides",
    name: "Sides",
    items: [
      { name: "Fries", variants: [{ label: "Sm", price: "4.49" }, { label: "Lg", price: "5.49" }, { label: "Family", price: "8.99" }] },
      { name: "1/2 Pan Fries", price: "16.99" },
      { name: "Cole Slaw", variants: [{ label: "Sm", price: "4.49" }, { label: "Lg", price: "6.49" }, { label: "Family", price: "8.99" }] },
      { name: "Mac & Cheese", variants: [{ label: "Sm", price: "4.49" }, { label: "Lg", price: "6.49" }, { label: "Family", price: "8.99" }] },
      { name: "Spaghetti", variants: [{ label: "Sm", price: "4.49" }, { label: "Lg", price: "6.49" }, { label: "Family", price: "8.99" }] },
      { name: "Collard Greens", variants: [{ label: "Sm", price: "4.49" }, { label: "Lg", price: "6.49" }, { label: "Family", price: "8.99" }] },
      { name: "Red Beans & Rice", variants: [{ label: "Sm", price: "4.49" }, { label: "Lg", price: "6.49" }, { label: "Family", price: "8.99" }] },
      { name: "Fried Corn on the Cob", variants: [{ label: "2pc", price: "4.49" }, { label: "4pc", price: "6.49" }, { label: "6pc", price: "8.99" }] },
    ],
  },

  // ── DESSERTS & BEVERAGES ─────────────────────────────
  {
    id: "desserts-beverages",
    name: "Desserts & Beverages",
    items: [
      { name: "Homemade Cakes", price: "4.99" },
      { name: "Banana Pudding", price: "4.99" },
      { name: "All Pies", price: "4.99" },
      { name: "Kool Aid Drinks", description: "Best Selection of Kool Aid Drinks Available" },
    ],
  },
];
