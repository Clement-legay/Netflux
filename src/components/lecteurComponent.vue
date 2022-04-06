<template>
  <v-dialog v-on:click:outside="$store.dispatch('setLecteur', false)" v-model="$store.getters.getLecteur" fullscreen hide-overlay transition="scale-transition" origin="center center">
    <v-card class="lecteur">
      <Youtube class="player" video-id="zL19uMsnpSU" height="100%" width="100%" :player-vars="{autoplay: 1,mute: 1, loop:1}"></Youtube>
      <v-sheet height="100%" width="100%" class="coverit" color="rgba(0,0,0,0)">
        <v-btn v-on:click="$store.dispatch('setLecteur', false)" class="mt-5 ml-5" fab rounded small outlined color="white" ><span style="color: white">X</span></v-btn>
      </v-sheet>
    </v-card>
  </v-dialog>
</template>

<script>
import {Youtube} from "vue-youtube";

export default {
  name: "lecteurComponent",
  components: {
    Youtube
  },
}
</script>

<style scoped>
.lecteur {
  height: 100%;
  width: 100%;
}
.coverit {
  top: 0;
  background: transparent;
  position: absolute;
  z-index: 1;
}
.player {
  position: absolute;
  z-index: 0;
}
</style>