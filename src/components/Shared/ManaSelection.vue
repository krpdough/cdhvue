<template>
  <div class='mana-filters'>
    <v-btn
      v-for="mana in manaList"
      :key="mana"
      :class="{'mx-2 mana-button': true, 'selected': selectedColors[mana]}" 
      fab
      small
      color='primary'
      @click="$emit('clickColor', mana)"
    >
      <i :class="['ms ms-cost ms-3x icon-height', `ms-${mana.toLowerCase()}`]"></i>
    </v-btn>
</div>
  
</template>

<script>
import 'mana-font';

export default {
  name: 'ManaSelection',

  props: {
    selectedColors: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      manaList: ['W', 'U', 'B', 'R', 'G', 'C'],
    };
  },

  computed: {
  },

  methods: {
    hasColor(color) {
      return this.colorFilter.find((c) => c===color);
    },
  },
}
</script>

<style lang="scss">
.mana-filters {
  margin: 10px;
  padding-top: 10px;
  .mana-button {
    margin: 5px;
  }
  .icon-height {
    line-height: unset;
  }
  .selected {
    background: #8686e7;
  }
}
</style>