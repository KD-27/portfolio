
# Mechatronics Portfolio - Kaveesha Dhananjaya

A responsive, interactive, and modern portfolio website designed for Mechatronics and Robotics engineers. Built with React, TypeScript, and Tailwind CSS.

## 📁 Project Structure

The project is built as a single-page application. Here is where the important files are located:

- **`App.tsx`**: The main container that stacks all the sections together.
- **`constants.ts`**: **(CRITICAL)** This is the "Database" of the site. All text, project details, research papers, and skill data are stored here.
- **`types.ts`**: Defines the data structures used in the app.
- **`components/`**: Contains the visual code for each section.

---

## 🖼 How to Add Your Own Images (Step-by-Step)

The easiest way to add your own pictures (for Projects, Profile, Achievements) is using the **public** folder method.

### 1. Create the Folder
In your main project folder (where `package.json` and `index.html` are), create a new folder named **`public`**.

### 2. Add Your Files
Copy your images (e.g., `my-photo.jpg`, `robot-v2.png`) into this new `public` folder.

### 3. Link in Code
Open **`constants.ts`**. When you see an `image` field, start with a forward slash `/` followed by your filename.

**Example:**
If your file is `public/robot-v2.png`:
```typescript
// inside constants.ts
image: '/robot-v2.png',
```

---

## 📄 How to Add Your Resume & Links

### 1. Add Resume PDF
1. Rename your resume file to something simple, like `resume.pdf`.
2. Drag and drop it into the **`public`** folder.

### 2. Update Links in `constants.ts`
Open **`constants.ts`** and find `SOCIAL_LINKS` at the top.

```typescript
export const SOCIAL_LINKS = {
  email: 'yourname@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yourname/',
  github: 'https://github.com/yourname',
  resume: '/resume.pdf' // MUST match your file name in public folder
};
```

---

## 🎥 How to Add Videos

You can add videos to any project card. When a user clicks the project, the video will play at the top of the expanded view.

1. Open **`constants.ts`**.
2. Find the project you want to edit in the `PROJECTS` array.
3. Add a `video` line:
   
   **Option A: YouTube**
   ```typescript
   video: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
   ```

   **Option B: Local File (MP4)**
   1. Put your `.mp4` file in the `public` folder.
   2. Link it like this:
   ```typescript
   video: '/my-robot-demo.mp4',
   ```

---

## 🛠 How to Edit Text & Data

You do not need to touch the complex React code to change text. **Everything is controlled via `constants.ts`**.

### 1. Changing Personal Info
Open `constants.ts` and look for `HERO_DATA`.
```typescript
export const HERO_DATA = {
  name: "KAVEESHA DHANANJAYA", // Change Name
  title: "MECHATRONICS ENGINEER", // Change Title
  tagline: "...", 
  intro: "..."
};
```

### 2. Updating Projects
In `constants.ts`, find the `PROJECTS` array. Each project looks like this:
```typescript
{
  id: '1',
  title: 'Your Project Title',
  description: 'Short description shown on the card',
  longDescription: 'Longer text shown when the card is clicked (The Modal)',
  tags: ['ROS2', 'Python'], // The tech stack chips
  image: '/my-project-image.jpg', // Change this to your image path
  details: [ ... ] // Bullet points for the "System Architecture" section
}
```

### 3. Updating Achievements
In `constants.ts`, edit the `ACHIEVEMENTS` array. The scrolling banner updates automatically.

---

## 🚀 Deploying to GitHub Pages

**⚠️ IMPORTANT: You must redeploy every time you make a change!**

Since this is a static site, your changes are only "baked in" when you run the build command.

1. Make your changes in the code (text, images, videos).
2. Open your terminal.
3. Run the deploy command:
   ```bash
   npm run deploy
   ```
4. Wait 2-3 minutes, and your live website will update.
