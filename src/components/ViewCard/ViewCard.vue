<template>
  <div>
    <div class='card-info' v-if="Object.entries(this.cardDict).length > 0">
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
import { mapActions, mapGetters } from 'vuex';
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
  methods: {
    ...mapActions({
      getSingle: 'cards/FETCH_SINGLE',
    })
  },

  created() {
    // For users sharing a link or opening in a new tab, grab just the single commander
    if (Object.entries(this.cardDict).length === 0) {
      this.getSingle(this.paramId);
    }
  },

}
</script>

<style lang='scss'>
.card-info {
  display: flex;
  justify-content: center;
}

</style>
