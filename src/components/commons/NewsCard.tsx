import { StyleSheet, View, Text, Dimensions } from "react-native";

const NewsCard = ({ card }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{card.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    height: Dimensions.get("window").height,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
});

export default NewsCard;
