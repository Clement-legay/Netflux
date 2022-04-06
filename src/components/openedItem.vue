<template>
    <v-card width="1000" color="grey darken-2">
      <v-row class="upperSide pa-0 ma-0">
        <div id="player">
          <youtube v-if="vidPlay" height="100%" width="100%" :video-id="item.video" @ended="endVid" :player-vars="{autoplay: 1,mute: 1}"></youtube>
        </div>
        <v-sheet class="poster" :style="vidPlay ? {'background': 'transparent'} : {'background': 'url(' + item.image + ')'}">
          <v-btn v-on:click="close" class="mx-2 btn_quit" fab x-small color="grey darken-3" outlined style="color: white"><span style="color: white; font-size: 1.5em; font-weight: lighter">X</span></v-btn>
          <div class="mx-2" id="data">
            <span class="item_title">{{item.title}}</span>
          </div>
          <v-row class="ma-0 px-8" id="btns">
            <v-btn v-on:click="$store.dispatch('setLecteur', true)" class="mx-2">
              <v-icon>{{icon.play}}</v-icon>
              REGARDER
            </v-btn>
            <v-btn class="btn_add mx-2" x-small fab color="grey darken-3" outlined><v-icon color="white">{{icon.add}}</v-icon></v-btn>
            <v-btn class="btn_like mx-2" x-small fab color="grey darken-3" outlined><v-icon color="white">{{icon.like}}</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn class="btn_like mx-2" x-small fab color="grey darken-3" outlined><v-icon color="white">{{icon.sound}}</v-icon></v-btn>
          </v-row>
        </v-sheet>
      </v-row>
      <v-row class="zoom pa-0 ma-0">
        <v-sheet color="grey darken-4" width="100%" class="pa-4" height="500">
          <v-row>
            <v-col lg="8" class="pa-6">
              <v-row>
                <span class="mr-3" style="color: limegreen">Recommandé à 1000%</span>
                <span class="mr-3" style="color: white">{{item.date.getFullYear()}}</span>
                <v-btn class="mr-3" style="color: white !important;" outlined x-small disabled>HD</v-btn>
              </v-row>
              <v-row>
                <p class="text-justify" style="color: white">{{item.desc}}</p>
              </v-row>
            </v-col>
            <v-col lg="4" class="pa-6">
              <v-row>
                <p><span style="color: #beb6b6">Distribution :</span> <span style="color: white" v-for="actor in item.cast.slice(0, 4)" :key="actor">{{actor.name}}, </span><span style="color: white">{{item.cast[5].name}}</span></p>
              </v-row>
              <v-row >
                <p><span style="color: #beb6b6">Genre : </span> <span style="color: white" v-for="genre in item.genres.slice(0, item.genres.length -1)" :key="genre">{{genre}}, </span><span style="color: white">{{item.genres[item.genres.length -1]}}</span></p>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-row>
    </v-card>
</template>

<script>
import {Youtube} from 'vue-youtube'
import {mdiPlay, mdiPlus, mdiThumbUp, mdiSurroundSound} from "@mdi/js";

export default {
  name: "openedItem",
  components: {
    Youtube
  },
  data() {
    return {
      vidPlay: true,
      icon: {
        play: mdiPlay,
        add: mdiPlus,
        like: mdiThumbUp,
        sound: mdiSurroundSound,
      }
    };
  },
  props: {
    item:
        {
          type: Object,
          required: true
        },
  },
  methods: {
    close() {
      this.$store.dispatch('setDialog', false)
      this.$store.dispatch('setSelected', undefined)
    },
    endVid() {
      this.vidPlay = false
    }
  },
}
</script>

<style scoped>
.upperSide {
  height: 500px;
  background: transparent;
}

.poster {
  position: absolute;
  width: 100%;
  height: 500px;
  z-index: 1;

  background-size: cover;
  background-position: center;
}

#player {
  position: absolute;
  top: -30px;
  left: 0;
  width: 100%;
  height: 53%;
  z-index: 1;
}

#data {
  top: 0;
  height: 85%;
}

.btn_quit {
  position: absolute;
  top: 15px;
  right: 25px;
}

#data span {
  font-size: 4em;
  font-weight: bolder;
  color: white;
  position: absolute;
  top: 200px;
  left: 60px
}

.zoom::before {
  position: absolute;
  top: 476px;
  z-index: 10;
  width: 100%;
  content: '';
  background: linear-gradient(to top, rgba(33,33,33,1) 0%, rgba(0,0,0,0) 100%);
  height: 25px
}
</style>