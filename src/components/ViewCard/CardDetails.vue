<template>
  <div class='card-info-panel'>
    <span class='card-name'>{{ card.name }}</span>
    <span class='card-type'>{{ card.type }}</span>
    <v-divider></v-divider>
    <div class='card-text'>{{ card.text }}</div>
    <span class='card-base'>{{ card.pt ? card.pt : card.loyalty }}</span>
  </div>
</template>

<script>
export default {
  name: 'CardDetails',
  props: {
    card: {
      required: true,
      type: Object,
    },
  },
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
    
  },

}
</script>

<style lang='scss'>
.card-info-panel {
  width: 700px;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color-secondary);
  .card-name {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .card-type {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 5px;
  }
  .card-text {
    margin: 5px;
    text-align: left;
    overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
  .card-base {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 5px;
    text-align: right;
  }
}

</style>
