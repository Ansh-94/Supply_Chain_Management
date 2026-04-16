const mongoose = require('mongoose');
const slugify = require('slugify');

async function seed() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        console.log('Connected to DB for seeding...');

        // Models
        const Color = mongoose.model('Color', new mongoose.Schema({ title: String }, { timestamps: true }));
        const Product = mongoose.model('Product', new mongoose.Schema({
            title: String, slug: String, description: String, price: Number,
            category: String, brand: String, quantity: Number, sold: Number,
            images: Array, color: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
            tags: String, totalrating: Number
        }, { timestamps: true }));

        // 1. Clear Existing Products
        await Product.deleteMany({});
        console.log('Cleared existing products.');

        // 2. Setup Colors
        const colors_list = ["Red", "Blue", "Black", "White", "Silver", "Gold"];
        const createdColors = [];
        for (const c of colors_list) {
            let color = await Color.findOne({ title: c });
            if (!color) color = await Color.create({ title: c });
            createdColors.push(color._id);
        }

        const productsData = [
            { title: "Apple iPhone 15 Pro", price: 999, category: "Electronics", brand: "Apple", tags: "featured", img: "https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg" },
            { title: "Samsung Galaxy S24 Ultra", price: 1199, category: "Electronics", brand: "Samsung", tags: "popular", img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg" },
            { title: "Sony WH-1000XM5", price: 349, category: "Electronics", brand: "Sony", tags: "featured", img: "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg" },
            { title: "Apple MacBook Air M3", price: 1099, category: "Electronics", brand: "Apple", tags: "special", img: "https://images.pexels.com/photos/18105/pexels-photo.jpg" },
            { title: "Dell XPS 13", price: 950, category: "Electronics", brand: "Dell", tags: "popular", img: "https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg" },
            { title: "LG OLED C3 TV", price: 1299, category: "Electronics", brand: "LG", tags: "featured", img: "https://images.pexels.com/photos/5721865/pexels-photo-5721865.jpeg" },
            { title: "Samsung Refrigerator", price: 1500, category: "Appliances", brand: "Samsung", tags: "special", img: "https://images.pexels.com/photos/2330169/pexels-photo-2330169.jpeg" },
            { title: "Panasonic Microwave", price: 120, category: "Appliances", brand: "Panasonic", tags: "popular", img: "https://images.pexels.com/photos/4686820/pexels-photo-4686820.jpeg" },
            { title: "HP Spectre x360", price: 1100, category: "Electronics", brand: "HP", tags: "special", img: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg" },
            { title: "Sony PlayStation 5", price: 499, category: "Electronics", brand: "Sony", tags: "popular", img: "https://images.pexels.com/photos/5948332/pexels-photo-5948332.jpeg" },
            { title: "Canon EOS R6", price: 2200, category: "Electronics", brand: "Sony", tags: "featured", img: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg" },
            { title: "Dyson V15 Vacuum", price: 700, category: "Appliances", brand: "LG", tags: "popular", img: "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg" },
            { title: "AirPods Pro 2", price: 249, category: "Electronics", brand: "Apple", tags: "featured", img: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg" },
            { title: "Dell UltraSharp 27 Monitor", price: 450, category: "Electronics", brand: "Dell", tags: "special", img: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg" },
            { title: "Samsung Galaxy Watch 6", price: 299, category: "Electronics", brand: "Samsung", tags: "popular", img: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg" },
            { title: "Bose QuietComfort", price: 329, category: "Electronics", brand: "Apple", tags: "featured", img: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg" },
            { title: "KitchenAid Mixer", price: 380, category: "Appliances", brand: "Panasonic", tags: "special", img: "https://images.pexels.com/photos/1450901/pexels-photo-1450901.jpeg" },
            { title: "iPad Pro 12.9", price: 1099, category: "Electronics", brand: "Apple", tags: "popular", img: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg" },
            { title: "Samsung Soundbar Q990C", price: 999, category: "Electronics", brand: "Samsung", tags: "featured", img: "https://images.pexels.com/photos/157534/pexels-photo-157534.jpeg" },
            { title: "LG Front Load Washer", price: 850, category: "Appliances", brand: "LG", tags: "popular", img: "https://images.pexels.com/photos/4507714/pexels-photo-4507714.jpeg" }
        ];

        for (const p of productsData) {
            await Product.create({
                ...p,
                slug: slugify(p.title),
                description: `This is the premium ${p.title}. It features top of the line specs and excellent performance.`,
                quantity: 100,
                sold: Math.floor(Math.random() * 50),
                images: [{
                    public_id: "seed_img_" + Math.random(),
                    url: p.img
                }],
                color: [createdColors[Math.floor(Math.random() * createdColors.length)]],
                totalrating: 4
            });
        }

        console.log('SUCCESS: 20 products added with unique images.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
