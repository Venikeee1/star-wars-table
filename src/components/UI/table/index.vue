<template>
  <section class="table-wrapper">
    <VTableSearch
      :value="searchText"
      @input="handleSearch"
    />
    <VTable
      :items="currentItems"
      :head="head"
      :editable="editable"
      @cellUpdate="handleCellUpdate"
    >
      <slot></slot>
    </VTable>
    <VTablePagination
      :total-pages="totalPages"
      :current-page="currentPage"
      @nextPage="gotToNextPage"
      @prevPage="gotToPrevPage"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import VTable from '@/components/UI/table/Table'
import VTablePagination from '@/components/UI/table/TablePagination'
import VTableSearch from '@/components/UI/table/TableSearch'
import { HeaderItemType, BodyItemType, RowItem, CellItem } from './types'

export default Vue.extend({
  components: {
    VTable,
    VTablePagination,
    VTableSearch
  },
  props: {
    head: {
      type: [Array as () => HeaderItemType[], Object as () => HeaderItemType],
      required: true
    },
    items: {
      type: Array as () => BodyItemType,
      default: () => []
    },
    perPage: {
      type: Number,
      default: 10
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentPage: 1,
      searchText: ''
    }
  },
  computed: {
    totalPages (): number {
      return Math.floor(this.filterItems.length / this.perPage) + 1
    },
    normalizedItems (): RowItem[] {
      return this.items.map((item: BodyItemType, index: number) => {
        // Convert row from Object structure to Array
        return Object.entries(item).map(([value, text]) => {
          return {
            value,
            text,
            rowIndex: index
          }
        })
      })
    },
    filterItems (): RowItem[] {
      if (!this.searchText) {
        return this.normalizedItems as RowItem[]
      }

      return this.normalizedItems.filter((row: RowItem) => {
        return row.some((item: CellItem) => {
          return item.text
            .toString()
            .toLocaleLowerCase()
            .includes(this.searchText.toLocaleLowerCase())
        })
      })
    },
    currentItems (): RowItem[] {
      const startFrom: number = (this.currentPage - 1) * this.perPage
      const end: number = this.currentPage * this.perPage

      return this.filterItems.slice(startFrom, end)
    }
  },
  methods: {
    gotToNextPage (): void {
      if (this.currentPage >= this.totalPages) {
        return
      }

      this.currentPage += 1
    },
    gotToPrevPage (): void {
      if (this.currentPage <= 1) {
        return
      }

      this.currentPage -= 1
    },
    handleSearch (value: string) {
      this.searchText = value
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages
      }

      this.$emit('search')
    },
    handleCellUpdate (item: HeaderItemType) {
      const { rowIndex, value, text } = item

      this.$emit('change', { rowIndex, value, text })
    }
  }
})

/**
  TODO
 1) Add localization
 2) Add scoped slots
 3) Add feature to work with arrays of Strings for rows
 4) Add more accessibility
 5) Add debounce for search
*/
</script>

<style lang="scss" scoped>
  .table-wrapper {
    background: rgba(#fff, 0.9);
    display: inline-flex;
    flex-direction: column;
    border-radius: 3px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
    0 2px 2px 0 rgba(0,0,0,.14),
    0 1px 5px 0 rgba(0,0,0,.12);
  }
</style>
