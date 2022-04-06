<template>
  <div id="Home">
    <v-row id="current">
      <div id="player">
        <youtube v-if="vidPlay" height="100%" width="100%" :video-id="current.video" @ended="endVid" :player-vars="{autoplay: 1,mute: 1}"></youtube>
      </div>
      <v-sheet :style="current === undefined ? {'background' : '#000'} : vidPlay ? {'background' : 'transparent'} : {'background-image' : 'url(' + current.image + ')'}" class="selected pa-16" width="100%" height="900">
        <v-col v-if="current !== undefined" class="mt-12 selected_col" lg="5">
          <v-row class="mt-12">
            <span class="selected_title">{{current.title}}</span>
          </v-row>
          <v-row>
            <p class="selected_desc">{{description(current.desc)}}</p>
          </v-row>
          <v-row>
            <v-btn v-on:click="$store.dispatch('setLecteur', true)" color="white" class="py-6 px-4 mr-2 selected_button">
              <v-icon size="40">{{icon.play}}</v-icon>
              Lecture
            </v-btn>
            <v-btn style="color: #fdfdfd" v-on:click="select(current)" color="rgb(66,66,66,0.5)" class="py-6 px-4 selected_button">
              <v-icon color="white" class="mr-1" size="40">{{icon.info}}</v-icon>
              Plus d'infos
            </v-btn>
          </v-row>
        </v-col>
        <div v-else id="loading">
          <v-progress-circular indeterminate color="red" size="100"></v-progress-circular>
        </div>
      </v-sheet>
    </v-row>
    <div id="content">
      <div class="content_elements" v-for="(category, indexC) in $store.getters.getMovies" :key="indexC">
        <v-row v-if="categories[indexC].name">
          <h3 class="title_class">{{categories[indexC].name}}</h3>
        </v-row>
        <v-row>
          <v-slide-group  class="mb-5 group" center-active show-arrows mandatory v-model="categories[indexC].selected">
            <v-slide-item v-for="(item, indexI) in category.items" :key="indexI">
              <v-menu origin="center center" open-delay="500" open-on-hover transition="scale-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-card v-bind="attrs" v-on="on" v-on:click="categories[indexC].selected = 8" :style="{'background-image' : 'url(' + item.image + ')'}" color="black" :elevation="isSelected(category, item) ? 5 : 0" class="poster mx-1 my-1" :width="category.size[0]" :height="category.size[1]">
                    <span class="item_title">{{item.title}}</span>
                  </v-card>
                </template>
                <expand :item="item"></expand>
              </v-menu>
            </v-slide-item>
          </v-slide-group>
        </v-row>
      </div>
    </div>
    <v-expand-transition>
      <v-dialog v-on:click:outside="close" width="1000" height="2000" v-if="$store.getters.getSelected !== undefined" v-model="$store.getters.getDialog">
        <opened-item :item="$store.getters.getSelected"></opened-item>
      </v-dialog>
    </v-expand-transition>
  </div>
</template>

<script>
import {Youtube} from "vue-youtube";
import { mdiPlay, mdiInformationOutline } from '@mdi/js'
import OpenedItem from "@/components/openedItem";
import Expand from "@/components/expand";

export default {
    name: 'Accueil',
  components: {Expand, OpenedItem, Youtube},
  data() {
      return {
        dialog: false,
        vidPlay: false,
        selected: undefined,
        categories: [
          {
            path: 'popular',
            name: 'Populaire',
            selected: 0,
          },
          {
            path: 'top_rated',
            name: 'Les mieux notés',
            selected: 0,
          },
          {
            path: 'upcoming',
            name: 'Prochainement',
            selected: 0,
          },
          {
            path: 'now_playing',
            name: 'En salle',
            selected: 0,
          },
        ],
        icon: {
          play: mdiPlay,
          info: mdiInformationOutline
        },
        current: undefined,
      }
    },
  methods: {
      isSelected(category, item) {
        return category.items[category.selected] === item;
      },
      select(item) {
        this.$store.dispatch('setSelected', item);
        this.$store.dispatch('setDialog', true)
      },
    close() {
      this.$store.dispatch('setDialog', false)
      this.$store.dispatch('setSelected', undefined)
    },
    description(text) {
        if (text.length > 258) {
          return text.slice(0, 258) + '...';
        } else return text
    },
    endVid() {
        this.vidPlay = false
    }
  },
  mounted() {
    for (let i = 0; i < this.categories.length; i++) {
      this.$store.dispatch('setMovies', this.categories[i].path);
    }

    setTimeout(() => {
      this.current = this.$store.getters.getMovies[0].items[0]; this.vidPlay = true;
    }, 1000);
  },

}
</script>

<style scoped>

#player {
  position: absolute;
  top: -50px;
  left: -120px;
  width: 120%;
  height: 110%;
  z-index: 0;
}

#loading {
  position: absolute;
  top: 35%;
  left: 47%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

span, h3 {
  user-select: none;
}

.poster {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.selected_title {
  font-size: 4.5em;
  font-weight: bolder;
  color: #fdfdfd;
  padding: 5px;
  border-radius: 5px;
}
.selected_desc {
  font-size: 1.4em;
  color: #fdfdfd;
  text-align: justify;
  padding: 5px;
  border-radius: 5px;
}
.selected_button {
  font-size: 1.1em;
  text-transform: none;
}

.selected {
  background-position: center;
  background-size: cover;
  z-index: 1;
}

  #content {
    position: absolute;
    margin-top: -225px;
    background: linear-gradient(to top, rgba(0,0,0,1) 80%,rgba(0,0,0,0) 20%);
    height: 100vh;
    width: 100vw;
    z-index: 1;
  }

#content::before {
  content: '';
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
}


  .item_title {
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
    margin-left: 10px;

    font-size: 1.2em;
    color: #fdfdfd;
    text-transform: capitalize;
    font-weight: bolder;
  }

  .title_class {
    margin-top: 10px;
    margin-left: 55px;
    color: #fdfdfd
  }
</style>
