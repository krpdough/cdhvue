<template>
  <div class="title-box">
    <img class="icon" :src="imageSrc" />
    <span class="title-box__text">
      {{ text }}
    </span>
    <v-btn class="button" :href="link">{{ button }}</v-btn>
  </div>
</template>

<script>
export default {
  name: "TitleBox",

  props: {
    icon: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    button: {
      required: true,
      type: String,
    },
    link: {
      required: true,
      type: String,
    },
  },

  computed: {
    imageSrc() {
      return new URL(`../../assets/${this.icon}.svg`, import.meta.url).href;
    },
  },
};
</script>

<style lang="scss">
.title-box {
  align-items: center;
  background-color: var(--background-color-secondary);
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-left: 20px;
  width: 290px;
  .icon {
    margin-bottom: 5px;
    width: 90px;
  }
  .title-box__text {
    margin: 10px;
  }
}
@media only screen and (max-width: 720px) {
  .title-box {
    margin-left: unset;
    margin: 5px;
  }
}
</style>
