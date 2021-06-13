<template>
  <v-toolbar flat color="transparent">
    <v-toolbar-title class="logo"> jsDelivr | APP</v-toolbar-title>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      class="mt-3"
    ></v-text-field>
  </v-toolbar>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  methods: {
    ...mapMutations(["setSearchField"]),
    ...mapActions(["getPackageList"]),
  },
  computed: {
    ...mapState(["searchField"]),
    search: {
      get() {
        return this.searchField;
      },
      set(val) {
        this.setSearchField(val); //изменить значение поиска в стейте
        this.getPackageList({ name: val, limit: 10 }); //отправить запрос для получение данных
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  margin-right: 5%;
}
</style>