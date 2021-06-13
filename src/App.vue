<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
      <TheSearch />
    </v-app-bar>

    <v-main>
      <Card />
    </v-main>
    <TheFooter />
    <Popup v-if="popupState" />
  </v-app>
</template>

<script>
import TheSearch from "./components/TheSearch.vue";
import Card from "./components/Card.vue";
import TheFooter from "./components/TheFooter.vue";
import Popup from "./components/Popup.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    TheSearch,
    Card,
    TheFooter,
    Popup,
  },
  computed: {
    ...mapState("popup", ["popupState"]),
  },
};
</script>

<style lang="scss">
html {
  overflow: auto;
}
a {
  text-decoration: none;
}
</style>
