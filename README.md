# ShopHub

A full-stack MERN e-commerce app for browsing products, managing inventory, shopping with a cart, and checking out with a printable order bill.

## Features

- **Product catalog** — Browse latest products with search
- **Add / delete products** — Create products with an image URL or file upload; manage them with View and Delete
- **Shopping cart** — Update quantities, remove items, clear cart, and view order summary (subtotal, tax, free shipping)
- **Checkout bill** — Preview and print a receipt-style order slip
- **Auth UI** — Sign in / Sign up screens; navbar shows the logged-in user name with a Logout dropdown
- **Responsive UI** — Modern ShopHub design (orange accents, hero, newsletter, footer) for desktop and mobile



## Getting Started


npm install
npm install --prefix frontend
```

### 2. Configure environment

Copy the example env file and edit if needed:

```bash
copy .env.example .env
```


```bash
npm run data:import
```

### 4. Run the app

From the project root:

```bash
# Backend + frontend together
npm run dev

# Or separately:
npm run server   # API on http://localhost:5000
npm run client   # React app (proxies API to port 5000)
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## License

ISC
