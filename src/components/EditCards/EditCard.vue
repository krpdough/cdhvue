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
        />
        <v-text-field v-for="field in cardFields"
          :key="field.text"
          class='form-input'
          v-model="card[field.fieldKey]"
          :label='field.text'
        />
        <div class='form-colors'>
          <div class='form-color-title'>
            <div class='form-color-title-span'>Card Colors</div>
            <v-checkbox
              v-model="showColorIdentity"
              color="primary"
              value="primary"
              label="Different Color Identity?"
            />
          </div>
          <div class='form-colors-icons'>
            <ManaSelection
              :selectedColors="cardColors"
              @clickColor="selectCardColor"
            />
            <ManaSelection
              v-if="showColorIdentity"
              :selectedColors="coloridentity"
              @clickColor="selectColorIdentity"
            />
          </div>
        </div>
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
import ManaSelection from '../Shared/ManaSelection.vue';
import colorOrder from '../../static/colorOrder.json';

export default {
  name: 'EditCard',

  components: {
    ManaSelection,
  },

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
      cardColors: {
        'W': false,
        'U': false,
        'B': false,
        'R': false,
        'G': false,
        'C': false,
      },
      coloridentity: {
        'W': false,
        'U': false,
        'B': false,
        'R': false,
        'G': false,
        'C': false,
      },
      colorOrder,
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
      showColorIdentity: false,
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

    getColorOrder(color) {
      const wubrg = 'WUBRG';
      const unordered = [];
      // Turn the colors into an array
      for (const [k, v] of Object.entries(color)) {
        if(v) {
          unordered.push(k);
        }
      }
      const numberOfColors = unordered.length;
      const unorderedString = unordered.join('');

      // For easy ones, just use the wubrg order
      if (numberOfColors == 1) {
        return unordered[0];
      } else if (numberOfColors == 5) {
        return wubrg;
      } else if (wubrg.includes(unorderedString)) {
        return unorderedString;
      }
      // For everything else, reference the sheet and compare
      let orderedColors = '';
      colorOrder[String(numberOfColors)].forEach(c => {
        if (unordered.sort().join('') === c.split('').sort().join('')) {
          orderedColors = c;
        }
      })
      return orderedColors;
    },

    nextCard() {
      const newNum = parseInt(this.card.num, 10);
      this.card = {
        ...this.emptyCard
      };
      this.card.num = newNum + 1;
      this.card.uuid = uuid.v4();
      Object.keys(this.cardColors).forEach((c) => {
        this.cardColors[c] = false;
        this.coloridentity[c] = false;
      })
    },

    submitCard() {
      // Prepare the color stuff
      this.card.colors = this.getColorOrder(this.cardColors)
      this.card.coloridentity = this.showColorIdentity ? this.getColorOrder(this.coloridentity) : this.card.colors

      const post_card = {
        method: 'update',
        card: this.card,
        id: this.card.uuid,
      }
      this.sendUpdate(post_card);
      this.submitted = true;
      this.submittedName = this.card.name;
    },

    selectCardColor(color) {
      this.cardColors[color] = !this.cardColors[color];
      this.coloridentity[color] = !this.coloridentity[color];
    },

    selectColorIdentity(color) {
      this.coloridentity[color] = !this.coloridentity[color];
    },

  },
  created() {
    this.card = this.cardDict[this.paramId];
    if (this.card == null) {
      this.card = {
        ...this.emptyCard
      };
    } else {
      // Extract the Colors objects from the strings
      [...this.card.coloridentity].forEach(c => this.coloridentity[c] = true);
      [...this.card.colors].forEach(c => this.cardColors[c] = true);
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
      .form-colors {
        width: 100%;
        margin-top: -25px;
        .form-color-title {
          display: flex;
          flex-direction: row;
          place-content: space-around;
          .form-color-title-span {
            margin-top: 19px;
            padding-top: 4px;
          }
        }
        .form-colors-icons {
          display: flex;
          flex-direction: row;
          place-content: space-around;
          .mana-filters {
            margin-top: -25px;
            .mana-button {
              background-color: var(--background-color-primary);
              height: 50px;
              width: 50px;
            }
            .icon-height {
              line-height: unset;
            }
            .selected {
              background: #F6D262;
            }
          }
        }
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