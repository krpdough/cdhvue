<template>
  <div class='filter-wrapper'>
    <div>
      <v-text-field
        class='search-button'
        v-model="genericSearch"
        label='Search'
        clearable
        @change="addSearch"
      />
    </div>
    <div class='mana-filters'>
      <v-btn
        v-for="mana in manaList"
        :key="mana"
        :class="{'mx-2 mana-button': true, 'selected': colorFilter[mana]}" 
        fab
        small
        color='primary'
        @click="selectColor(mana)"
      >
        <i :class="['ms ms-cost ms-3x icon-height', `ms-${mana.toLowerCase()}`]"></i>
      </v-btn>
    </div>
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
</template>

<script>
import { mapActions } from 'vuex';
import 'mana-font';

export default {
  name: 'CommanderFilter',
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
      genericSearch: '',
      manaList: ['W', 'U', 'B', 'R', 'G', 'C'],
      order: 'Newest First',
      sortOrder: [
        {
          text: 'Newest First', 
          value: 'asc',
        }, {
          text: 'Oldest First', 
          value: 'desc',
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
  methods: {
    ...mapActions({
      setFilters: 'cards/SET_FILTERS',
      setOrder: 'cards/SET_ORDER',
    }),
    addSearch() {
      this.setFilters({
        key: 'name', 
        value: this.genericSearch ? `*${this.genericSearch}*` : null,
      });
    },
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
  overflow: wrap;
  .search-button {
    width: 300px;
    margin: 10px;
  }
  .mana-filters {
    margin: 10px;
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

</style>