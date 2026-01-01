# 🎁 Digital Keepsake Box - For My Sandu

A beautiful, interactive digital gift box built with React and Tailwind CSS. This project is a virtual collection of memories, songs, and love notes, designed as a special gift.

![Project Preview](public/og-image.png)

## ✨ Features

-   **💌 Personal Letter**: A heartfelt letter sealed with a digital wax seal.
-   **📸 Polaroids Gallery**: A collection of 14 special photo memories. Click to expand and view them in detail.
-   **🎵 Mixtape for You**: A fully functional cassette player with 5 curated tracks that play real audio.
-   **🎟️ Love Coupons**: Redeemable coupons for special experiences (Movie Night, Dinner Date, etc.). Includes a "Download" feature to save them as images!
-   **🍯 Jar of Affirmations**: A jar containing 365 unique love notes—one for every day of the year. It remembers which ones you've pulled!

## 🛠️ Tech Stack

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Components**: [Radix UI](https://www.radix-ui.com/) (via shadcn/ui)
-   **Animations**: CSS Keyframes & Transitions

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ShubhamTalekar1/digital_keepsake.git
    cd digital_keepsake
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your changes to GitHub.
2.  Import the project in Vercel.
3.  Vercel will detect Vite and deploy automatically.

## 💝 Customization

-   **Photos**: Add your images to `public/photos` and update `src/components/PolaroidPhotos.tsx`.
-   **Music**: Add MP3s to `public/audio` and update `src/components/CassetteTapePlayer.tsx`.
-   **Letter**: Edit the text in `src/components/PersonalLetter.tsx`.
-   **Affirmations**: Update the list in `src/data/affirmations.ts`.

---

*Made with love.* ❤️
