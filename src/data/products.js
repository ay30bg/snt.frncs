// src/data/products.js
import blackTee from '../assets/snt 22 front black.png';
import blackTeeBack from '../assets/snt 22 back black.png';
import whiteTee from '../assets/snt_22_front_white-removebg-preview.png';
import whiteTeeBack from '../assets/snt_22_back_white-removebg-preview.png';
import greyTee from '../assets/Grey=front .png';
import greyTeeBack from '../assets/grey-back.png';


const products = [
  {
    id: 1,
    name: "URBAN FRIAR WHITE TEE",
    price: 35000,
    images: [whiteTee, whiteTeeBack], 
    category: "Hoodies",
    description: "Minimalist black hoodie made with premium cotton.",
    inStock: 0,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "URBAN FRIAR BLACK TEE",
    price: 35000,
    images: [blackTee, blackTeeBack], 
    category: "T-Shirts",
    description: "Oversized white tee with bold streetwear print.",
    inStock: 8,
    sizes: ["L", "XL"],
    // discount: 20,
    // discountAmount: 5000,
    oldPrice: 50000,
  },
  {
    id: 3,
    name: "URBAN FRIAR GREY TEE",
    price: 35000,
    images: [greyTee, greyTeeBack], 
    category: "Accessories",
    description: "Adjustable cap with embroidered logo.",
    inStock: 15,
    // discount: 10, 
    // discountAmount: 2.50
    sizes: ["L", "XL"],
  },
  {
    id: 4,
    name: "URBAN FRIAR TEE",
    price: 35000,
    image: "https://www.bon-clic-bon-genre.eu/photo/casquette-trucker-stetson_20240812120517.jpg",
    category: "Accessories",
    description: "Chunky retro sneakers with a classic 90s vibe.",
    inStock: 5
  },
];

export default products;
