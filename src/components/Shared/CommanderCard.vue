<template>
  <div class="commander-card-wrapper">
    <router-link :to="cardUrl">
      <img
        alt="Commander Card Image"
        :src=picurl
        height="410"
        width="320"
      />
    </router-link>
    <router-link :to="cardUrl">
      {{ cardName }} - {{ status }}
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'CommanderCard',
  props: {
    cardId: {
      required: true,
      type: Number,
    },
    cardName: {
      required: true,
      type: String,
    },
    status: {
      default: "Playtest",
      type: String,
    },
    picurl: {
      required: true,
      type: String,
    },
  },
  computed: {
    cardUrl() {
      return `/card/${this.cardId}`;
    }
  },
  created() {
    console.log("Loaded Commander Card", this.cardName);
  },

}
</script>

<style lang='scss'>
  .commander-card-wrapper {
    display: flex;
    width: 400px;
  }
</style>
