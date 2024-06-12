# Working Links
- **Website Link** : <a href="https://vision-compute-project.azurewebsites.net/" rel="nofollow">Vision-Compute</a>
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

## Deployment Steps

Search for Computer Vision on Azure portal.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/1.png?raw=true)

Click on create to create new resource.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/2.png?raw=true)

Fill all the required information as shown and click on Review + Create.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/3.png?raw=true)

Once it is deployed successfully navigate to keys and endpoint and copy the key.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/4.png?raw=true)

Paste the copied key in script.js as shown below

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/5.png?raw=true)

Aslo copy the Endpoint URL.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/6.png?raw=true)

Paste the copied Endpoint URL in script.js as shown below 

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/7.png?raw=true)

Then to save the changes click on commit changes with specefic commit message.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/8.png?raw=true)

Now we need to use Azure App Services to deploy our webpage. Search for App Services on your Azure portal.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/9.png?raw=true)

Create a Web App

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/10.png?raw=true)

Fill all the required information as shown below.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/11.png?raw=true)

Select the pricing plan as per your requirements.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/12.png?raw=true)

Now to deploy the project from github navigate to Deployment tab and enable continuous deployment and click on Authorize.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/13.png?raw=true)

Now sinin to your github account and click on Authorize AzureAppService.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/14.png?raw=true)

Now select your organization, repository & branch and enable basic authentication.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/15.png?raw=true)

And click on create. Once created deployment proccess will start automatically.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/16.png?raw=true)

Now lets create one storage account which we'll use later for backup purpose of our web app. Search for Storage Accounts on the Azure portal.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/17.png?raw=true)

Fill all the required information as shown below.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/18.png?raw=true)

Now navigate to Advanced tab and click on "Allow enabling anonymous access on individual contaners" for anonymous access.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/19.png?raw=true)

Now click on review + create.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/20.png?raw=true)

Now we need to create one container to store our backup files. Follow the setps shown below.

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/21.png?raw=true)

Now go back to App service and in settings click on backups and select the storage account and the continer which you have created earlier and set the backup schedule as per your requirements. 

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/22.png?raw=true)



![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/23.png?raw=true)

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/24.png?raw=true)

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/25.png?raw=true)

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/26.png?raw=true)

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/27.png?raw=true)

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/28.png?raw=true)

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/29.png?raw=true)

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/30.png?raw=true)

![Computer Vision](https://github.com/sahildsouza/vision-compute/blob/main/images/31.png?raw=true)
