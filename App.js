import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { useEffect } from "react";
import { getFCMToken, requestUserPermission } from "./lib/firebase";
import messaging from "@react-native-firebase/messaging";

export default function App() {
  const insets = {
    top: 50,
    bottom: 0,
  };

  useEffect(() => {
    requestUserPermission().then(getFCMToken).then((token) => {
      //handle token
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const notification = remoteMessage.notification;
      Alert.alert(
        "new notification "+notification.title,
        notification.body,
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar translucent hidden />
      <WebView
        source={{ uri: "https://nextauthassesment.vercel.app" }}
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === "notification") {
            /// do something with the notification
          }
        }}
        // onNavigationStateChange={(navState) => {
        //   const url = new URL(navState.url);
        //   const uid = url.searchParams.get("uid");
        //   if (uid) {
        //     console.log("Got UID:", uid);
        //     // Save UID, store FCM token
        //   }
        // }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("HTTP error: ", nativeEvent);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
  },
});
