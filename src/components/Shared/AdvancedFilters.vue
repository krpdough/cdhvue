<template>
  <div class='advanced-filters__body'>
    <v-text-field
      class='search-field'
      v-model="searchType"
      label='Type'
      clearable
    />
    <v-text-field
      class='search-field'
      v-model="searchText"
      label='Text'
      clearable
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'AdvancedFilter',
  computed: {
    ...mapGetters({
      getFilters: 'cards/GET_FILTERS',
    }),
    searchType: {
      get() {
        return this.getFilters.type;
      },
      set: _.debounce(function(value) {
        this.setFilters({
          key: 'type', 
          value: value ? `${value}` : null,
        });
      }, 500)
    },
    searchText: {
      get() {
        return this.getFilters.text;
      },
      set: _.debounce(function(value) {
        this.setFilters({
          key: 'text', 
          value: value ? `${value}` : null,
        });
      }, 500)
    }
  },
  methods: {
    ...mapActions({
      setFilters: 'cards/SET_FILTERS',
    }),
  },
}
</script>

<style lang="scss">
.advanced-filters__body {
  background-color: var(--background-color-secondary);
  display: flex;
  .search-field {
    margin: 0 auto;
    max-width: 350px;
  }
}

</style>