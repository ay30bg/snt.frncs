// src/data/products.js
import blackTee from '../assets/snt 22 front black.png';
import blackTeeBack from '../assets/snt 22 back black.png';
import whiteTee from '../assets/snt_22_front_white-removebg-preview.png';
import whiteTeeBack from '../assets/snt_22_back_white-removebg-preview.png';
import greyTee from '../assets/Grey=front .png';
import greyTeeBack from '../assets/grey-back.png';
import blackCap from '../assets/black snt-frncs cap.png';

const products = [
  {
    id: 1,
    name: "URBAN FRIAR WHITE TEE",
    price: 35000,
    images: [whiteTee, whiteTeeBack], 
    category: "T-Shirts",
    description: "Oversized white tee with bold streetwear print.",
    inStock: 0,
    sizes: ["M", "L", "XL"],
    oldPrice: 45000,
  },
  {
    id: 2,
    name: "URBAN FRIAR BLACK TEE",
    price: 35000,
    images: [blackTee, blackTeeBack], 
    category: "T-Shirts",
    description: "Oversized black tee with bold streetwear print.",
    inStock: 0,
    sizes: ["M", "L", "XL"],
    // discount: 20,
    // discountAmount: 5000,
    oldPrice: 45000,
  },
  {
    id: 3,
    name: "URBAN FRIAR GREY TEE",
    price: 35000,
    images: [greyTee, greyTeeBack], 
    category: "T-Shirts",
    description: "Oversized black tee with bold streetwear print.",
    inStock: 0,
    // discount: 10, 
    // discountAmount: 2.50
    sizes: ["M", "L", "XL"],
    oldPrice: 45000,
  },
  {
    id: 4,
    name: "URBAN FRIAR BLACK CAP",
    price: 18000,
    image: blackCap,
    category: "Accessories",
    description: "Retro-inspired cap with a classic 90s vibe.",
    inStock: 6,
  },
];

export default products;




