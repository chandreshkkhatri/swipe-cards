import { StyleSheet, Text, View } from "react-native";

import i18n from "./services/internationalization/i18n";

export default function MainApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{i18n.t("welcome")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 14 },
});
