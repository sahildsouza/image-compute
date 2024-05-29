const subscriptionKey = '51406f737efb42ffbb586ee795427851';
const endpoint = 'https://prod-vision-compute.cognitiveservices.azure.com/';

// Function to process image for OCR
async function processImage() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${endpoint}/vision/v3.1/ocr`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': 'application/octet-stream'
            },
            body: file
        });

        const data = await response.json();
        const resultElement = document.getElementById('result');

        if (data.regions.length > 0) {
            let text = '';
            data.regions.forEach(region => {
                region.lines.forEach(line => {
                    line.words.forEach(word => {
                        text += `${word.text} `;
                    });
                    text += '\n';
                });
            });
            resultElement.textContent = text;
        } else {
            resultElement.textContent = 'No text detected.';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to process image for object detection
async function detectObjects() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image file.');
        return;
    }

    try {
        const response = await fetch(`${endpoint}/vision/v3.1/detect`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': 'application/octet-stream'
            },
            body: file
        });

        const data = await response.json();
        const resultElement = document.getElementById('result');

        if (data.objects.length > 0) {
            let objects = '';
            data.objects.forEach(obj => {
                objects += `${obj.object}\n`;
            });
            resultElement.textContent = objects;
        } else {
            resultElement.textContent = 'No objects detected.';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to process image for dense captions
async function addDenseCaptions() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image file.');
        return;
    }

    try {
        const response = await fetch(`${endpoint}/vision/v3.1/describe`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': 'application/octet-stream'
            },
            body: file
        });

        const data = await response.json();
        const resultElement = document.getElementById('result');

        if (data.description && data.description.captions.length > 0) {
            let captions = '';
            data.description.captions.forEach(caption => {
                captions += `${caption.text}\n`;
            });
            resultElement.textContent = captions;
        } else {
            resultElement.textContent = 'No captions detected.';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to handle the feature selection
function handleFeature() {
    const featureSelect = document.getElementById('featureSelect').value;
    if (featureSelect === 'convertText') {
        processImage();
    } else if (featureSelect === 'detectObjects') {
        detectObjects();
    } else if (featureSelect === 'denseCaptions') {
        addDenseCaptions();
    }
}
