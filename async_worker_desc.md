# Asynchronous Workers Documentation

## Overview

This document describes the asynchronous worker functions responsible for processing CSV files containing image data. These workers handle the tasks of validating CSV content, processing images, and updating request statuses.

## Worker Functions

### 1. CSV Validator Worker

**Function**: `validateCSV(csvFile)`

**Description**: 
- Asynchronously validates the format and content of the uploaded CSV file.
- Checks for required columns: Serial Number, Product Name, and Input Image URLs.
- Ensures all rows have the correct number of columns and valid data types.

**Input**: CSV file
**Output**: Boolean (valid/invalid) and error messages if invalid

### 2. Image Processing Worker

**Function**: `processImages(csvData)`

**Description**:
- Asynchronously processes each image URL found in the CSV file.
- Compresses each image to 50% of its original quality.
- Generates new URLs for the compressed images.

**Input**: Parsed CSV data
**Output**: Array of objects containing original and processed image URLs

### 3. Database Update Worker

**Function**: `updateDatabase(processedData, requestId)`

**Description**:
- Asynchronously updates the database with the processed image data.
- Associates the processed data with the corresponding product information.
- Updates the status of the processing request.

**Input**: Processed image data, Request ID
**Output**: Updated database entries

### 4. Status Update Worker

**Function**: `updateRequestStatus(requestId, status, progress)`

**Description**:
- Asynchronously updates the status and progress of a processing request.
- Triggers webhook callbacks when processing is complete or if errors occur.

**Input**: Request ID, Status (string), Progress (number)
**Output**: Updated request status in the database

## Worker Flow

1. When a CSV file is uploaded:
   - The CSV Validator Worker validates the file.
   - If valid, a new processing request is created with status "pending".

2. The Image Processing Worker:
   - Picks up pending requests from a queue.
   - Processes each image URL in the CSV data.
   - Updates the request status to "processing" and updates progress periodically.

3. The Database Update Worker:
   - Takes the processed image data.
   - Updates the database with new image URLs and product associations.

4. The Status Update Worker:
   - Updates the final status of the request to "completed" or "failed".
   - Triggers the webhook to notify of completion or failure.

## Error Handling

- If any worker encounters an error, it logs the error and updates the request status to "failed".
- The Status Update Worker ensures that the client is notified of any failures via the webhook.

## Scalability

- Workers are designed to run independently and can be scaled horizontally for improved performance.
- A job queue (e.g., Redis, RabbitMQ) is recommended for managing tasks between workers.

## Monitoring

- Each worker function logs its activities for monitoring and debugging purposes.
- Consider implementing a monitoring solution to track worker performance and errors.