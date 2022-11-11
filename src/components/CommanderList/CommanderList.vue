<template>
  <div class="commander-list-wrapper">
    <TitleSection/>
    <CommanderFilters/>
    <div class="card-list-wrapper">
      <div class="card-list">
        <div class="card" v-for="card in cardsToDisplay" :key="card.name">
          <CommanderCard
            :cardId="card.uuid"
            :cardName="card.name"
            :status="card.status"
            :picurl="card.picurl"
          />
        </div>
      </div>
      <button @click="loadMore()">Load More</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommanderCard from '../Shared/CommanderCard.vue'
import CommanderFilters from '../Shared/CommanderFilters.vue'
import TitleSection from './TitleSection.vue'

export default {
  name: 'CommanderList',
  components: {
    CommanderCard,
    CommanderFilters,
    TitleSection,
  },
  data() {
    return {
      cardsInView: 5,
    };
  },
  computed: {
    ...mapGetters({
      filteredList: 'cards/GET_FILTERED_LIST',
    }),
    cardsToDisplay() {
      if (this.filteredList) {
        return this.filteredList.slice(0, this.cardsInView);
      }
      return [];
    },
  },
  methods: {
    cleanStatus(status) {
      return status ? status : "Playtesting";
    },
    loadMore() {
      this.cardsInView += 100;
    }
  },
}
</script>

<style lang='scss'>
.commander-list-wrapper {
  width: 100%;
  .card-list-wrapper {
    .card-list {
      display: flex;
      flex-wrap: wrap;
      .card {
        margin: 10px;
      }
    }
  }
}
</style>
