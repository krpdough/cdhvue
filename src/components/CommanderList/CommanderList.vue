<template>
  <div class="commander-list-wrapper">
    <TitleSection/>
    <CommanderFilters/>
    <div class="card-list-wrapper">
      <div class="card-list">
        <div class="card" v-for="(card, x, i) in cardsToDisplay" :key="i">
          <CommanderCard
            v-if="!card.hidden"
            :cardId="card.uuid"
            :cardName="card.name"
            :deckCount="card.deckCount"
            :status="card.status"
            :picurl="card.picurl"
            :related="card.relatedPicUrl"
          />
        </div>
      </div>
      <v-btn size="large" @click="loadMore()">Load More</v-btn>
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
      cardsInView: 24,
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
    ...mapGetters({
      getCard: 'cards/GET_CARD',
    }),
    cleanStatus(status) {
      return status ? status : "Playtesting";
    },
    loadMore() {
      this.cardsInView += 60;
    },
    getRelated(card) {
      if (card.relatedUuid) {
        return this.getCard(card.relatedUuid).picurl;
      }
      return '';
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
      justify-content: space-between;
      margin: 15px auto;
      width: 80%;
      .card {
        display: contents;
        margin: 10px;
      }
    }
  }
}
</style>
