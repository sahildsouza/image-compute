# Working Links
- **Website Link** : <a href="vision-compute-project.azurewebsites.net" rel="nofollow">Vision-Compute</a>
- **Project Video** : <a href="" rel="nofollow">Video</a>
- **Project Documentation** : <a href="" rel="nofollow">Documentation</a>

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

### Prerequisites

- Azure subscription and access to Azure Cognitive Services.
- Azure App Service to host the application files.

## File Structure

- `index.html`: The main HTML file containing the structure of the web application.
- `styles.css`: The CSS file for styling the application.
- `script.js`: The JavaScript file containing the logic for interacting with Azure Cognitive Services and handling image processing.

## Usage

1. **Upload Image**: Click on "Upload Image" and select an image from your device.
2. **Open Camera**: Click on "Open Camera" to capture an image using your device's camera.
3. **Select Feature**: Choose the desired feature from the dropdown menu.
4. **Submit**: Click on "Submit" to process the image and display the results.
