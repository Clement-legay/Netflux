<template>
  <div>

  </div>
</template>

<script>
import {Youtube} from 'vue-youtube';

export default {
  name: "test",
  components: {
    Youtube
  },
  methods: {
    ended() {
      console.log('ended');
    }
  }
}
</script>

<style scoped>

</style>