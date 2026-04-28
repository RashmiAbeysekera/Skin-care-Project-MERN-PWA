require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// 2. The data from your local file
const products = [
  {
    id: 1,
    name: "Sandalnut Bloom",
    category: "skincare",
    price: 3500,
    isBestSeller: true,
    image: 'https://82e.com/cdn/shop/files/Sandalnut_50ml.png?v=1738322873&width=1946',
    description: "MOISTURISER 15 ML",
    subtitle: "Smoothening crème moisturiser with sandalwood and peptides",
    skinType: "Normal to Dry Skin",
    size: "50 ML",
    mrpNote: "MRP inclusive of all taxes.",
    shippingInfo: "Cash on Delivery | Free Shipping | Express Delivery | Easy Returns",
    certifications: [
      "DERMATOLOGICALLY TESTED",
      "TESTED ON SENSITIVE SKIN",
      "SUITABLE FOR ALL SKIN TYPES",
      "CLEAN FORMULA*",
      "PETA APPROVED VEGAN & CRUELTY FREE"
    ],
    ingredients: "Water, Caprylic/Capric Triglyceride, Propylene Glycol, Glycerin, Squalane, Avena Sativa Kernel Oil, Dimethicone, Isododecane, C14-22 Alcohols, Cetyl Alcohol, Santalum Album Kernel oil, Sodium Hyaluronate, Saccharide Isomerate, Aminoethylphosphinic Acid, Decarboxy Carnosine HCL, Bio-Saccharide Gum-1, Acetyl Hexapeptide-8, Caesalpinia Spinosa Fruit Pod Extract, Helianthus Annuus Sprout Extract, Phenoxyethanol, Sodium Acrylates Copolymer, Cetearyl Olivate, Caffeine, Dimethiconol, Dimethicone/Bis-Isobutyl PPG-20 Crosspolymer, C12-20 Alkyl Glucoside, Sorbitan Olivate, Lecithin, Tocopheryl Acetate, Fragrance, Hydroxyacetophenone, Sodium Polyacryloyldimethyl Taurate, Propanediol, Caprylyl Glycol, Butylene Glycol, Citric Acid, Sodium Citrate, Sodium Hydroxide, Sodium Benzoate, Sodium Gluconate, CI77891/Titanium Dioxide, Anisaldehyde, Tetramethyl Acetyloctahydronaphthalenes",
    fullDescription: "A rich moisturiser that’s clinically proven to deliver deep hydration, improve elasticity and strengthen your skin barrier(1) to help promote overall skin health. With consistent use over time, the skin appears smoother and brighter with reduced fine lines and wrinkles and a natural glow(2).\n\nSandalwood Nut Oil has antioxidants that help achieve an even skin tone. These antioxidants also fight free radicals, which cause damage to the skin, alleviating fine lines and wrinkles. Additionally, it has a calming and cooling effect on the skin, which is beneficial for sensitive skin.\n\nPeptides are known to help reduce muscular contraction thereby relaxing the appearance of fine lines and wrinkles and provide smoother looking skin.\n\nSandalnut Bloom is suitable for all skin types including sensitive skin.\n\n(1)Based on an instrumental analysis done on 55 women in 4 weeks.\n(2)Based on a consumer study done on 55 women in 4 weeks",
    benefits: "Sandalnut Bloom is clinically proven to:\n\nImprove skin elasticity\nMinimise the formation of wrinkles\nInstantly hydrate the skin\nImprove the skin’s clarity\nImpart a smooth texture to the skin\n\nBased on an instrumental analysis done on 55 women in 4 weeks. Individual results may vary.",
    howToUse: "After cleansing, take a coin-sized amount into the palm of your hand. Massage gently on the face and neck in upward strokes. Follow it up with sunscreen.",
    storage: "Store in a cool and dry place.\nAvoid exposure to direct sunlight.Use AM and/or PM."
  },
  {
    id: 2,
    name: "Body Milk | SPF 20 PA++",
    category: "bodycare",
    price: 4800,
    isBestSeller: false,
    image: 'https://82e.com/cdn/shop/files/Body_Milk_SPF_20_PA_1.png?v=1738056476&width=1946',
    description: "ALL SKIN TYPES 240 ML",
    subtitle: "With coconut and ceramides",
    skinType: "All Skin Types",
    size: "240 ML",
    mrpNote: "MRP inclusive of all taxes.",
    shippingInfo: "Cash on Delivery | Free Shipping | Express Delivery | Easy Returns",
    certifications: ["CLEAN FORMULA*", "REEF SAFE**", "PETA APPROVED - VEGAN & CRUELTY-FREE"],
    ingredients: "Water, Glycerin, Homosalate, Dimethicone, Dibutyl Adipate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Bis-Diisopropanolamino-PG-Propyl Dimethicone/Bis-Isobutyl PEG-14 Copolymer, Ethylhexyl Triazone, Glyceryl Monostearate, Phytosteryl/Octyldodecyl Lauroyl Glutamate, PEG-100 Stearate, Niacinamide, Sorbitan Monostearate, Panthenol, Cocus Nucifera Water, Phenoxyethanol, Glyceryl Glucoside, Ammonium Acryloyldimethyltaurate/VP Copolymer, Betaine, Trehalose, Alpha-Glucan Oligosaccharide, Caesalpinia Spinosa Fruit Pod Extract, Helianthus Annuus Sprout Extract, Sodium Benzoate, Cetearyl Alcohol, Cetearyl Glucoside, Zinc Oxide, Saccharide Isomerate, Ceramide NP, Fragrance, Caprylic/Capric Triglyceride, Glucose, Citric Acid, Sodium Gluconate, Tocopheryl Acetate, Polysorbate 20, Butyloctanol, Sodium Hydroxide, Polyhydroxystearic Acid, Leuconostoc/Radish Root Ferment Filtrate, Ammonium Acryloyldimethyltaurate/Carboxyethyl Acrylate Crosspolymer, Propylene Glycol, Lactic Acid, Sodium Citrate, Xanthan Gum, Hydrogenated Lecithin, Citronellol, Limonene, Linalool",
    howToUse: "Take an adequate amount. Massage gently into the skin. Apply as and when desired.",
    storage: "Store in a cool and dry place.\nAvoid exposure to direct sunlight."
  },
  {
    id: 3,
    name: "Gotu Kola Dew",
    category: "haircare",
    price: 5200,
    isBestSeller: true,
    image: 'https://82e.com/cdn/shop/files/Gotu_Kola_30ML_abd836c9-eb62-4ee8-b98f-09a18e89d42b.png?v=1738323015&width=1946',
    description: "Toner Serum 1 Sizes",
    subtitle: "Revitalizing toner serum with gotu kola and niacinamide",
    skinType: "All Skin Types",
    size: "30 ML",
    mrpNote: "MRP inclusive of all taxes.",
    shippingInfo: "Cash on Delivery | Free Shipping | Express Delivery | Easy Returns",
    certifications: [
      "CLINICALLY TESTED",
      "REDUCED APPEARANCE OF PORES (1)",
      "DERMATOLOGICALLY TESTED",
      "INSTANT HYDRATION (1)",
      "TESTED ON SENSITIVE SKIN",
      "IMPROVEMENT IN SKIN FIRMNESS (1)",
      "CLEAN FORMULA*",
      "PETA APPROVED VEGAN & CRUELTY FREE"
    ],
    ingredients: "Water, Propylene Glycol, Pentylene Glycol, Hexylene Glycol, Niacinamide, Glycerin, Saccharide Isomerate, Madecassoside, Caffeine, Ribes Nigrum Leaf Extract, Rubus Idaeus Leaf Extract, Melissa Officinalis Leaf Extract, Hordeum Distichon Extract, Caesalpinia Spinosa Fruit Pod Extract, Helianthus Annuus Sprout Extract, Glucosyl Hesperidin, Methylsilanol Mannuronate, Lecithin, Sclerotium Gum, Pullulan, Bio-Saccharide Gum-1, Ammonium Acryloyldimethyltaurate/VP Copolymer, Caprylyl Glycol, Benzyl Alcohol, Polyglyceryl-6 Caprylate, Polyglyceryl-4 Caprate, Sodium Polyacryloyldimethyl Taurate, Xanthan Gum, Fragrance, Phenoxyethanol, Sodium Benzoate, Citric Acid, Sodium Citrate, Sorbic Acid, Silica",
    fullDescription: "A hydrating toner serum that is proven to leave you with bright and clear skin by reducing the appearance of pores(1)\n\nGotu Kola is known to aid in collagen production and minimize premature signs of aging like dull skin, dark spots, and fine lines.\n\nNiacinamide helps in regulating melanin production to give skin an even tone. It is known to regulate oil produced from the sebaceous glands and to help restore the skin’s natural barrier against moisture loss and dehydration.",
    benefits: "Gotu Kola Dew is proven to:\n\nVisibly brighten the skin\nImprove the appearance of pores\nSoothe the skin\nImprove skin clarity\n\nBased on a consumer study done on 47 women in 4 weeks.",
    howToUse: "After cleansing, take 2-3 drops into the palm of your hand. Pat gently over your face and neck until fully absorbed into the skin. For best results, follow with Ashwagandha Bounce rejuvenating moisturiser.",
    storage: "Store in a cool and dry place.\nAvoid exposure to direct sunlight."
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing products so we don't have duplicates
    await Product.deleteMany({});
    console.log("Cleared old products.");

    // Insert the products
    await Product.insertMany(products);
    console.log("Database seeded successfully with numeric IDs!");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();