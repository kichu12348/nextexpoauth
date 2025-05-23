import { firebase } from "@react-native-firebase/app"; // Import the firebase app instance
import messaging from "@react-native-firebase/messaging";

async function requestUserPermission() {
  // No direct change needed here for requestPermission itself,
  // but be mindful of how you initialize and use messaging() if you were chaining.
  // The core issue is the namespaced API, which getApp() helps resolve.
  // However, for messaging().requestPermission(), the direct call often remains similar.
  // The key is that future interactions might require getting messaging from a specific app instance if you use multiple apps.
  // For a single default app, the direct import often still works but the warning encourages the modular pattern.

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    return authStatus;
  }
}

async function getFCMToken() {
  const fcmToken = await messaging().getToken();

  if (fcmToken) {
    return fcmToken;
  } else {
    return null;
  }
}

export { requestUserPermission, getFCMToken };
