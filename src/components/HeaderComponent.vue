<template>
    <div :class="scrolled ? 'full' : 'gradient'" v-scroll="onScroll" class="header">
        <div class="header__logo">
            <v-img height="35" width="100" src="../assets/images/6c99f7dd5a34f88ad21cd3124d89596b.png"></v-img>
        </div>
        <div class="header__menu">
            <ul>
                <li v-for="(item, index) in menu" :key="index">
                    <router-link to="item.link">{{ item.title }}</router-link>
                </li>
            </ul>
        </div>
        <div class="header__more">
          <v-icon color="white">{{icon.search}}</v-icon>
          <router-link to="#">DIRECT</router-link>
          <router-link to="#">Jeunesse</router-link>
        </div>
      <div class="header__account">
          <v-avatar size="35" color="red">JB</v-avatar>
        </div>
    </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js';

export default {
  name: "HeaderComponent",
  data() {
    return {
      icon: {search: mdiMagnify},
      scrolled: true,
      menu: [
        {
          title: "Accueil",
          link: "#"
        },
        {
          title: "Series",
          link: "#"
        },
        {
          title: "Nouveautés",
          link: "#"
        },
        {
          title: "Ma liste",
          link: "#"
        },
        {
          title: "A propos",
          link: "#"
        }
      ]
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      top > 150 ? this.scrolled = false : this.scrolled = true
    },
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Beabas Neue";
  src: url("/assets/font/BebasNeue-Regular.ttf") format("ttf");
}

.header {
    transition: 0.3s;
    width: 100vw;
    position: fixed;
    z-index: 10;
    display: flex;
    align-items: center;
    height: 60px;
}

.header__menu {
    display: flex;
    align-items: center;
}

.gradient {
  background: #000;
}

.full {
  background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
}

.header__menu ul {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
}

.header__more {
    margin-left: 650px;
    display: flex;
    align-items: center;
}

.header__more a {
    margin-left: 10px;
    margin-right: 10px;
    font-size: em;
    color: white;
    text-decoration: none;
    text-underline: none;
}

.header__account {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.header__menu ul li a {
    color: white;
    text-decoration: none;
    font-size: 0.9em;
    margin: 0 10px;
}

.header__logo {
  margin-left: 55px;
  margin-right: 25px;
}


</style>