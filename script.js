const subscriptionKey = '51406f737efb42ffbb586ee795427851';
const endpoint = 'https://prod-vision-compute.cognitiveservices.azure.com/';

let videoStream;

async function processImage(file) {
    if (!file) {
        alert('Please select or capture an image.');
        return;
    }

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

async function detectObjects(file) {
    if (!file) {
        alert('Please select or capture an image.');
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

async function addDenseCaptions(file) {
    if (!file) {
        alert('Please select or capture an image.');
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

function handleFeature() {
    const featureSelect = document.getElementById('featureSelect').value;
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0] || capturedImageFile;

    if (featureSelect === 'convertText') {
        processImage(file);
    } else if (featureSelect === 'detectObjects') {
        detectObjects(file);
    } else if (featureSelect === 'denseCaptions') {
        addDenseCaptions(file);
    }
}

function previewImage() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const previewContainer = document.getElementById('imagePreviewContainer');
    const previewImage = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    } else {
        previewContainer.classList.add('hidden');
        previewImage.src = '';
    }
}

function openCamera() {
    const cameraContainer = document.getElementById('cameraContainer');
    const video = document.getElementById('video');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            videoStream = stream;
            video.srcObject = stream;
            video.play();
            cameraContainer.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
            alert('Error accessing camera. Please try again.');
        });
}

let capturedImageFile;

function captureImage() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
        capturedImageFile = new File([blob], 'captured-image.png', { type: 'image/png' });

        const previewImage = document.getElementById('imagePreview');
        const previewContainer = document.getElementById('imagePreviewContainer');
        
        previewImage.src = URL.createObjectURL(capturedImageFile);
        previewContainer.classList.remove('hidden');
    });

    videoStream.getTracks().forEach(track => track.stop());
    document.getElementById('cameraContainer').classList.add('hidden');
}
