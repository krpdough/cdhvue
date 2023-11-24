<template>
  <div class="commander-card-wrapper">
    <router-link class='card-image-wrapper' :to="cardUrl">
      <img
        v-if="related"
        class="partner-image"
        alt="Secondary Card Image"
        :src=related
        width="320"
      />
      <img
        :class="{'card-image-main': Boolean(related), 'card-image-defaults': true}"
        alt="Commander Card Image"
        :src=picurl
        width="320"
      />
    </router-link>
    <router-link 
      class="card-name"
      :to="cardUrl"
    >
      {{ cardName }} ({{ status }})<br>
      {{ deckCount }} Decks
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
    deckCount: {
      default: 0,
      type: Number,
    },
    status: {
      required: true,
      type: String,
    },
    picurl: {
      required: true,
      type: String,
    },
    related: {
      default: '',
      type: String,
    }
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
    width: 330px;
    margin-bottom: 15px;
    &:hover {
      text-decoration: underline;
    }
    .card-name {
      color: grey;
      text-decoration: none;
    }
    .card-image-wrapper {
      margin-bottom: 12px;
      .card-image-defaults {
        border-radius: 4.85%/3.58%;
        height: unset;
      }
      .card-image-main {
        position: relative;
        z-index: 6;
      }
      .partner-image {
        border-radius: 4.85%/3.58%;
        position: relative;
        top: 0px;
        left: 10x;
        z-index: 4;
        margin-bottom: -370px;
        margin-left: 40px;
        &:hover {
          z-index: 10;
        }
      }
    }
  }
</style>
