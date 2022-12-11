<template>
  <div class='title-section'>
    <div class='info-banner'>
      <div class='info-title'>
        CUSTOM DRAGON HIGHLANDER
      </div>
      <div class='info-blurb'>
        Welcome to Custom Dragon Highlander, a community dedicated to designing only the finest custom commanders!
      </div>
    </div>
    <div class='title-boxes'>
      <TitleBox 
        icon="download"
        text="Here's the latest XML file with all commanders and tokens!"
        button="DOWNLOAD"
        link="https://s3.us-east-2.amazonaws.com/com.cdhrec/xml/current.xml"
      />
      <TitleBox 
        icon="discord"
        text="Got an idea? Come share it on our Discord server!"
        button="Join"
        link="https://discord.com/invite/T296j3Mw8K"
      />
    </div>
  </div>
</template>

<script>
import TitleBox from './TitleBox.vue'

export default {
  name: 'TitleSection',
  components: {
    TitleBox,
  },
}
</script>

<style lang="scss">
.title-section {
  display: flex;
  width: 80%;
  margin: auto;
  margin-bottom: 25px;
  .info-banner {
    display: flex;
    flex-direction: column;
    margin-right: 133px;
    text-align: left;
    width: 50%;
    .info-title {
      font-family: "Playfair Display SC";
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .info-blurb {
      font-size: 1.6rem;
    }
  }
  .title-boxes {
    width: 50%;
    display: flex;
  }
}
</style>