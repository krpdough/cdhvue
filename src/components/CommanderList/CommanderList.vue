<template>
  <div class="commander-list-wrapper">
    <TitleSection/>
    <CommanderFilters/>
    <div class="card-list-wrapper">
      <div v-if="isLoading"> 
        Loading...
      </div>
      <div v-else class="card-list">
        <div class="card" v-for="card in cardList" :key="card.set.a_muid">
          <CommanderCard
            :cardId="card.set.a_muid"
            :cardName="card.name"
            :status="cleanStatus(card.status)"
            :picurl="card.set.a_picurl"
          />
        </div>
      </div>
      <button @click="loadMore()">Load More</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import CommanderCard from '../Shared/CommanderCard.vue'
import CommanderFilters from './CommanderFilters.vue'
import TitleSection from './TitleSection.vue'

export default {
  name: 'TabsWrapper',
  components: {
    CommanderCard,
    CommanderFilters,
    TitleSection,
  },
  data() {
    return {
      isLoading: true,
      cards: [],
      cardsInView: 100,
    };
  },
  computed: {
    cardList() {
      const newList = this.cards.filter(card => {
        if (card.prop.side === 'front' && !card.token) {
             return card;
           }
      });
      console.log('After filtering ', newList);
      return newList.slice(0, this.cardsInView);
    },
  },
  methods: {
    cleanStatus(status) {
      return status ? status : "Playtesting";
    },
    async fetchCards() {
      await axios.get('https://com.cdhrec.s3.amazonaws.com/CDH.Upload.latest.xml')
        .then((response) => {
          const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: 'a_'});
          const output = parser.parse(response.data)
          // console.log('response is', response);
          console.log('response is', output);
          this.cards = output.cockatrice_carddatabase.cards.card;
          this.isLoading = false;
        })
        .catch(function (error) {
          console.log('error is', error);
        });
    },
    loadMore() {
      this.cardsInView += 100;
    }
  },
  created() {
    this.fetchCards();
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
