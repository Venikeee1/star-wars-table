<template>
  <div class="table-search">
    <div class="table-search__inner">
      <input
        :id="id"
        class="table-search__input"
        :class="styles"
        type="text"
        :value="value"
        v-on="applyListeners()"
        v-bind="$attrs"
      >
      <label
        :for="id"
        class="table-search__label"
      >
        <slot>Search</slot>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { nanoid } from 'nanoid'
import Vue from 'vue'

type Listeners = {
  [x: string]: unknown;
}

export default Vue.extend({
  name: 'TableSearch',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    id (): string {
      return nanoid()
    },
    styles () {
      return {
        'table-search__input--full-filled': Boolean(this.value)
      }
    }
  },
  methods: {
    applyListeners (): Listeners {
      return {
        ...this.$listeners,
        input: (event: Event) => {
          const element = event.currentTarget as HTMLInputElement
          this.$emit('input', element.value)
        }
      }
    }
  }
})
</script>

<style scoped lang="scss">
.table-search {
  padding: 15px 15px 10px;

  &__inner {
    width: 50%;
    max-width: 350px;
    position: relative;
    display: inline-flex;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 100%;
      background: #7d7575;
    }
  }

  &__label {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: transform 0.4s;
    transform-origin: 0 0;
  }

  &__input {
    width: 100%;
    border: none;
    padding: 5px 0;
    outline: none;
    background: none;

    &:focus+label, &--full-filled+label {
      transform: translateY(-9px) scale(0.7);
    }
  }
}
</style>
