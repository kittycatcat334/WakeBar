# Wakebar — Functional Focus Dark Chocolate

Premium functional dark chocolate infused with L-theanine, nuts & seeds, and vitamin B complex. Designed for deep work, sustained flow state, and steady energy without caffeine jitters.

## Features

- **Store & Product Bundles**: Solo Explorer (1 Box), Flow Master (3 Boxes - Most Popular), Deep Work Vault (6 Boxes).
- **Direct WhatsApp Ordering**:
  - Store WhatsApp Number: **`+92 314-5160556`**
  - Instant COD pre-filled WhatsApp checkout messages.
  - WhatsApp quick-order buttons in Header, Hero, Bundles, Cart Drawer, and Footer.
- **Website Orders with Owner Notifications**:
  - Instant Cash-on-Delivery (COD) checkout modal.
  - Automated owner notification dispatch:
    - **Email notification** to owner (`wakebar.pakistan@gmail.com` or custom owner address configured in store settings).
    - **WhatsApp notification** to `+92 314-5160556` containing order ID, full item breakdown, customer name, phone, address, and total in PKR.
- **Interactive Focus Calculator**: Recommends personalized chocolate bundles based on daily screen time and focus goals.
- **Sound & Haptics**: Interactive chocolate break audio snap experience.
- **Responsive & Fast**: Built with React 19, TypeScript, Tailwind CSS, and Vite.

---

## Pushing Code to GitHub

The repository is now initialized on branch `main` with all code cleanly staged and committed.

To connect this codebase to your GitHub repository and keep it updated:

### 1. Create a new GitHub repository
Go to [github.com/new](https://github.com/new) and create an empty repository (do NOT initialize with a README, .gitignore, or license).

### 2. Add your GitHub remote and push
Run the following commands in your terminal:

```bash
# Add your GitHub repository as remote origin
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git

# Ensure you are on the main branch
git branch -M main

# Push the code to GitHub
git push -u origin main
```

*(If your GitHub repository already exists with commits, run `git pull origin main --rebase` before pushing, or `git push -u origin main --force` if you want to replace it with this complete codebase).*

### 3. Storing Future Updates to GitHub
Whenever you make changes or receive new updates:

```bash
# Check status of changed files
git status

# Stage all changes
git add .

# Commit your changes
git commit -m "Update store features and styling"

# Push updates to GitHub
git push origin main
```

---

## Local Development & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Cloudflare Pages / Static Hosting

- Build output directory: `dist`
- Build command: `npm run build`
- All asset paths are configured with relative base (`./`) for seamless loading across any custom domain or subpath.
