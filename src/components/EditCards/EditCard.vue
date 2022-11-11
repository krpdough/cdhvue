<template>
  <div class='edit-page-wrapper'>
    <div data-app class='edit-form-wrapper'>
      <div v-if="!loading">
        <img
          class='card-image'
          alt="Commander Card Image"
          :src="card.picurl"
        />
      </div>
      <div class='form' v-if="!loading">
        <v-text-field
          class='form-input'
          v-model="card.picurl"
          label='Image URL'
          clearable
        />
        <v-text-field v-for="field in cardFields"
          :key="field.text"
          class='form-input'
          v-model="card[field.fieldKey]"
          :label='field.text'
          clearable
        />
        <v-select
          class='form-input'
          v-model="card.rarity"
          :items="rarityOptions"
          item-text="text"
          item-value="value"
          label="Rarity"
        />
        <v-select
          class='form-input'
          v-model="card.side"
          :items="sideOptions"
          item-text="text"
          item-value="value"
          label="Side"
        />
        <v-select
          class='form-input'
          v-model="card.status"
          :items="statusOptions"
          item-text="text"
          item-value="value"
          label="Status"
        />
        <v-textarea
          class='card-text'
          label='Text'
          auto-grow
          v-model="card.text"
        />
      </div>
      <div class='insert-buttons'>
        <v-btn class='action-button' @click="submitCard">{{ buttonText }}</v-btn>
        <v-btn class='action-button' @click="nextCard">Insert Another</v-btn>
        <span v-if="submitted">{{submittedName}} has been submitted!</span>
      </div>
    </div>
    <div class='xml-output'>
      <code class="block whitespace-pre overflow-x-scroll" v-text="xmlOutput"></code>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { uuid } from 'vue-uuid'

export default {
  name: 'EditCard',
  data() {
    return {
      buttonText: "Update",
      emptyCard: {
        name: '',
        status: 'Playtesting',
        side: 'front',
        coloridentity: '',
        type: 'Legendary Creature — ',
        text: '',
        pt: '',
        loyalty: '',
        picurl: 'https://cdn.discordapp.com/attachments/690041911620534298/859220708177739786/Salamander.png',
        related: '',
        reverserelated: '',
        rarity: 'Mythic',
        num: '',
        uuid: uuid.v4(),
        manacost: '',
        cmc: '',
        colors: '',
        maintype: 'Creature'
      },
      card: {},
      cardFields: [
        {
          text: 'Name*',
          fieldKey: 'name',
          required: true,
        }, {
          text: 'Uuid*',
          fieldKey: 'uuid',
          required: true,
        }, {
          text: 'Num*',
          fieldKey: 'num',
          required: true,
        }, {
          text: 'Main Type*',
          fieldKey: 'maintype',
          required: true,
        }, {
          text: 'Type*',
          fieldKey: 'type',
          required: true,
        }, {
          text: 'Mana Cost*',
          fieldKey: 'manacost',
          required: true,
        }, {
          text: 'CMC*',
          fieldKey: 'cmc',
          required: true,
        }, {
          text: 'Color Colors*',
          fieldKey: 'colors',
          required: true,
        }, {
          text: 'Color Identity*',
          fieldKey: 'coloridentity',
          required: true,
        }, {
          text: 'Power/Toughness',
          fieldKey: 'pt',
          required: false,
        }, {
          text: 'Loyalty',
          fieldKey: 'loyalty',
          required: false,
        }, {
          text: 'Related',
          fieldKey: 'related',
          required: false,
        }, {
          text: 'Reverse Related',
          fieldKey: 'reverserelated',
          required: false,
        },
      ],
      paramId: this.$route.params.id,
      loading: true,
      statusOptions: [
        {
          value: 'Playtesting',
          text: 'Playtesting',
        }, {
          value: 'Approved',
          text: 'Approved',
        },
      ],
      sideOptions: [
        {
          value: 'front',
          text: 'Front',
        }, {
          value: 'back',
          text: 'Back',
        },
      ],
      rarityOptions: [
        {
          value: 'Rare',
          text: 'Rare',
        }, {
          value: 'Mythic',
          text: 'Mythic',
        }, {
          value: 'Uncommon',
          text: 'Uncommon',
        }, {
          value: 'Common',
          text: 'Common',
        },
      ],
      submitted: false,
      submittedName: '',
    };
  },
  computed: {
    ...mapGetters({
      cardDict: 'cards/GET_CARD_DICT',
    }),
    xmlOutput() {
      return '';
    },
  },
  methods: {
    ...mapActions({
      sendUpdate: 'cards/SEND_UPDATE',
    }),

    nextCard() {
      const newNum = parseInt(this.card.num, 10);
      this.card = {
        ...this.emptyCard
      };
      this.card.num = newNum + 1;
      this.card.uuid = uuid.v4();
    },

    submitCard() {
      console.log('Submitting');
      const post_card = {
        method: 'update',
        card: this.card,
        id: this.card.uuid,
      }
      this.sendUpdate(post_card);
      this.submitted = true;
      this.submittedName = this.card.name;
    },

  },
  created() {
    this.card = this.cardDict[this.paramId];
    if (this.card == null) {
      this.card = {
        ...this.emptyCard
      };
    }
    this.loading = false; 
  }
}
</script>

<style lang="scss">
.edit-page-wrapper {
  .edit-form-wrapper {
    display: flex;
    .card-image {
      height: 410px;
      width: 320px;
    }
    .form {
      display: flex;
      width: 770px;
      flex-wrap: wrap;
      .form-input {
        margin: 10px;
      }
      .card-text {
        margin: 10px;
        height: 250px;
        width: 600px;
      }
    }
    .insert-buttons {
      display: flex;
      flex-direction: column;
      .action-button {
        margin: 10px;
      }
    }
  }
}

</style>