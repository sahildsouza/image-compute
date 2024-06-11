const subscriptionKey = 'feff03fa272b42138f84b22983705590';
const endpoint = 'https://vision-compute-project.cognitiveservices.azure.com/';

let videoStream;
let capturedImageFile;
let currentCameraId = null;

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
    const file = document.getElementById('imageInput').files[0] || capturedImageFile;

    if (!file) {
        alert('Please select or capture an image.');
        return;
    }

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

    // Clear the captured image
    capturedImageFile = null;

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
    const previewContainer = document.getElementById('imagePreviewContainer');
    const previewImage = document.getElementById('imagePreview');

    // Clear the captured image preview
    previewContainer.classList.add('hidden');
    previewImage.src = '';

    const constraints = {
        video: {
            deviceId: currentCameraId ? { exact: currentCameraId } : undefined
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
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



function closeCamera() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }
    const cameraContainer = document.getElementById('cameraContainer');
    cameraContainer.classList.add('hidden');
}

function captureImage() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
        capturedImageFile = new File([blob], 'captured-image.png', { type: 'image/png' });

        // Clear the uploaded image
        const fileInput = document.getElementById('imageInput');
        fileInput.value = '';

        // Update the image preview
        const previewImage = document.getElementById('imagePreview');
        const previewContainer = document.getElementById('imagePreviewContainer');

        previewImage.src = URL.createObjectURL(capturedImageFile);
        previewContainer.classList.remove('hidden');
    });

    closeCamera();
}




function switchCamera() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }

    const video = document.getElementById('video');
    const cameraSelect = document.getElementById('cameraSelect');
    currentCameraId = cameraSelect.value;

    openCamera();
}

function populateCameraOptions() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const cameraSelect = document.getElementById('cameraSelect');
            cameraSelect.innerHTML = '';

            devices.forEach(device => {
                if (device.kind === 'videoinput') {
                    const option = document.createElement('option');
                    option.value = device.deviceId;
                    option.text = device.label || `Camera ${cameraSelect.length + 1}`;
                    cameraSelect.appendChild(option);
                }
            });

            if (cameraSelect.options.length > 0) {
                currentCameraId = cameraSelect.options[0].value;
                openCamera();
            }
        })
        .catch(error => {
            console.error('Error enumerating devices:', error);
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    populateCameraOptions();
});
