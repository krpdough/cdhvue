<template>
  <div class="decks-wrapper">
    <div v-if="deckCount">
      Submitted Decks:
      <v-expansion-panels>
        <v-expansion-panel v-for="name in deckNames" :key="name">
          <v-expansion-panel-header>
            {{ name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="decks__cards-list">
            {{ formatList(name) }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else>
      No decks submitted
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DeckDisplay',

  props: {
    cardId: {
      required: true,
      type: String,
    },
    deckCount: {
      default: 0,
      type: Number,
    },
  },

  data() {
    return {
      decks: {},
    }
  },

  computed: {
    deckNames() {
      return Object.keys(this.decks);
    }
  },

  methods: {
    async fetchDeckJson() {
      this.decks = await axios.get(`https://s3.us-east-2.amazonaws.com/com.cdhrec/decks/${this.cardId}.json`).then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log('error is', error);
      });;
    },

    formatList(name) {
      return Object.keys(this.decks[name].list).map(card => `${this.decks[name].list[card]} ${card}`).join('\r\n');
    }
  },
  
  created() {
    if (this.deckCount) {
      this.fetchDeckJson();
    }
  },
}
</script>

<style lang="scss">
.decks-wrapper {
  width: 40%;
  margin: 20px auto;
  .decks__cards-list {
    text-align: justify;
    white-space: break-spaces;
  }
}
</style>