<template>
  <div>
    <div v-if="isLoading"> 
      Loading...
    </div>
    <div v-else>
      <CommanderCard
        :cardId="cardInfo.cardId"
        :cardName="cardInfo.cardName"
        :status="cardInfo.status"
        :picurl="cardInfo.picurl"
      />
    </div>
    <DeckDisplay
      :cardId="cardInfo.cardId"
    />
  </div>
</template>

<script>
import CommanderCard from '../Shared/CommanderCard.vue'
import DeckDisplay from './DeckDisplay.vue'

export default {
  name: 'ViewCard',
  components: {
    CommanderCard,
    DeckDisplay,
  },
  data() {
    return {
      // paramId: this.$route.paramId,
      paramId: parseInt(this.$route.params.id, 10),
    }
  },
  computed: {
    cardInfo() {
      const card = this.cards.edges[0];
      return {
        cardId: card.node.cardId,
        cardName: card.node.cdhCards.name,
        status: card.node.cdhCards.status,
        picurl: card.node.cdhCards.set.picurl,
      };
    }
  },
  created() {
    console.log("View card will be used when someone clicks on a commander");
  },

}
</script>

<style lang='scss'>

</style>
