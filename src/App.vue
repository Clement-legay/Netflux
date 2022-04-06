<template>
  <v-app>
    <header-component id="header"></header-component>
    <router-view></router-view>
    <lecteur-component></lecteur-component>
  </v-app>
</template>

<script>

import HeaderComponent from "./components/HeaderComponent";
import LecteurComponent from "@/components/lecteurComponent";
export default {
  name: 'App',
  components: {LecteurComponent, HeaderComponent},
  data: () => ({
    //
  }),
};
</script>

<style>

</style>
