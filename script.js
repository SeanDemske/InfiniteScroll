const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let imagesToLoad = 5;
const apiKey = 'hckwVDAIVmhmFnDfxDFzAoJBSjxCeAGQ26DS9L9Bqn8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesToLoad}`;


// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        imagesToLoad = 20;
    }
}

// Helper function to set attributes on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Creates photo elements, adds to dom
function displayPhotos() {
    totalImages = totalImages + photosArray.length;

    photosArray.forEach((photo) => {

        // Create photo card
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Nesting elements
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



// Get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(err) {

    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();