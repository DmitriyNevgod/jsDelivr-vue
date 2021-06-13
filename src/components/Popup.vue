<template >
  <v-overlay :value="popupState">
    <v-card light v-click-outside="closePopup">
      <v-app-bar flat dark>
        <v-toolbar-title class="text-h6 white--text pl-0">
          {{ popupData.crtPackage.package.name }}
          {{ version ? version : popupData.crtPackage.package.version }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn color="white" icon @click="closePopup">
          <v-icon>close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-list-item>
        <v-list-item-content>
          <div class="d-flex justify-space-between">
            {{ popupData.crtPackage.package.description }}
            <div class="package-links">
              <a
                :href="popupData.crtPackage.package.links.homepage"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon>home</v-icon>
              </a>
              <a
                :href="popupData.crtPackage.package.links.npm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon>source</v-icon>
              </a>
              <a
                :href="popupData.crtPackage.package.links.repository"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon>code</v-icon>
              </a>
            </div>
          </div>
          <div class="d-flex mt-6 mb-6">
            <h2 class="font-weight-medium text-h6">
              {{ popupData.crtPackage.package.name }}
              CDN Files
            </h2>
          </div>
          <v-card>
            <div class="d-flex justify-space-between">
              <h3 class="primary--text text-h4">
                {{ popupData.crtPackage.package.name }}
              </h3>
              <select
                v-if="popupData.packageVersions"
                @change="selectVersion"
                class="select"
                v-model="version"
              >
                <option value="">
                  {{ popupData.crtPackage.package.version }}
                </option>
                <option
                  :value="val"
                  v-for="val in popupData.packageVersions.versions"
                  :key="val"
                >
                  {{ val }}
                </option>
              </select>
            </div>
            <div v-if="popupData.packageFiles">
              <a
                :href="`https://cdn.jsdelivr.net/npm/${
                  popupData.crtPackage.package.name
                }@${version ? version : popupData.crtPackage.package.version}${
                  popupData.packageFiles.default
                }`"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon>integration_instructions</v-icon>
                <span class="grey--text lighten-1">
                  /{{ popupData.crtPackage.package.name }}@{{
                    version ? version : popupData.crtPackage.package.version
                  }}</span
                ><span class="black--text">{{
                  popupData.packageFiles.default
                }}</span>
              </a>
            </div>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-overlay>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      version: "",
    };
  },
  methods: {
    ...mapMutations("popup", ["closePopup"]),
    ...mapActions("popup", ["getNewFiles"]),
    selectVersion() {
      this.getNewFiles({
        name: this.popupData.crtPackage.package.name,
        version: this.version,
      });
    },
  },
  computed: {
    ...mapState("popup", ["popupState", "popupData"]),
  },
};
</script>

<style lang="scss">
.v-overlay__content {
  width: 70%;
}
.select {
  height: 18px;
  width: 90px;
}
</style>