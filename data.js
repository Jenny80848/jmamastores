const products = [
    // Fashion (formerly Clothes)
    {
        id: 1,
        name: "Vintage Denim Jacket",
        category: "fashion",
        price: 75000,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Summer Floral Dress",
        category: "fashion",
        price: 52500,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Cotton T-Shirt",
        category: "fashion",
        price: 19500,
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        name: "Urban Streetwear Hoodie",
        category: "fashion",
        price: 35000,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 13,
        name: "Designer Sunglasses",
        category: "fashion",
        price: 25000,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 15,
        name: "Luxury Wristwatch",
        category: "fashion",
        price: 120000,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },

    // Household
    {
        id: 2,
        name: "Eco-Friendly Water Bottle",
        category: "household",
        price: 36750,
        image: "https://images.unsplash.com/photo-1602143407151-511191054fd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Ceramic Plant Pot",
        category: "household",
        price: 27000,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Bamboo Utensil Set",
        category: "household",
        price: 33000,
        image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        name: "Modern Table Lamp",
        category: "household",
        price: 45000,
        image: "https://images.unsplash.com/photo-1507473888900-52e1adad5481?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 12,
        name: "Non-Stick Cookware Set",
        category: "household",
        price: 85000,
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 16,
        name: "Smart Blender",
        category: "household",
        price: 60000,
        image: "https://images.unsplash.com/photo-1570222094114-28a9d8894b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },

    // Groceries (formerly Provisions)
    {
        id: 3,
        name: "Organic Coffee Beans (1kg)",
        category: "groceries",
        price: 22500,
        image: "https://images.unsplash.com/photo-1596716075908-16497fba5346?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Artisan Chocolate Bar",
        category: "groceries",
        price: 12750,
        image: "https://images.unsplash.com/photo-1533663004071-8051781289ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        name: "Premium Rice (5kg)",
        category: "groceries",
        price: 18000,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 14,
        name: "Spaghetti Pasta (Pack of 5)",
        category: "groceries",
        price: 9500,
        image: "https://images.unsplash.com/photo-1551462147-37885acc949c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 17,
        name: "Cereal Variety Pack",
        category: "groceries",
        price: 15000,
        image: "https://images.unsplash.com/photo-1521483450569-b531e289ec0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },

    // Wines & Beverages
    {
        id: 18,
        name: "Aged Red Wine (Merlot)",
        category: "wines",
        price: 45000,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 19,
        name: "Sparkling Champagne",
        category: "wines",
        price: 120000,
        image: "https://images.unsplash.com/photo-1598155523122-3842334d6c10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 20,
        name: "Fresh Orange Juice (1L)",
        category: "wines",
        price: 5000,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },

    // Perfumes
    {
        id: 21,
        name: "Chanel Coco Mademoiselle",
        category: "perfumes",
        price: 185000,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 22,
        name: "Dior Sauvage",
        category: "perfumes",
        price: 160000,
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 23,
        name: "Vanilla Body Mist",
        category: "perfumes",
        price: 12500,
        image: "img/jaymama.png"
    },
    {
        id: 23,
        name: "host body",
        category: "perfumes",
        price: 40000,
        image: "img/jaymama.png"
    }
];
