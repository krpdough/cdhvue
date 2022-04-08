<template>
  <div>
    <div v-if="$apollo.loading"> 
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
import gql from 'graphql-tag'
import CommanderCard from '../Shared/CommanderCard.vue'
import DeckDisplay from './DeckDisplay.vue'

export default {
  name: 'ViewCard',
  apollo: {
    cards: {
      query: gql`query singleton($paramId: Int!) {
        cards(where: {id: $paramId}) {
          edges {
            node {
              cardId
              cdhCards {
                name
                status
                text
                token
                reverseRelated
                related
                prop {
                  cmc
                  coloridentity
                  colors
                  maintype
                  manacost
                  pt
                  side
                  type
                }
                set {
                  muid
                  num 
                  picurl
                  rarity
                  uuid
                }
              }
            }
          }
        }
      }`,
      variables () { 
        return {
          paramId: this.paramId
        } 
      },
    },
  },
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
      if (this.$apollo.loading) {
        return {}
      }
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
