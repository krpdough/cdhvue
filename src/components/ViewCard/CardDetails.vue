<template>
  <div class='card-info-panel'>
    <span class='card-name'>{{ card.name }}</span>
    <span class='card-type'>{{ card.type }}</span>
    <v-divider></v-divider>
    <div class='card-text' v-html="markedCardText"></div>
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
    markedCardText() {
      if(!this.card.text) {
        return '';
      }
      const splitText = this.card.text.split(/[{}]/);
      let returnText = '';
      for(let i=0; i <= splitText.length-1; i++) {
        if(splitText[i].length > 3) {
          returnText = returnText.concat(splitText[i]);
        } else if (splitText[i].length > 0) {
          returnText = returnText.concat(`<i class='ms ms-cost icon-height ms-${splitText[i].toLowerCase()}'></i>`);
        }
      }
      return returnText;
    },
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
  padding: 25px;
  text-align: left;
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
    line-height: 2;
    margin-top: 15px;
    text-align: left;
    overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    .icon-height {
      line-height: 13px;
    }
  }
  .card-base {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 5px;
    text-align: right;
  }
}
@media only screen and (max-width: 720px) {
  .card-info-panel {
    width: auto;
  }
}
</style>
