<template>
  <div class="commander-list-wrapper">
    <TitleSection/>
    <CommanderFilters/>
    <div class="card-list-wrapper">
      <div v-if="$apollo.loading"> 
        Loading...
      </div>
      <div v-else class="card-list">
        <div class="card" v-for="card in cardList" :key="card.node.cardId">
          <CommanderCard
            :cardId="card.node.cardId"
            :cardName="card.node.cdhCards.name"
            :status="cleanStatus(card.node.cdhCards.status)"
            :picurl="card.node.cdhCards.set.picurl"
          />
        </div>
      </div>
      <button @click="loadMore()">CLICK MEEEE</button>
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
    cards: { 
      query: gql`query cards($first: Int!, $cursor: String!) {
        cards(first: $first, after: $cursor) {
          edges {
            cursor
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
      variables () { 
        return {
          first: 25,
          cursor: "",
        } 
      },
    }
  },
  components: {
    CommanderCard,
    CommanderFilters,
    TitleSection,
  },
  data() {
    return {
    };
  },
  computed: {
    cardList() {
      return this.cards.edges;
    },
    lastCursor() {
      return this.cards.edges[this.cards.edges.length - 1].cursor;
    },
  },
  methods: {
    cleanStatus(status) {
      return status ? status : "Playtesting";
    },
    loadMore() {
      console.log(this.lastCursor);
      this.$apollo.queries.cards.fetchMore({
        variables: {
          first: 25,
          cursor: "YXJyYXljb25uZWN0aW9uOjM5OTAw",
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          console.log('previous', previousResult);
          console.log('more', fetchMoreResult);
          if (!fetchMoreResult) {
            return previousResult;
          }
          return {
            cards: {
              __typename: previousResult.cards.__typename,
              edges: [...previousResult.cards.edges, ...fetchMoreResult.cards.edges]
            }
          }
        }
      })
    }
  },
  created() {
    console.log("Here are the cards on the commander list", this.cards);
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
