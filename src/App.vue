<template>
  <div id="app">
    <NavBar/>
    <router-view></router-view>
    <div class='footer'>
      CDHrec is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC.
      <br>CDHrec may use the trademarks and other intellectual property of Wizards of the Coast LLC, which is permitted under Wizards' Fan Site Policy. For example, Magic: The Gathering® is a trademark of Wizards of the Coast. For more information about Wizards of the Coast or any of Wizards' trademarks or other intellectual property, please visit their website at magic.wizards.com.
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters({
      filteredList: 'cards/GET_FILTERED_LIST',
    }),
  },
  methods: {
    ...mapActions({
      fetchCards: 'cards/FETCH_CARDS',
      buildIndex: 'cards/BUILD_INDEX',
    }),
  },
  created() {
    if (!this.filteredList.length) {
      this.fetchCards();
      this.buildIndex();
    }
  },
}
</script>

<style>
/* Define styles for the default root window element */
:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --element-size: 4rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
}

p {
  color: var(--text-primary-color);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary-color);
  background-color: var(--background-color-primary);
}
body {
  margin: 0px;
  padding: 0px;
  height: 100vh;
  background-color: var(--background-color-primary);
}
.footer {
  margin: 15px auto;
  padding: 20px;
  font-size: .8rem;
}
</style>
