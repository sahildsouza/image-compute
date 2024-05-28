document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const snapButton = document.getElementById('snap');
    const uploadButton = document.getElementById('uploadButton');
    const resultDiv = document.getElementById('result');
    const subscriptionKey = '013f59cb0669428a808fd370a4dde502';
    const endpoint = 'https://eastus.api.cognitive.microsoft.com/vision/v3.2/ocr';

    // Get access to the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
        });
    }

    // Trigger photo take
    snapButton.addEventListener('click', function() {
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
