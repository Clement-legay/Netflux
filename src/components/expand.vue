<template>
  <v-card color="grey darken-4" elevation="12" height="200" width="300">
    <div id="player">
      <youtube v-if="vidPlay" height="100%" width="100%" :video-id="item.video" @ended="endVid" :player-vars="{autoplay: 1,mute: 1}"></youtube>
    </div>
    <v-sheet class="poster" height="125" :style="vidPlay ? {'background' : 'transparent'} : {'background-image' : 'url(' + item.image + ')'}" width="100%"></v-sheet>
    <v-row class="actions mt-3 ml-2">
      <v-btn v-on:click="$store.dispatch('setLecteur', true)" class="btn_add mx-2" x-small fab color="white"><v-icon color="black">{{icon.play}}</v-icon></v-btn>
      <v-btn class="btn_add mx-2" x-small fab color="grey darken-3" outlined><v-icon color="white">{{icon.plus}}</v-icon></v-btn>
      <v-btn class="btn_like mx-2" x-small fab color="grey darken-3" outlined><v-icon color="white">{{icon.thumbUp}}</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-btn v-on:click="select(item)" class="btn_like mr-6" x-small fab color="grey darken-3" outlined><v-icon color="white">{{icon.arrowDown}}</v-icon></v-btn>
    </v-row>
    <v-row class="bar">
      <v-progress-linear class="mx-6 mt-3" value="15" color="red"></v-progress-linear>
    </v-row>
  </v-card>
</template>

<script>
import {Youtube} from "vue-youtube";
import {mdiPlay, mdiPlus, mdiThumbUp, mdiArrowDown} from "@mdi/js";

export default {
  name: "expand",
  components: {
    Youtube,
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      vidPlay: true,
      icon: {
        play: mdiPlay,
        plus: mdiPlus,
        thumbUp: mdiThumbUp,
        arrowDown: mdiArrowDown
      }
    };
  },
  methods: {
    select(item) {
      this.$store.dispatch('setSelected', item);
      this.$store.dispatch('setDialog', true)
    },
    endVid() {
      this.vidPlay = false
    }
  }
}
</script>

<style scoped>
.actions {
  position: absolute;
  bottom: 38px;
  width: 100%;
 z-index: 1;
}

.bar {
  position: absolute;
  bottom:35px;
  left: 10px;
  width: 100%;
  height: 5px;
  z-index: 1;
}

.poster {
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 10;
  background-color: black;
}

#player {
  position: absolute;
  top: -30px;
  left: 0;
  width: 100%;
  height: 82.5%;
  z-index: 0;
}
</style>