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
    <router-link 
      class="card-name"
      :to="cardUrl"
    >
      {{ cardName }} ({{ status }})
      <br/> muid #{{ cardId }}
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'CommanderCard',
  props: {
    cardId: {
      required: true,
      type: String,
    },
    cardName: {
      required: true,
      type: String,
    },
    status: {
      required: true,
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
}
</script>

<style lang='scss'>
  .commander-card-wrapper {
    display: flex;
    flex-direction: column;
    width: 400px;
    &:hover {
      text-decoration: underline;
    }
    .card-name {
      color: grey;
      text-decoration: none;
    }
  }
</style>
