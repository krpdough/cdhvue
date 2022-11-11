<template>
  <div class='edit-wrapper'>
    <CommanderFilters/>
    <div class='card-list'>
      <router-link 
        v-for="card in cardsToDisplay" 
        :key="card.uuid"
        class='list-item'
        :to="`edit/${card.uuid}`" 
      >
        {{ card.num}} - {{ card.name }}
      </router-link>
    </div>
    <div class='actions-wrapper'>
      <v-btn><router-link to="edit/new" class='add-new'>+ Add New Card</router-link></v-btn>
      <v-btn class='generate-button' @click="clickGenerate">Generate Latest XML</v-btn>
      <v-btn class='download-button' ><a href='https://s3.us-east-2.amazonaws.com/com.cdhrec/xml/current.xml'>Download XML</a></v-btn>
    </div>
    <v-dialog
      v-model="showWarning"
      persistent
      max-width="450"
    >
      <div class='warning-dialog'>
        <div>
          WARNING! This page is for CDH STAFF only!<br><br>
          Enter Passphrase or return to the homepage:
        </div>
        <v-text-field
          v-model="pass"
        />
        <div>
          <router-link to="/">
            <v-btn class='leave-button'>Back to Homepage</v-btn>
          </router-link>
          <v-btn class='continue-button' @click="checkPass">Continue</v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CommanderFilters from '../Shared/CommanderFilters.vue'

export default {
  name: 'EditCardList',
  components: {
    CommanderFilters,
  },
  data() {
    return {
      pass: '',
      showWarning: true,
    };
  },
  computed: {
    ...mapGetters({
      filteredList: 'cards/GET_FILTERED_LIST',
    }),
    cardsToDisplay() {
      if (this.filteredList) {
        return this.filteredList.slice(0, 10);
      }
      return [];
    },
  },
  methods: {
    ...mapActions({
      generateXML: 'cards/GENERATE_XML',
    }),
    checkPass() {
      console.log(this.pass);
      // TODO - this is temporary. When we go live, this must move to either a lambda or config file hidden from git
      if (this.pass === 'Acorn123') {
        this.showWarning = false;
        localStorage.setItem('verified', true);
      } else {
        this.$router.push({ path: '/' });
      }
    },
    clickGenerate() {
      this.generateXML();
    }
  },
  created() {
    this.showWarning = !localStorage.getItem('verified');
  }
}
</script>

<style lang="scss">
.edit-wrapper {
  margin-top: 15px;
  .card-list {
    background-color: var(--background-color-secondary);
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
    .list-item {
      margin: 5px;
      color: var(--text-primary-color);
      font-weight: bold;
      text-decoration: none;
    }
  }
  .actions-wrapper {
    display:flex;
    flex-direction: row;
    justify-content: space-evenly;
    .add-new {
      padding: 5px;
      border-radius: 5px;
      color: black;
      text-decoration: none;
      margin: 10px;
    }
  }
}
.warning-dialog {
  background: red;
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: 40px;
}

</style>