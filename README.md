# AI UI Generator - Frontend

The visual interface for the Deterministic UI Generator. A React-based application that provides a real-time chat interface, live component preview, and code inspection.

## 🏗️ Architecture

Built with **React**, **Vite**, and **Tailwind CSS**. The application is designed around a split-pane layout to facilitate the "Chat -> Code -> Preview" feedback loop.

### Key Features
-   **💬 Chat Interface:** Interact with the AI agent to describe UI requirements.
-   **⚡ Live Preview:** Uses `react-live` to render the AI-generated JSX code safely in real-time.
-   **📝 Code Editor:** View and manually tweak the generated code.
-   **⏱️ Version History:** Rollback to previous iterations of the UI design.

## 🚀 Setup & Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Access the app:**
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧩 Component Library

The frontend implements the "Fixed Component Library" mandated by the system architecture. These components are styled using Tailwind CSS and expose a strict prop interface for the AI to use.

### Layout Components
-   **`<Container>`**: Wrapper with max-width and padding.
-   **`<Grid>`**: CSS Grid layout system.
-   **`<HStack>` / `<VStack>`**: Flexbox wrappers for row/column layouts.
-   **`<Navbar>` / `<Sidebar>`**: Navigation structures.

### UI Elements
-   **`<Button>`**: Interactive buttons with `variant` props (primary, secondary, danger, etc.).
-   **`<Input>`**: Form fields.
-   **`<Card>`**: Content containers.
-   **`<Table>`**: structured data display.
-   **`<Modal>`**: Overlay dialogs.
-   **`<Chart>`**: Visualizations (Bar/Line/Pie) using mocked data.

## 🎨 Design System

The UI uses a **"Claude-Code" inspired aesthetic**:
-   **Typography:** Clean, sans-serif fonts for readability.
-   **Color Palette:** Neutral grays with subtle accent colors for interactions.
-   **Spacing:** Consistent 4px grid steps (Tailwind standard).

## ⚠️ Known Limitations

-   **Runtime Errors:** If the AI generates invalid JSX syntax (rare), the preview panel may break.
-   **Third-Party Libraries:** The live preview environment typically does not support arbitrary npm imports; only standard React hooks and the internal component library are available.


## 💡 End-User Guide: Getting the Best Results

-   **Be Specific:** Instead of "make a dashboard," try "create a dashboard with a sidebar navigation, a stats grid at the top, and a recent activity table below."
-   **Iterate incrementally:** Start with a broad layout, then ask for specific changes like "add a `New User` button to the top right" or "change the card variants to 'elevated'."
-   **Inspect the Code:** Use the code panel to see exactly which components the AI selected. This helps you understand how natural language maps to the component library.
-   **Use the Preview:** The live preview is your ground truth. If something looks off, ask the AI to fix it (e.g., "The charts are too narrow, can you make them full width?").
