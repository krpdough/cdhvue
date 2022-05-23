<template>
  <div class="commander-list-wrapper">
    <TitleSection/>
    <CommanderFilters/>
    <div class="card-list-wrapper">
      <div class="card-list">
        <div class="card" v-for="card in cardList" :key="card.name">
          <CommanderCard
            :cardId="card.muid"
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
import { mapGetters, mapActions } from 'vuex';
import CommanderCard from '../Shared/CommanderCard.vue'
import CommanderFilters from './CommanderFilters.vue'
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
      cardsInView: 100,
      sort: 'muid',
      sortOrder: 'desc',
    };
  },
  computed: {
    ...mapGetters({
      cardList: 'cards/GET_CARD_LIST',
    }),
  },
  methods: {
    ...mapActions({
      fetchCards: 'cards/FETCH_CARDS',
    }),

    cleanStatus(status) {
      return status ? status : "Playtesting";
    },
    loadMore() {
      this.cardsInView += 100;
    }
  },
  created() {
    console.log('at created', this.$store, this.$store.state, this.$store.getters);
    if (!this.cardList.length) {
      this.fetchCards();
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
