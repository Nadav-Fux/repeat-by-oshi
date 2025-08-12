# Repeat by Oshi - Sustainable Fashion Website

A modern, responsive React website for Repeat by Oshi, a sustainable fashion brand focused on eco-friendly clothing and accessories.

## Features

- **Multilingual Support**: Full Hebrew and English language support with RTL/LTR text direction
- **Modern Design**: Clean, elegant UI built with Material-UI components
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Product Catalog**: Browse sustainable fashion items with filtering and search
- **Shopping Cart**: Add items to cart with quantity management
- **User Account**: Profile management, order history, and address book
- **Sustainable Focus**: Highlighting eco-friendly practices and materials

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material-UI Icons
- **Deployment**: GitHub Pages with GitHub Actions

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Nadav-Fux/repeat-by-oshi.git
cd repeat-by-oshi
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run deploy` - Deploys the app to GitHub Pages

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TopNav.tsx      # Navigation bar
│   └── HomePage.tsx    # Home page component
├── pages/              # Page components
│   ├── ProductsPage.tsx # Product catalog
│   ├── CartPage.tsx    # Shopping cart
│   └── AccountPage.tsx # User account
├── contexts/           # React contexts
│   └── LanguageContext.tsx # Language and theme context
├── theme.ts           # Material-UI theme configuration
├── App.tsx            # Main app component
└── index.tsx          # App entry point
```

## Features Overview

### Home Page
- Hero section with brand introduction
- Brand story and sustainability mission
- Visual gallery showcasing products
- Newsletter signup
- Contact information

### Products Page
- Product grid with images and details
- Search and filter functionality
- Category-based filtering
- Sort by price, popularity, and rating
- Add to cart functionality

### Cart Page
- View cart items with quantities
- Update quantities or remove items
- Apply promo codes
- Order summary with totals
- Checkout process

### Account Page
- User profile management
- Order history tracking
- Saved addresses
- Security settings
- Two-factor authentication setup

### Language Support
- Toggle between English and Hebrew
- Automatic RTL/LTR layout switching
- Localized text and formatting
- Cultural-appropriate typography

## Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions. Every push to the main branch triggers a new deployment.

**Live Site**: [https://nadav-fux.github.io/repeat-by-oshi](https://nadav-fux.github.io/repeat-by-oshi)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact:
- Email: nadavf@gmail.com
- GitHub: [@Nadav-Fux](https://github.com/Nadav-Fux)

---

**Repeat by Oshi** - Sustainable Fashion for a Better Tomorrow 🌱