<template>
  <div class="hello">
    <TitleSection/>
    <CommanderFilters/>
    <div v-if="$apollo.loading"> 
      Loading...
    </div>
    <div v-else>
      <div class="card" v-for="card in cardList" :key="card.node.cardId">
        <CommanderCard
          :cardId="card.node.cardId"
          :cardName="card.node.cdhCards.name"
          :status="card.node.cdhCards.status"
          :picurl="card.node.cdhCards.set.picurl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import CommanderCard from '../Shared/CommanderCard.vue'
import CommanderFilters from './CommanderFilters.vue'
import TitleSection from './TitleSection.vue'

export default {
  name: 'TabsWrapper',
  apollo: {
    cards: gql`query {
      cards {
        edges {
          node {
            cardId
            cdhCards {
              name
              status
              set {
                picurl
              }
            }
          }
        }
      }
    }`,
  },
  components: {
    CommanderCard,
    CommanderFilters,
    TitleSection,
  },
  computed: {
    cardList() {
      return this.cards.edges;
    },
  },
  methods: {
  },
  created() {
    console.log("Here are the cards on the commander list", this.cards);
  },

}
</script>

<style lang='scss'>

</style>
