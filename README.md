# Working Links
<a href="https://sahelidisitalstudio.azurewebsites.net/" rel="nofollow">Saheli Digital Studio</a>


# Vision Compute

Vision Compute is a web application that leverages Azure Cognitive Services to provide image processing features such as text extraction, object detection, and caption generation. This application allows users to upload images or capture images using their device's camera and process them using the Azure Computer Vision API.

## Features

- **Extract Text**: Uses Azure's OCR (Optical Character Recognition) to extract text from images.
- **Detect Objects**: Identifies and labels objects within an image.
- **Add Captions**: Generates descriptive captions for the content in an image.

## Azure Cognitive Services

This project utilizes Azure's Computer Vision API for the following functionalities:
- **OCR (Optical Character Recognition)**: Extracts text from images. Endpoint: `/vision/v3.1/ocr`.
- **Object Detection**: Detects objects within an image and labels them. Endpoint: `/vision/v3.1/detect`.
- **Image Description (Dense Captions)**: Generates captions for the image, describing the scene in natural language. Endpoint: `/vision/v3.1/describe`.

## Getting Started

### Prerequisites

- Azure subscription and access to Azure Cognitive Services.
- A web server to host the application files.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sahildsouza/vision-compute.git
```

2. Navigate to the project directory:

```bash
cd vision-compute
```

3. Open `script.js` and update the `subscriptionKey` and `endpoint` variables with your Azure Cognitive Services subscription key and endpoint URL:

```javascript
const subscriptionKey = 'your-subscription-key';
const endpoint = 'https://your-endpoint-url.cognitiveservices.azure.com/';
```

### Running the Application

1. Open `index.html` in a web browser.

2. Upload an image or use the camera to capture an image.

3. Select the desired feature (Extract Text, Detect Objects, Add Captions) from the dropdown menu and click "Submit".

## File Structure

- `index.html`: The main HTML file containing the structure of the web application.
- `styles.css`: The CSS file for styling the application.
- `script.js`: The JavaScript file containing the logic for interacting with Azure Cognitive Services and handling image processing.

## Usage

1. **Upload Image**: Click on "Upload Image" and select an image from your device.
2. **Open Camera**: Click on "Open Camera" to capture an image using your device's camera.
3. **Select Feature**: Choose the desired feature from the dropdown menu.
4. **Submit**: Click on "Submit" to process the image and display the results.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Fonts - Roboto](https://fonts.google.com/specimen/Roboto)

---

Feel free to customize the `README.md` file further based on your specific requirements and preferences.
