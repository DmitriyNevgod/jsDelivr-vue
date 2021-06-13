<template>
  <div>
    <p v-if="getTenItems === null" class="text-center mt-6">
      Make a correct request
    </p>
    <v-card
      v-for="(item, idx) in getTenItems"
      :key="idx"
      max-width="70%"
      class="ml-auto mr-auto mb-6 mt-5"
      outlined
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-5">
            <a
              href="#"
              class="card-title"
              @click="
                openPopupData({
                  name: item.package.name,
                  version: item.package.version,
                })
              "
            >
              {{ item.package.name }}
            </a>
          </v-list-item-title>
          <div class="package-owner mb-5">
            <!-- <a href="#"></a> -->
            <span class="package-version">
              <v-icon color="black">local_offer</v-icon>
              {{ item.package.version }}
            </span>
          </div>
          <v-list-item-subtitle>
            {{ item.package.description }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <div class="package-links">
          <a
            :href="item.package.links.homepage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-icon>home</v-icon>
          </a>
          <a
            :href="item.package.links.npm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-icon>source</v-icon>
          </a>
          <a
            :href="item.package.links.repository"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-icon>code</v-icon>
          </a>
        </div>
      </v-list-item>
    </v-card>
    <div class="text-center" v-if="getTenItems">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="7"
        @input="getNextPage"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      page: 1,
      oldPage: 1,
      pageCount: 5,
    };
  },
  methods: {
    // Пагинация
    getNextPage(num) {
      let offset = num + "0" - 10;
      this.getPackageList({
        name: this.searchField,
        limit: 10,
        offset,
      });

      //Scroll TOP
      this.$vuetify.goTo(0);

      //динамическое изменение количества кнопок страниц
      if (num < this.oldPage) {
        this.oldPage = this.page;
        this.pageCount -= 2;
      } else if (num > this.oldPage) {
        this.oldPage = this.page;
        this.pageCount += 2;
      }
    },
    ...mapActions("popup", ["openPopupData"]),
    ...mapActions(["getPackageList"]),
  },
  computed: {
    ...mapGetters(["getTenItems"]),
    ...mapState(["searchField"]),
  },
};
</script>

<style lang="scss" scoped>
.card-title {
  color: #000;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.package-version {
  font-size: 1em;
  border: 1px solid #eee;
  padding: 3px;
  border-radius: 7px;
  i {
    font-size: inherit;
  }
}
</style>

<style lang="scss">
.package-links {
  a {
    text-decoration: none;
    &:hover i {
      color: #212121;
    }
    i {
      color: #757575;
    }
  }
}
</style>
