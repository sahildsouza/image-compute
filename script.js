document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const snapButton = document.getElementById('snap');
    const uploadButton = document.getElementById('uploadButton');
    const flipCameraButton = document.getElementById('flipCamera');
    const resultDiv = document.getElementById('result');
    const subscriptionKey = '013f59cb0669428a808fd370a4dde502';
    const endpoint = 'https://eastus.api.cognitive.microsoft.com/vision/v3.2/ocr';

    let currentStream;
    let useFrontCamera = true;

    function stopMediaTracks(stream) {
        stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    async function getCameraStream() {
        if (currentStream) {
            stopMediaTracks(currentStream);
        }

        const constraints = {
            video: {
                facingMode: useFrontCamera ? 'user' : 'environment'
            }
        };

        try {
            currentStream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = currentStream;
        } catch (error) {
            console.error('Error accessing camera: ', error);
        }
    }

    // Initialize camera stream
    getCameraStream();

    // Flip camera
    flipCameraButton.addEventListener('click', () => {
        useFrontCamera = !useFrontCamera;
        getCameraStream();
    });

    // Capture image from video
    snapButton.addEventListener('click', () => {
        context.drawImage(video, 0, 0, 320, 240);
        resultDiv.textContent = 'Image captured. Now click "Analyze Image" to perform OCR.';
    });

    // Analyze the captured image
    uploadButton.addEventListener('click', async () => {
        canvas.toBlob(async (blob) => {
            resultDiv.textContent = "Analyzing image, please wait...";

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Ocp-Apim-Subscription-Key': subscriptionKey,
                        'Content-Type': 'application/octet-stream'
                    },
                    body: blob
                });

                if (!response.ok) {
                    throw new Error(`Server response: ${response.status}`);
                }

                const data = await response.json();
                const extractedText = extractTextFromResponse(data);
                resultDiv.textContent = extractedText || "No text found in image.";
            } catch (error) {
                resultDiv.textContent = `Error: ${error.message}`;
            }
        });
    });

    function extractTextFromResponse(data) {
        if (!data || !data.regions) return null;

        return data.regions.map(region => 
            region.lines.map(line => 
                line.words.map(word => word.text).join(' ')
            ).join('\n')
        ).join('\n\n');
    }
});
