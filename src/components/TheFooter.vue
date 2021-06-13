<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="primary">
        <strong class="subheading"> Дмитрий Невгод </strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="(soc, idx) in socialList"
          :key="idx"
          class="mx-4"
          dark
          icon
          :href="soc.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-icon size="24px">
            {{ soc.icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    socialList: [
      {
        path: "https://www.facebook.com/dmitriy.nevgod",
        icon: "mdi-facebook",
      },
      {
        path: "https://www.instagram.com/dmitriy.nevgod/",
        icon: "mdi-instagram",
      },
      {
        path: "https://t.me/dmitriy_nevgod",
        icon: "mdi-telegram",
      },
    ],
  }),
};
</script>