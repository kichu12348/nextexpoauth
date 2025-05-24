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

*   **`./lib/firebase.js`:** FCM helper functions
*   **`./App.js`:** Main app with WebView and FCM
*   **`./android/`:** Android native files
*   **`google-services.json`:** Firebase config

## Key Code Snippets

### FCM Setup (`lib/firebase.js`)

```javascript
import messaging from "@react-native-firebase/messaging";

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  return authStatus === messaging.AuthorizationStatus.AUTHORIZED;
}

async function getFCMToken() {
  return await messaging().getToken();
}
```

### Main App with WebView (`App.js`)

```javascript
import { Alert } from "react-native";
import { WebView } from "react-native-webview";
import { getFCMToken, requestUserPermission } from "./lib/firebase";
import messaging from "@react-native-firebase/messaging";

export default function App() {
  useEffect(() => {
    // Initialize FCM
    requestUserPermission().then(getFCMToken).then((token) => {
      console.log("FCM Token:", token);
    });

    // Handle foreground notifications
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    });

    return unsubscribe;
  }, []);

  return (
    <WebView 
      source={{ uri: "https://nextauthassesment.vercel.app" }}
      // ...other props
    />
  );
}
```

### Android Config

```gradle
// android/build.gradle
dependencies {
  classpath 'com.google.gms:google-services:4.4.1'
}

// android/app/build.gradle
apply plugin: "com.google.gms.google-services"
```

```json
// app.json
{
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.kichu12348.nextexpoauth"
    },
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/messaging"
    ]
  }
}
```

### WebView Communication

```javascript
// Send from WebView to React Native
window.ReactNativeWebView.postMessage(JSON.stringify({
  type: "fcm_token_request"
}));

// Handle in React Native
<WebView
  onMessage={(event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === "fcm_token_request") {
      getFCMToken().then(token => {
        webViewRef.current?.postMessage(JSON.stringify({ token }));
      });
    }
  }}
/>
```

## Setup

```bash
# Install dependencies
yarn install

# Start development
yarn start

# Run on Android
yarn android
```

## Test FCM

```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "FCM_TOKEN_HERE",
    "notification": {
      "title": "Test",
      "body": "Test message"
    }
  }'
```

## Notes

*   Next.js frontend: [nextauthassesment](https://github.com/kichu12348/nextauthassesment)
*   Uses native FCM, not Expo notifications
*   WebView loads the deployed Next.js app
*   Foreground notifications show as alerts
*   Background notifications handled automatically
