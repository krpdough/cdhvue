<template>
  <div>
    <div class='card-info'>
      <CommanderCard
        :cardId="cardInfo.muid"
        :cardName="cardInfo.name"
        :status="cardInfo.status"
        :picurl="cardInfo.picurl"
      />
      <CardDetails
        :card="cardInfo"
      />
    </div>
    <DeckDisplay
      :cardId="cardInfo.cardId"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommanderCard from '../Shared/CommanderCard.vue'
import CardDetails from './CardDetails.vue'
import DeckDisplay from './DeckDisplay.vue'

export default {
  name: 'ViewCard',
  components: {
    CommanderCard,
    CardDetails,
    DeckDisplay,
  },
  data() {
    return {
      // paramId: this.$route.paramId,
      paramId: parseInt(this.$route.params.id, 10),
    }
  },
  computed: {
    ...mapGetters({
      cardDict: 'cards/GET_CARD_DICT',
    }),
    cardInfo() {
      return this.cardDict[this.paramId];
    }
  },
  created() {
    
    console.log("View card will be used when someone clicks on a commander");
  },

}
</script>

<style lang='scss'>
.card-info {
  display: flex;
}

</style>
