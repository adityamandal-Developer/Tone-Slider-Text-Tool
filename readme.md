# Project Setup and Execution Guide

This document provides instructions on how to set up and run both the backend and web components of this project, utilizing `.env` files for environment variable configuration.

## Folder Structure

The project is organized into the following primary folders:

- **`backend/`**: Contains the source code, configuration, and its own `.env` file for the backend application.
- **`web/`**: Contains the source code, assets, and its own `.env` file for the frontend web application.

## Backend Configuration (`backend/.env`)

The backend application utilizes a `.env` file located in its root directory (`backend/`) to manage environment-specific configurations. Ensure this file exists and contains the following variables:

- **`PORT`**: Specifies the port on which the backend server will listen for incoming requests. You can set this to your desired port number (e.g., `8080`).
- **`API_KEY`**: Your secret API key for accessing the Mistral AI service. **Keep this key confidential and do not commit it to version control.**

## Running the Backend

Follow these steps to get the backend application up and running:

1.  **Navigate to the Backend Directory:**

    ```bash
    cd backend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

    This command installs all the necessary packages and libraries required by the backend application, as defined in its `package.json` file.

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    This command executes the development script defined in the backend's `package.json` file. It typically starts the backend server, utilizing the environment variables defined in the `.env` file (e.g., the `PORT`). You should see output in your terminal indicating that the server has started, often along with the port number it's running on.

## Web Application Configuration (`web/.env`)

The frontend web application also uses a `.env` file, located in its root directory (`web/`), for its specific configurations. Ensure this file exists and contains the following variable:

- **`NEXT_PUBLIC_API_BASE_URL`**: This variable defines the base URL that the frontend application will use to communicate with the backend API. **Note that the `localhost:8080` part should correspond to the `PORT` configured in your `backend/.env` file.** If you change the backend port, you'll need to update this value accordingly.

## Running the Web Application

Follow these steps to set up and run the frontend web application:

1.  **Navigate to the Web Directory:**

    ```bash
    cd ../web
    ```

    _(Note: If you are currently in the `backend` directory, this command will take you to the parent directory and then into the `web` directory.)_

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

    This command installs all the required packages and libraries for the web application based on its `package.json` file.

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    This command executes the development script for the web application. It usually starts a local development server that hosts the web application, using the environment variables defined in its `.env` file (e.g., `NEXT_PUBLIC_API_BASE_URL`). You should see output in your terminal with the address (e.g., `http://localhost:3000`) where you can access the web application in your browser.

## Important Note on API Base URL

The `NEXT_PUBLIC_API_BASE_URL` in the `web/.env` file is currently set to `http://localhost:8080/api/v1/`. **Make sure that the `8080` part of this URL matches the `PORT` value you have configured in your `backend/.env` file.** If your backend runs on a different port, the frontend will not be able to communicate with it correctly.

## Concurrent Development

**RUN BOTH WEB AND BACKEND simultaneously**
