<template>
  <audio ref="player" :src="src">
    <source :src="src" type="audio/mpeg">
  </audio>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  computed: {
    player () {
      return this.$refs.player
    }
  },
  methods: {
    play () {
      this.player.play()
    },
    pause () {
      this.player.pause()
    }
  }
}
</script>

<style scoped>

</style>
