import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";

import i18n from "../../services/internationalization/i18n";
import NewsCard from "../commons/NewsCard";

const data = Array.from({ length: 20 }, (_, i) => ({
  title: `Card #${i + 1}`,
}));

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Swiper
        verticalSwipe={true}
        horizontalSwipe={false}
        backgroundColor={"#808080"}
        cards={data}
        renderCard={(card) => <NewsCard card={card} />}
        showSecondCard={true}
        swipeBackCard={true}
        stackSize={3}
        onSwiped={() => console.log("onSwiped")}
        onSwipedAll={() => console.log("onSwipedAll")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});
