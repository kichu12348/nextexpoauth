# Next.js Expo Auth and FCM Integration

This project demonstrates the integration of a Next.js application with Google Sign-Up into an Expo Android app using WebView, along with Firebase Cloud Messaging (FCM) for push notifications.

## Assignment Details

The core requirements for this project were:

1.  **Next.js Web Application:**
    *   Create a simple project using Next.js and Material-UI (MUI).
    *   Implement a Google Sign-Up feature.
    *   The frontend for this part is developed in a separate repository:
        *   GitHub: [https://github.com/kichu12348/nextauthassesment](https://github.com/kichu12348/nextauthassesment)
        *   Deployed Site: [nextauthassesment.vercel.app](https://nextauthassesment.vercel.app)

2.  **Expo Android App:**
    *   Create a corresponding Expo Android application.

3.  **WebView Integration:**
    *   Integrate the Next.js project (hosted at [nextauthassesment.vercel.app](https://nextauthassesment.vercel.app)) within the Expo app using a WebView component.

4.  **Firebase Cloud Messaging (FCM):**
    *   Implement FCM to handle push notifications within the Expo app.
    *   **Note:** This implementation uses native FCM integration via `@react-native-firebase/messaging` and does not rely on Expo's direct notification service.

## Project Structure

*   **`./` (Root Directory):** Contains the Expo Android application.
*   **`./lib/firebase.js`:** Contains Firebase Cloud Messaging (FCM) helper functions for requesting user permission and retrieving the FCM token.
*   **`./App.js`:** The main entry point for the Expo application, including WebView setup and FCM initialization.
*   **`./android/`:** Android native project files.
*   **`google-services.json`:** Firebase configuration file for the Android app.

## Key Features Implemented

*   **Google Sign-Up:** Handled by the Next.js web application, accessible via the WebView.
*   **WebView Integration:** The Next.js application is loaded into the Expo app.
*   **Native FCM Push Notifications:**
    *   Permission request for notifications.
    *   Retrieval of FCM token.
    *   Handling of incoming foreground messages (displaying an alert).

## Setup and Running the Expo App

1.  **Clone the repository (this Expo project).**
2.  **Install dependencies:**
    ```bash
    yarn install
    # or
    npm install
    ```
3.  **Ensure `google-services.json` is correctly placed in the root and `android/app/` directory.** (It seems to be in the root in your provided file structure, ensure it's also copied or linked to `android/app/google-services.json` if not already handled by a build step).
4.  **Run the Expo app:**
    *   To start the development server:
        ```bash
        yarn start
        # or
        npm start
        ```
    *   To run on an Android emulator/device (after starting the dev server):
        ```bash
        yarn android
        # or
        npm run android
        # or press 'a' in the terminal where Expo CLI is running.
        ```

## Notes

*   The Next.js application (authentication, UI) is maintained in the [nextauthassesment](https://github.com/kichu12348/nextauthassesment) repository.
*   This Expo application focuses on wrapping the web app and integrating native FCM.
*   Communication between WebView and the React Native app (e.g., for passing tokens or handling specific events) can be implemented using `postMessage` and `onMessage` props of the WebView component.
