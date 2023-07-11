const products = [
	{
		name: "Airpods Wireless Bluetooth Headphones",
		image: "/images/airpods.jpg",
		description:
			"Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
		brand: "Apple",
		category: "Electronics",
		price: 89.99,
		countInStock: 10,
		rating: 4.5,
		numReviews: 12,
	},
	{
		name: "iPhone 13 Pro 256GB Memory",
		image: "/images/phone.jpg",
		description:
			"Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
		brand: "Apple",
		category: "Electronics",
		price: 599.99,
		countInStock: 7,
		rating: 4.0,
		numReviews: 8,
	},
	{
		name: "Cannon EOS 80D DSLR Camera",
		image: "/images/camera.jpg",
		description:
			"Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
		brand: "Cannon",
		category: "Electronics",
		price: 929.99,
		countInStock: 5,
		rating: 3,
		numReviews: 12,
	},
	{
		name: "Sony Playstation 5",
		image: "/images/playstation.jpg",
		description:
			"The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
		brand: "Sony",
		category: "Electronics",
		price: 399.99,
		countInStock: 11,
		rating: 5,
		numReviews: 12,
	},
	{
		name: "Logitech G-Series Gaming Mouse",
		image: "/images/mouse.jpg",
		description:
			"Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
		brand: "Logitech",
		category: "Electronics",
		price: 49.99,
		countInStock: 7,
		rating: 3.5,
		numReviews: 10,
	},
	{
		name: "Amazon Echo Dot 3rd Generation",
		image: "/images/alexa.jpg",
		description:
			"Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
		brand: "Amazon",
		category: "Electronics",
		price: 29.99,
		countInStock: 0,
		rating: 4,
		numReviews: 12,
	},
	{
		name: "Samsung 4K Smart TV",
		image:
			"https://images.unsplash.com/photo-1615986200762-a1ed9610d3b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
		description:
			"Immerse yourself in stunning visuals with this Samsung 4K Smart TV. Enjoy your favorite movies, shows, and games with lifelike picture quality.",
		brand: "Samsung",
		category: "Electronics",
		price: 799.99,
		countInStock: 3,
		rating: 4.8,
		numReviews: 15,
	},
	{
		name: "Fitbit Charge 4 Fitness Tracker",
		image:
			"https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
		description:
			"Track your daily activities, heart rate, sleep patterns, and more with the Fitbit Charge 4 Fitness Tracker. Stay motivated and achieve your health and fitness goals.",
		brand: "Fitbit",
		category: "Fitness",
		price: 129.99,
		countInStock: 8,
		rating: 4.3,
		numReviews: 9,
	},
	{
		name: "Dyson V11 Cordless Vacuum Cleaner",
		image:
			"https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
		description:
			"Experience powerful and hassle-free cleaning with the Dyson V11 Cordless Vacuum Cleaner. Its advanced features and strong suction make cleaning effortless.",
		brand: "Dyson",
		category: "Home Appliances",
		price: 499.99,
		countInStock: 4,
		rating: 4.6,
		numReviews: 11,
	},
	{
		name: "Nike Air Max 270 Sneakers",
		image:
			"https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		description:
			"Step out in style and comfort with the Nike Air Max 270 Sneakers. These iconic shoes combine fashion and functionality to elevate your sneaker game.",
		brand: "Nike",
		category: "Fashion",
		price: 119.99,
		countInStock: 6,
		rating: 4.5,
		numReviews: 7,
	},
	{
		name: "KitchenAid Stand Mixer",
		image:
			"https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
		description:
			"Take your baking and cooking to the next level with the KitchenAid Stand Mixer. This versatile appliance makes it easy to create delicious recipes with ease.",
		brand: "KitchenAid",
		category: "Kitchen Appliances",
		price: 299.99,
		countInStock: 2,
		rating: 4.9,
		numReviews: 13,
	},
	{
		name: "Oakley Polarized Sunglasses",
		image:
			"https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
		description:
			"Protect your eyes and look stylish with the Oakley Polarized Sunglasses. These high-quality sunglasses offer superior clarity and reduce glare for outdoor activities.",
		brand: "Oakley",
		category: "Fashion",
		price: 149.99,
		countInStock: 5,
		rating: 4.7,
		numReviews: 10,
	},
];

export default products;