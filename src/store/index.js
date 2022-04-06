import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const getElement = async (path) => {
  const result = await axios.get('https://api.themoviedb.org/3/' + path + '?api_key=647aa4417eee0dbae75f6335f3c255ee&language=en-FR')
  return result.data
}

export default new Vuex.Store({
  state: {
    movies:[],
    expand: false,
    dialog: false,
    selected: undefined,
    lecteur: false,
  },
  getters: {
    getMovies: state => state.movies,
    getExpand: state => state.expand,
    getDialog: state => state.dialog,
    getSelected: state => state.selected,
    getLecteur: state => state.lecteur,
  },
  mutations: {
    setMovies(state, movies) {
      state.movies.push(movies)
    },
  },
  actions: {
    async setMovies(state, name) {
      let movies = {name: name, selected: 0, size: [225, 135], items: []}
      movies.items = (await getElement('movie/' + name)).results
      const genres = (await getElement('genre/movie/list')).genres

      for (let i = 0; i < movies.items.length; i++) {
        const movie = movies.items[i]
        movie.video = (await getElement('movie/' + movie.id + '/videos')).results
        movie.distribution = (await getElement('movie/' + movie.id + '/credits'))
        if (movie.video.length > 0) {
          movie.video.find(video => {
            if (video.type === 'Trailer') {
              movie.video = video.key
              return true
            }
          })
        } else {
          movie.video = null
        }
        movies.items[i] = {id: movie.id, cast: movie.distribution.cast, crew: movie.distribution.crew, image: 'https://image.tmdb.org/t/p/original' + movie.poster_path, title: movie.title, desc: movie.overview, date: new Date(movie.release_date), genres: movie.genre_ids.map(v => genres.find(g => g.id === v).name), video: movie.video}
      }

      state.commit('setMovies', movies)
    },

    setSelected(state, selected) {
      this.state.selected = selected
    },

    setExpand(state, expand) {
      this.state.expand = expand
    },

    setDialog(state, dialog) {
      this.state.dialog = dialog
    },

    setLecteur(state, lecteur) {
      this.state.lecteur = lecteur
    },
  },


  modules: {
  }
})
