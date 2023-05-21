<template>
  <div class='filter-wrapper'>
    <div class='basic-filters'>
    <div>
      <v-text-field
        class='search-button'
        v-model="nameSearch"
        label='Search'
        clearable
      />
    </div>
    <ManaSelection
      :selectedColors="colorFilter"
      @clickColor="selectColor"
    />
    <div data-app class="filters__sorting">
      <v-select
        v-model="order"
        :items="sortOrder"
        item-text="text"
        item-value="value"
        label="Sorting"
        @change="updateSort"
      />
    </div>
    <div class="filters__checkboxes">
      <v-checkbox
        class="filters__checkbox"
        v-model="statusFilter.approved"
        color="primary"
        value="primary"
        label="Approved"
        @change="updateStatus"
      />
      <v-checkbox
        class="filters__checkbox"
        v-model="statusFilter.playtesting"
        color="primary"
        value="primary"
        label="Playtesting"
        @change="updateStatus"
      />
    </div>
  </div>
  <div class='advanced-filters'>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class='advanced-filters__header'>
        </v-expansion-panel-header>
        <v-expansion-panel-content class='advanced-filters__content'>
          <AdvancedFilters/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AdvancedFilters from './AdvancedFilters.vue';
import ManaSelection from './ManaSelection.vue';
import 'mana-font';

export default {
  name: 'CommanderFilter',

  components: {
    AdvancedFilters,
    ManaSelection,
  },

  data() {
    return {
      colorFilter: {
        'W': false,
        'U': false,
        'B': false,
        'R': false,
        'G': false,
        'C': false,
      },
      order: 'Newest First',
      sortOrder: [
        {
          text: 'Newest First', 
          value: 'asc',
        }, {
          text: 'Oldest First', 
          value: 'desc',
        }, {
          text: 'Most Decks',
          value: 'decks',
        }, {
          text: 'Random',
          value: 'r',
        }
      ],  
      statusFilter: {
        approved: false,
        playtesting: false,
      },
    };
  },

  computed: {
    ...mapGetters({
      getFilters: 'cards/GET_FILTERS',
    }),
    nameSearch: {
      get() {
        return this.getFilters.name;
      },
      set(value) {
        this.setFilters({
          key: 'name', 
          value: value ? `${value}` : null,
        });
      }
    },
  },

  methods: {
    ...mapActions({
      setFilters: 'cards/SET_FILTERS',
      setOrder: 'cards/SET_ORDER',
      setSearchTerms: 'cards/SET_SEARCH_TERMS',
    }),
    hasColor(color) {
      return this.colorFilter.find((c) => c===color);
    },
    selectColor(color) {
      this.colorFilter[color] = !this.colorFilter[color];
      // If we have nothing selected, we should clear the value in the filter
      const isEmpty = Object.values(this.colorFilter).every(
        (value) => value === false 
      );

      this.setFilters({key: 'coloridentity', value: isEmpty ? null : this.colorFilter});
    },
    updateStatus() {
      if (this.statusFilter.playtesting === this.statusFilter.approved) {
        this.setFilters({key: 'status', value: null});
      } else {
        this.setFilters({key: 'status', value: this.statusFilter.approved ? 'Approved' : 'Playtesting'});
      }
    },
    updateSort() {
      this.setOrder(this.order);
    },
  },
}
</script>

<style lang="scss">
.filter-wrapper {
  width: 80%;
  margin: auto;
  background-color: var(--background-color-secondary);
  display: flex;
  flex-direction: column;
  overflow: wrap;
  .basic-filters {
    display: flex;
    .search-button {
      width: 300px;
      margin: 10px;
    }
    .mana-filters {
      margin: 10px;
      padding-top: 10px;
      .mana-button {
        margin: 5px;
      }
      .icon-height {
        line-height: unset;
      }
      .selected {
        background: #8686e7;
      }
    }
    .filters__checkboxes {
      margin: 10px;
      display: flex;
      color: blue;
      .filters__checkbox {
        margin-right: 5px;
      }
    }
    .filters__sorting {
      margin: 10px;
    }
  }
  .advanced-filters {
    .advanced-filters__header {
      background-color: var(--background-color-secondary);
      border-radius: 0px;
      place-content: center;
      padding: 0px;
      min-height: unset;
    }
    .advanced-filters__content {
      background-color: var(--background-color-secondary);
    }
  }
}
@media only screen and (max-width: 720px) {
  .basic-filters {
    flex-direction: column;
  }
}

</style>