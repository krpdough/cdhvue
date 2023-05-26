<template>
  <v-app>
    <div class="deck-rec">
      <div class="deck-rec__commander-panel">
        <div v-if="selectedCommander.picurl">
          <img
            class='card-image'
            alt="Commander Card Image"
            :src="selectedCommander.picurl"
          />
        </div>
        <v-autocomplete
          v-model="selectedCommander"
          label="Select Commander"
          :items="filteredList"
          item-title="name"
          item-value="name"
          item-text="name"
          return-object
        ></v-autocomplete>
        <p class="deck-rec__info">
          Deck List must contain 99 cards (Partners should be put in the 99)<br><br>
          Accceptable formats:<br>
          1x Counterspell<br>
          1 Counterspell<br>
          Counterspell<br><br>
          Don't forget your lands!
        </p>
      </div>
      <div class="deck-rec__deck-input">
        <v-text-field v-model="title" label="Title"></v-text-field>
        <v-textarea v-model="deckList" label="Deck List"></v-textarea>
        <v-text-field v-model="author" label="Author"></v-text-field>
        <v-btn class='submit-button' @click="validateSubmission" :disabled="isSending"> {{ isSending ? "Sending..." : "Submit" }} </v-btn>
      </div>
    </div>
    <v-dialog
      v-model="showErrors"
      persistent
      max-width="450"
    >
    <div class='error-dialog'>
      The following errors must be fixed to submit:
      <span v-for="error in errors" :key="error" class="error-messsage"> {{ error }} </span>
      <div>
        <v-btn class='dialog-button' @click="showErrors = false">Confirm</v-btn>
      </div>
    </div>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex';

export default {
  name: 'DeckRec',

  data() {
    return {
      deckList: '',
      isSending: false,
      title: '',
      selectedCommander: {},
      showErrors: false,
      author: '',
      errors: [],
    };
  },

  computed: {
    ...mapGetters({
      filteredList: 'cards/GET_FILTERED_LIST',
    }),
  },

  methods: {
    validateSubmission() {
      // Update the button to loading
      this.isSending = true;
      
      // Clear out the current errors
      this.errors = [];

      // Add an error for each problem
      if (!this.selectedCommander.name) {
        this.errors.push('No Commander selected');
      }
      if (!this.title) {
        this.errors.push('Missing Title');
      }
      if (!this.author) {
        this.errors.push('Missing Author');
      }
      // Convert the decklist to a json
      const [jsonList, cardCount] = this.formatDeckList();

      if (cardCount != 100) {
        this.errors.push(`Current card count: ${cardCount}. Please include partners in the 99 for now`);
      }

      if (this.errors.length === 0) {
        this.sendUpdate(jsonList);
      } else {
        this.showErrors = true;
        this.isSending = false;
      }
    },

    formatDeckList() {
      const formatted = {};
      const deckItems = this.deckList.split('\n');
      // Start at 1 to include cmdr
      let count = 1;
      deckItems.forEach((lineItem) => {
        // Only proceed if there is data in the line. Shortest legal card is 3 letters
        if (lineItem.length > 2) {
          // Validate the line item. Do we want a regex thing or do we want to assign it a thing?
          let splitItem = lineItem.split(' ');
          let cleanedFirst = parseInt(splitItem[0], 10);

          formatted[lineItem.replace(`${splitItem[0]} `, '')] = cleanedFirst ? cleanedFirst : 1;
          count += cleanedFirst ? cleanedFirst : 1;
        }
      });

      return [formatted, count];
    },
    
    async sendUpdate(jsonList) {
      let submission = {
        commander: this.selectedCommander.name,
        uuid: this.selectedCommander.uuid,
        title: this.title,
        author: this.author,
        list: jsonList,
      }
      await axios.post(`https://d2vweo4e5mlujti3duw6txebyy0rrviy.lambda-url.us-east-1.on.aws/`, submission, {
        headers: {
          'content-type': 'text/json',
        }
      }).then((response) => {
        console.log(response);
        this.isSending = false;
        alert("Deck Submitted");
      }).catch((err) => {
        console.log(err);
        this.isSending = false;
        alert("Submission Error");
      })
    },
  },
}
</script>

<style lang="scss">
.deck-rec {
  margin: 0 auto;
  display: flex;
  .deck-rec__commander-panel {
    padding-right: 100px;
    width: 50%;
    .card-image {
      height: 410px;
      width: 320px;
    }
    .deck-rec__info {
      text-align: left;
    }
  }
  .deck-rec__deck-input {
    width: 50%;
  }
}
.error-dialog {
  background-color: var(--background-color-primary);
  display: flex;
  flex-direction: column;
  padding: 20px;
  .error-messsage {
    margin: 8px;
  }
}
</style>