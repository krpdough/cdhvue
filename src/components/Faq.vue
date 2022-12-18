<template>
  <div>
    <div class='about'>
      <span class='section-title'>About</span>
      <span>Custom Dragon Highlander is a community dedicated to designing to creating, playtesting and voting on custom commanders. Join our Discord to help vote for and playtest with your favorite designs. This site is currently a visual and easily searchable list of all the approved CDH commanders.</span>
    </div>
    <div class='faq-wrapper'>
      <div class='faq'>
        <span class='section-title'>FAQ</span>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="item in faqJson.faqItems"
            :key="item.title"
            class='faq-panel'
          >
            <v-expansion-panel-header>
              {{ item.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content v-html="item.text" class='faq-panel-text'/>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class='resources'>
        <span class='section-title'>Resources</span>
        <div
          v-for="item in faqJson.resources"
          :key="item.title"
          class='resource-card'
          @click="goToLink(item.link)"
        >
          <img class='icon' :src="item.icon"/>
          <div class='resource-text'>
            <span class='resource-title'>{{ item.title }}</span>
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import faqJson from '../static/faq.json';

export default {
  name: 'Faq',
  data() {
    return {
      faqJson,
    }
  },
  methods: {
    goToLink(url) {
      window.location.href = url;
    },
  },
}
</script>

<style lang="scss">
.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
}
.about {
    align-items: start;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 25px;
    width: 50%;
}
.faq-wrapper {
  display: flex;
  .faq {
    margin: 15px;
    width: 50%;
    .faq-panel {
      color: var(--text-primary-color);
      text-align: left;
      background-color: var(--background-color-secondary);
      .faq-panel-text {
        padding: 0px 24px 10px 24px;
      }
    }
  }
  .resources {
    margin: 15px;
    .resource-card {
      cursor: pointer;
      background-color: var(--background-color-secondary);
      border-radius: 5px;
      display: flex;
      margin-bottom: 15px;
      .icon {
        width: 65px;
        border-radius: 50%;
        height: 65px;
        margin: 10px;
      }
      .resource-text {
        display: flex;
        align-items: start;
        flex-direction: column;
        margin: auto 0;
        .resource-title {
          font-weight: bold;
      }
      }
    }
  }
}

</style>