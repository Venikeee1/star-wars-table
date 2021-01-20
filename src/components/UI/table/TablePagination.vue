<template>
  <div class="table-pagination">
    <div class="table-pagination__actions">
      <button
        class="table-pagination__btn table-pagination__btn--prev"
        @click="$emit('prevPage')"
      >
      </button>
      <span class="table-pagination__current">
        {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        class="table-pagination__btn table-pagination__btn--next"
        @click="$emit('nextPage')"
      >
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'TablePagination',
  props: {
    perPage: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
.table-pagination {
  padding: 10px 15px;

  &__actions {
    display: flex;
    align-items: center;
    margin-top: 5px;
  }

  &__current {
    display: inline-block;
    margin: 0 5px;
    text-align: center;
  }

  &__btn {
    position: relative;
    width: 30px;
    height: 30px;
    background: none;
    cursor: pointer;
    border: none;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      border: 2px solid transparent;
      border-bottom-color: #000;
      border-right-color: #000;
      width: 10px;
      height: 10px;
      transform-origin: center;
    }

    &--prev {
      &::before {
        left: 70%;
        transform:  translate(-50%, -50%) rotate(135deg);
      }
    }

    &--next {
      &::before {
        right: 30%;
        transform:  translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
}
</style>
