const mongoose = require('mongoose');

async function seedBlogs() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        console.log('Connected to DB for blog seeding...');

        const Blog = mongoose.model('Blog', new mongoose.Schema({
            title: String, description: String, category: String, 
            numViews: Number, author: String, images: Array
        }, { timestamps: true }));

        await Blog.deleteMany({});
        console.log('Cleared existing blogs.');

        const blogsData = [
            {
                title: "The Future of Smart Homes in 2026",
                description: "Discover how AI and IoT are transforming our daily lives with smarter appliances.",
                category: "Technology",
                img: "https://images.pexels.com/photos/5450272/pexels-photo-5450272.jpeg"
            },
            {
                title: "Top 10 Gadgets for Digital Nomads",
                description: "The ultimate list of essential gadgets every digital nomad should own.",
                category: "Lifestyle",
                img: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg"
            },
            {
                title: "Choosing the Perfect Laptop for Programming",
                description: "RAM, Processor, or Display? We break down exactly what you need.",
                category: "Education",
                img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
            },
            {
                title: "Sustainable Tech: Green Electronics",
                description: "Shifting towards sustainable materials and energy-efficient designs.",
                category: "Environment",
                img: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg"
            },
            {
                title: "The Rise of Foldable Smartphones",
                description: "Are foldables the future or just a fad? We look at latest trends.",
                category: "Trends",
                img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg"
            }
        ];

        for (const b of blogsData) {
            await Blog.create({
                ...b,
                numViews: Math.floor(Math.random() * 500),
                author: "Admin",
                images: [{ url: b.img }] // Fixed format to match Blog.js expectation
            });
        }

        console.log('SUCCESS: Blog data added with correct image format.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedBlogs();
