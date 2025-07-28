// --- Node.js Build Script for Photo Portfolio (v3) ---
// This script now looks for a separate `captions.txt` file inside EACH album folder.

const fs = require('fs');
const path = require('path');

// Define paths
const photosDirectory = path.join(__dirname, 'photos');
const outputFilePath = path.join(__dirname, 'portfolio-data.json');

const portfolioData = {};

/**
 * Parses a captions.txt file from a specific album path.
 * @param {string} albumPath - The full path to the album folder.
 * @returns {Map<string, string>} A map of filenames to captions for that specific album.
 */
function loadCaptionsForAlbum(albumPath) {
    const captions = new Map();
    const captionsFilePath = path.join(albumPath, 'captions.txt'); // Look for captions.txt inside the album folder
    try {
        if (fs.existsSync(captionsFilePath)) {
            const fileContent = fs.readFileSync(captionsFilePath, 'utf8');
            const lines = fileContent.split('\n');
            
            lines.forEach(line => {
                // Ignore empty lines or comments
                if (line.trim() === '' || line.trim().startsWith('#')) {
                    return;
                }
                const parts = line.split(' : ');
                if (parts.length === 2) {
                    const fileName = parts[0].trim();
                    const caption = parts[1].trim();
                    if (fileName && caption) {
                        captions.set(fileName, caption);
                    }
                }
            });
        }
    } catch (error) {
        console.error(`Error reading captions.txt in ${albumPath}:`, error);
    }
    return captions;
}


console.log('Starting portfolio build...');

try {
    console.log(`Scanning for albums in: ${photosDirectory}`);
    const albumFolders = fs.readdirSync(photosDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    if (albumFolders.length === 0) {
        console.warn('Warning: No album folders found in the /photos directory.');
    } else {
        console.log(`Found ${albumFolders.length} albums: ${albumFolders.join(', ')}`);
    }

    // Loop through each album folder
    albumFolders.forEach(albumName => {
        portfolioData[albumName] = [];
        const albumPath = path.join(photosDirectory, albumName);
        
        // Load captions specifically for this album
        const captionsMap = loadCaptionsForAlbum(albumPath);
        if (captionsMap.size > 0) {
            console.log(`- Found ${captionsMap.size} captions in '${albumName}' album.`);
        }

        const filesInAlbum = fs.readdirSync(albumPath);

        // Loop through each file in the album
        filesInAlbum.forEach(fileName => {
            // Process only image files, ignore captions.txt itself
            if (/\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)) {
                
                // Look up the caption in the map for this album, or create a default one.
                const caption = captionsMap.get(fileName) || path.parse(fileName).name.replace(/_/g, ' ');

                const photoObject = {
                    name: fileName,
                    src: `photos/${albumName}/${fileName}`,
                    caption: caption
                };

                portfolioData[albumName].push(photoObject);
            }
        });
    });

    const jsonContent = JSON.stringify(portfolioData, null, 4);
    fs.writeFileSync(outputFilePath, jsonContent, 'utf8');

    console.log(`\n✅ Success! Portfolio data saved to ${outputFilePath}`);

} catch (error) {
    console.error('\n❌ An error occurred during the build process:');
    if (error.code === 'ENOENT') {
        console.error(`Error: The directory '${photosDirectory}' was not found.`);
        console.error("Please make sure you have created the 'photos' directory.");
    } else {
        console.error(error);
    }
}
