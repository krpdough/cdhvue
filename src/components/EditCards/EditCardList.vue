<template>
  <div class='edit-wrapper'>
    <CommanderFilters/>
    <div class='card-list'>
      <div
        v-for="card in cardsToDisplay" 
        :key="card.uuid"
        class='card-list-item'
      >
        <router-link 
          class='item-link'
          :to="`edit/${card.uuid}`" 
        >
          {{ card.num}} - {{ card.name }}
        </router-link>
        <img 
          class="icon"
          src="../../assets/trash.svg"
          @click="clickDelete(card.uuid)"
        />
      </div>
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
            <v-btn class='dialog-button'>Back to Homepage</v-btn>
          </router-link>
          <v-btn class='dialog-button' @click="checkPass">Continue</v-btn>
        </div>
      </div>
    </v-dialog>
    <v-dialog
      v-model="deleteWarning"
      persistent
      max-width="450"
    >
    <div class='warning-dialog'>
      Are you sure you want to delete {{ deleteName }}?
      <div class=''>
      <v-btn class='dialog-button' @click="sendDelete">Delete</v-btn>
      <v-btn class='dialog-button' @click="clearDelete">Cancel</v-btn>
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
      cardToDelete: null,
      deleteWarning: false,
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
    deleteName() {
      if (this.cardToDelete) {
        return this.cardToDelete.name;
      }
      return '';
    }
  },
  methods: {
    ...mapActions({
      generateXML: 'cards/GENERATE_XML',
      sendUpdate: 'cards/SEND_UPDATE',
    }),
    clearDelete() {
      this.cardToDelete = null;
      this.deleteWarning = false;
    },
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
    clickDelete(uuid) {
      // Warning message only
      this.cardToDelete = this.cardsToDisplay.find(card => card.uuid === uuid);
      this.deleteWarning = true;
    },
    clickGenerate() {
      this.generateXML();
    },
    sendDelete() {
      const post_card = {
        method: 'delete',
        card: this.cardToDelete,
        id: this.cardToDelete.uuid,
      }
      this.sendUpdate(post_card);
      this.clearDelete();
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
    margin: auto;
    width: 80%;
    .card-list-item {
      display: flex;
      margin: auto;
    }
    .item-link {
      margin: 5px;
      color: var(--text-primary-color);
      font-weight: bold;
      text-decoration: none;
    }
    .icon {
      width: 18px;
      height: 25px;
      margin-left: 15px;
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
  gap: 30px;
  .dialog-button {
    margin: 10px;
  }
}

</style>