# Photography Portfolio Template

A simple, modern, and highly customizable photography portfolio website template. This project uses a Node.js script to dynamically generate your portfolio based on your folder structure, allowing you to manage your photos without touching the HTML code.

## Features

* **Dynamic Album Creation**: Each folder inside the `/photos` directory automatically becomes a new album on the website.

* **Homepage Curation**: Easily select which photos appear on the homepage by prefixing their filenames with `home_`.

* **Configurable Captions**: Add custom captions for each photo using simple `captions.txt` files within each album folder.

* **Centralized Site Configuration**: Manage your name, social media links, "About" text, and more from a single `config.json` file.

* **Responsive Design**: The photo grid looks great on all devices, adjusting from 5 columns on desktops to 3 on mobile.

* **Modern UI**: Features include a pop-up image viewer with a blurred background and a clean "About" modal.

* **Zero Dependencies (Front-End)**: The website itself runs on plain HTML, CSS (Tailwind), and JavaScript, making it fast and easy to deploy.

## Project Structure

```

/
├── photos/
│   ├── Landscapes/
│   │   ├── home\_mountain.jpg
│   │   ├── waterfall.jpg
│   │   └── captions.txt
│   └── Portraits/
│       ├── home\_portrait\_1.jpg
│       └── captions.txt
├── index.html          \# The main homepage
├── albums.html         \# The page that shows all album folders
├── album-detail.html   \# The page that shows photos within a specific album
├── build-script.js     \# Node.js script to generate photo data
├── config.json         \# Main configuration file for site settings
├── portfolio-data.json \# (Auto-generated) The data file used by the HTML pages
└── README.md           \# This file

```

## Setup and Installation

### Prerequisites

You must have [Node.js](https://nodejs.org/) and its package manager, npm, installed on your computer.

### Installation

1. **Clone or Download**: Get the project files onto your local machine.

2. **Install `serve`**: This is a simple, powerful package for serving static sites. Open your terminal and run this command to install it globally:

```

npm install -g serve

```

## How to Use

### 1. Add Your Photos

* Navigate to the `/photos` directory.

* Create a new folder for each album you want (e.g., `Landscapes`, `Weddings`, `Travel`).

* Place your `.jpg`, `.png`, or other image files inside the corresponding album folder.

* **To make a photo appear on the homepage**, name the file with a `home_` prefix (e.g., `home_sunset.jpg`, `home_portrait_1.png`). These photos will appear on the homepage *and* in their respective albums.

### 2. Customize Captions

* Inside each album folder (e.g., `/photos/Landscapes/`), create a file named `captions.txt`.

* Add your captions using the format `filename.jpg : Your custom caption here`, with one per line.

```

# photos/Landscapes/captions.txt

home\_mountain.jpg : A beautiful sunset over the mountains.
waterfall.jpg : The powerful cascade of a hidden waterfall.

```

* If a photo doesn't have an entry in `captions.txt`, its filename will be used as the default caption.

### 3. Configure Your Site

* Open the `config.json` file.

* Edit the values for `siteTitle`, `photographerName`, `aboutText`, and your social media `url`s.

## Running the Project

You must follow these two steps in order every time you add or change photos/captions.

### Step 1: Build the Data File

Before launching the site, you need to run the build script. This script scans your `/photos` folders and generates the `portfolio-data.json` file that the website uses.

In your terminal, run:

```

node build-script.js

```

### Step 2: Launch the Server

After the build is complete, start the local server. The command `serve -l 8000` will start a server on port 8000.

In your terminal, run:

```

serve -l 8000

```

Now, open your web browser and navigate to **http://localhost:8000** to see your portfolio.

## Debugging / Troubleshooting

### My changes are not showing up!

This is almost always a **browser caching** issue. Your browser stores an old version of your data files for speed. To fix this, you need to force it to download the new versions.

* **Hard Refresh**: The quickest solution is to do a hard refresh on your browser page.

  * **Windows/Linux**: `Ctrl + Shift + R`

  * **Mac**: `Cmd + Shift + R`

* **Disable Cache in DevTools**: For a more permanent solution during development, open your browser's Developer Tools (`F12`), go to the "Network" tab, and check the "Disable cache" box. Your changes will now appear with a normal refresh as long as the tools are open.
