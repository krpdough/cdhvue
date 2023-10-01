<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="850"
  >
    <div class='relation-dialog'>
      <div>
        Add or manage relations
      </div>
      <div 
        v-for="(relation, index) in localRelation" 
        :key="index"
        class='relation-line'
      >
        <img 
          class="trash-icon"
          src="../../assets/trash.svg"
          @click="deleteRow(index)"
        />
        <v-combobox
          class='relation-input'
          v-model="relation.relation"
          :items="relatedOptions"
          label="Relation"
          chips
          :dark="true"
        ></v-combobox>
        <v-combobox
          class='relation-input'
          v-model="relation.type"
          :items="typeOptions"
          label="Type"
          chips
          :dark="true"
        ></v-combobox>
        <v-combobox
          class='relation-input'
          v-model="relation.value"
          :items="tokens.concat(cardNames)"
          label="Value"
          chips
          :dark="true"
        ></v-combobox>
      </div>
      <v-btn class='dialog-button-add' @click="addRow">+ Add Row</v-btn>
      <div>
        <v-btn class='dialog-button-cancel' color="#F44336" @click="cancel">Cancel</v-btn>
        <v-btn class='dialog-button-submit' @click="submit">Submit</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'RelationDialog',

  props: {
    cardNames: {
      required: true,
      type: Array
    },
    show: {
      required: true,
      type: Boolean,
    },
    relationArray: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      localRelation: [],
      relatedOptions: ["related", "reverse-related"],
      typeOptions: ["token", "partner", "transform"],
      tokens: ['Treasure Token', 'Food Token', 'Clue Token', 'Copy Token', 'Wicked // Cursed', 'Monster // Sorcerer', 'Royal // Young Hero'],
    };
  },

  methods: {
    addRow(){
      this.localRelation.push({
        relation: 'related',
        type: 'token',
      });
    },

    deleteRow(index) {
      this.localRelation.splice(index, 1);
    },

    cancel(){
      this.localRelation = [...this.relationArray];
      this.$emit('close');
    },
    
    submit() {
      // Close the dialog and emit the new relations
      this.$emit('updateRelation', this.localRelation);
    },
  },

  created() {
    this.localRelation = [...this.relationArray];
  },
}
</script>

<style lang="scss">
.relation-dialog {
  background: #2b2d2e;
  color: #ddd;
  padding: 30px;
  .relation-line {
    display: flex;
    .relation-input {
      margin: 5px;
    }
    .trash-icon {
      width: 18px;
      height: 25px;
      margin-top: 30px;
    }
  }
  .dialog-button-cancel {
    margin: 5px;
    background: red;
  }
  .dialog-button-submit {
    margin: 5px;
  }
}

</style>
