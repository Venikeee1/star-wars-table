<template>
  <main
    class="home"
    @click="playIntro"
  >
    <img
      class="bg"
      src="https://i.pinimg.com/originals/6c/68/fb/6c68fbfc4bd35958742ae17574991f0f.jpg"
      alt="starwars poster"
    >
    <h1 class="glow">Let JS be with you</h1>
    <VTable
      class="table"
      :items="items"
      :head="head"
      editable
      @change="handleUpdate"
      @search="handleSearch"
    />
    <AudioPlayer ref="player" :src="soundSrc" />
    <AudioPlayer ref="introPlayer" :src="greetSrc" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import VTable from '@/components/UI/table/'
import tableData from '@/mock.json'
import { ClientStorage } from '@/utils/ClientStorage'
import { CellItem } from '@/components/UI/table/types'
import AudioPlayer from '@/components/AudioPlayer'
import soundSrc from '@/assets/sound.mp3'
import greetSrc from '@/assets/greet.mp3'

type User = {
  name: string;
  height: string | number;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

type TableData = {
  items: User[];
  titles: User;
}

export default Vue.extend(
  {
    name: 'Home',
    components: {
      VTable,
      AudioPlayer
    },
    data () {
      return {
        tableData: tableData as TableData,
        clientStorage: new ClientStorage<User[]>(),
        storageKey: 'BestStorage',
        items: [] as User[],
        soundSrc,
        greetSrc
      }
    },
    computed: {
      head (): User {
        return tableData.titles as User
      },
      player () {
        return this.$refs.player
      },
      introPlayer () {
        return this.$refs.introPlayer
      }
    },
    async created () {
      try {
        const items: User[] | void = await this.clientStorage.getItem(this.storageKey)

        if (items) {
          this.items = items
          return
        }

        this.items = tableData.items as User[]
        this.clientStorage.setItem(this.storageKey, this.items)
      } catch (e) {
        console.error(e)
      }
    },
    methods: {
      playIntro () {
        (this.introPlayer as HTMLAudioElement).play()
      },
      handleSearch () {
        (this.player as HTMLAudioElement).pause();
        (this.player as HTMLAudioElement).currentTime = 0;
        (this.player as HTMLAudioElement).play()
      },
      async handleUpdate (tableCellData: CellItem): Promise<void> {
        const { rowIndex, text }: CellItem = tableCellData

        const item = this.items[+rowIndex]
        const value = tableCellData.value as keyof User
        item[value] = text

        try {
          await this.clientStorage.setItem(this.storageKey, this.items)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
)
</script>

<style scoped lang="scss">
  .home {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    background-size: contain;
    background-position: center;
    padding: 80px 0 100px;
    z-index: 1;
    background: #000;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
  }

  .table {
    margin: 0 auto;
    max-width: 900px;
    width: 100%;
  }

  .glow {
    font-size: 80px;
    color: #fff;
    text-align: center;
    -webkit-animation: glow 1s ease-in-out infinite alternate;
    -moz-animation: glow 1s ease-in-out infinite alternate;
    animation: glow 1s ease-in-out infinite alternate;
  }

  @-webkit-keyframes glow {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
    }
  }
</style>
