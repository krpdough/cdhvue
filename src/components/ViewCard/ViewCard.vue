<template>
  <div>
    <CommanderCard
      :cardId="cardInfo.cardId"
      :cardName="cardInfo.cardName"
      :status="cardInfo.status"
      :picurl="cardInfo.picurl"
    />
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
      return {
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
