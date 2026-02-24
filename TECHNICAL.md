# Technical Documentation - Career Guidance Platform

## System Requirements

- **Node.js**: v16.0 or higher
- **npm**: v7.0 or higher (or yarn v3+)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Disk Space**: ~500MB for node_modules + dist

---

## Installation & Setup

### Step 1: Clone or Access Project
```bash
cd "c:\Users\saibh\OneDrive\Pictures\Desktop\KLU\2-2\fullstack\project4"
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs all packages listed in `package.json`:
- React & React DOM
- Vite & build tools
- Tailwind CSS & PostCSS
- Framer Motion
- React Router DOM
- Lucide React icons
- TypeScript

### Step 3: Start Development Server
```bash
npm run dev
```

Expected output:
```
  VITE v7.3.1 ready in 477 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open in Browser
Navigate to: `http://localhost:5173`

---

## Development Workflow

### Hot Module Replacement (HMR)
- Changes to React components automatically reload
- No need to refresh the browser manually
- State is preserved during reload

### File Structure for Development
```
src/
├── pages/         → Each route has its own file
├── components/    → Reusable components
├── App.tsx        → Main app with routing
├── main.tsx       → Entry point
├── index.css      → Global styles
└── App.css        → Component animations
```

### Editing Components
1. Open file in editor
2. Make changes
3. Save file
4. Browser auto-reloads with changes

---

## Build & Deployment

### Production Build
```bash
npm run build
```

Output:
```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].css   # Compiled CSS
│   └── index-[hash].js    # Bundled JavaScript
```

### Preview Production Build Locally
```bash
npm run preview
```

This serves the optimized production build to test locally.

---

## Configuration Files

### `vite.config.ts`
- Vite build configuration
- React plugin setup
- Port and dev server settings

### `tsconfig.json` & `tsconfig.node.json`
- TypeScript compiler options
- Strict type checking enabled
- JSX configuration

### `tailwind.config.js`
```js
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
        accent: '#f59e0b',
        dark: '#0f172a',
      },
    },
  },
}
```

### `postcss.config.js`
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## Dependencies Explained

### Core Framework
- **react**: UI library
- **react-dom**: React rendering for web
- **react-router-dom**: Client-side routing

### Styling
- **tailwindcss**: Utility-first CSS framework
- **postcss**: CSS transformation tool
- **autoprefixer**: Browser compatibility prefixes

### Animations
- **framer-motion**: Motion library for React
  ```tsx
  import { motion } from 'framer-motion'
  <motion.div animate={{ opacity: 1 }}>
    Animated content
  </motion.div>
  ```

### Icons
- **lucide-react**: Beautifully crafted icon library
  ```tsx
  import { Briefcase, Menu } from 'lucide-react'
  <Briefcase size={24} />
  ```

### Development
- **typescript**: Type safety
- **vite**: Fast build tool
- **@vitejs/plugin-react**: React plugin for Vite

---

## Environment Setup

### No Environment Variables Needed
The application requires no `.env` file for basic functionality.

### Optional: If Adding APIs
Create `.env.local`:
```
VITE_API_URL=https://your-api.com
VITE_API_KEY=your-key-here
```

Access in code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Code Structure

### Page Component Example
```tsx
// src/pages/Quiz.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  // Component logic
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      Quiz content
    </motion.div>
  )
}
```

### Router Configuration
```tsx
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

<Router>
  <Navigation />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/careers" element={<Careers />} />
    {/* ... other routes */}
  </Routes>
</Router>
```

---

## Styling System

### Tailwind Classes
```tsx
// Tailwind utility classes
<div className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
  Button
</div>
```

### Custom CSS Components (Layer)
```css
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg;
  }
}
```

Usage:
```tsx
<button className="btn-primary">Click me</button>
```

---

## Debugging

### Browser DevTools
1. Right-click → Inspect / F12
2. **Elements**: Inspect HTML structure
3. **Console**: Check for errors
4. **Network**: Monitor API calls
5. **Application**: Check localStorage/cache

### TypeScript Errors
```bash
npm run tsc          # Check for type errors
npm run tsc --watch  # Watch mode
```

### Build Errors
```bash
npm run build -- --debug  # Verbose build output
```

---

## Performance Optimization

### Already Implemented
- ✅ Code splitting with React Router
- ✅ Tailwind CSS purging unused styles
- ✅ Framer Motion GPU acceleration
- ✅ Image optimization via Vite
- ✅ Tree-shaking unused code

### Further Optimization (Optional)
- Add image lazy loading: `<img loading="lazy" />`
- Implement virtual scrolling for long lists
- Add route-based code splitting
- Implement service workers for PWA

---

## Testing (Optional)

### Unit Testing Setup
```bash
npm install --save-dev vitest @testing-library/react
```

### Example Test
```tsx
import { render, screen } from '@testing-library/react'
import Home from '../pages/Home'

test('renders home page', () => {
  render(<Home />)
  expect(screen.getByText(/Find Your Perfect Career Path/i))
})
```

---

## Troubleshooting Guide

### Issue: `npm install` fails
**Solution**:
```bash
npm cache clean --force
rm package-lock.json
npm install
```

### Issue: Port 5173 is already in use
**Solution**:
```bash
npm run dev -- --port 3000
```

### Issue: TypeScript errors on build
**Solution**: Check `src/pages/*.tsx` for type annotations
```bash
npm run tsc  # See detailed errors
```

### Issue: Tailwind styles not applied
**Solution**: Ensure `src/index.css` is imported in `main.tsx`
```tsx
import './index.css'
```

### Issue: Animations not working
**Solution**: Check Framer Motion version
```bash
npm list framer-motion
npm install framer-motion@latest
```

---

## Production Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

### Netlify
1. Push repo to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Traditional Server
```bash
# Build once
npm run build

# Copy dist/ folder to server
# Serve with any static server
```

---

## Monitoring

### Browser Performance
- Open DevTools → Performance tab
- Record page load
- Analyze timing and bottlenecks

### Network Tab
- Check asset sizes
- Monitor API calls
- Identify slow resources

---

## Security Considerations

✅ **Already Secure**:
- No hardcoded credentials
- HTTPS recommended in production
- Input sanitization via React
- CSP compatible structure

⚠️ **Best Practices**:
- Never expose API keys in client-side code
- Use environment variables for secrets
- Validate user input on backend
- Implement CORS properly

---

## Version Management

### Current Versions
- React: 18.3.1
- Vite: 7.3.1
- Tailwind CSS: 3.x
- Framer Motion: 11.x

### Update Dependencies
```bash
npm outdated              # Check for updates
npm update               # Update all packages
npm install package@latest  # Update specific package
```

---

## Resources

- **Vite Docs**: https://vite.dev/
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Framer Motion**: https://www.framer.com/motion/
- **React Router**: https://reactrouter.com/
- **TypeScript**: https://www.typescriptlang.org/

---

## Support & Help

### Common Tasks

**Add a new career**:
1. Edit `src/pages/Careers.tsx`
2. Add entry to `CAREERS_DATA` object
3. Update `src/pages/CareerDetail.tsx` with details

**Change color scheme**:
1. Edit `tailwind.config.js` colors section
2. Update component classes using Tailwind

**Add new animation**:
1. Use Framer Motion in component
2. Define animation variants
3. Apply to motion components

**Create new page**:
1. Create `src/pages/NewPage.tsx`
2. Add Route in `src/App.tsx`
3. Add navigation link

---

**Last Updated**: February 24, 2026
**Vite Version**: 7.3.1
**Node Version**: 16.0+
