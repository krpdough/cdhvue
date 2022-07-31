<template>
  <div class="navbar">
    <router-link to="/">
      <img 
        class="icon"
        src="../../public/favicon.svg"
      />
    </router-link>
    <div class="tabs">
      <router-link to="/reccomend"><span>Recommend A Deck</span></router-link>
      <router-link to="/faq"><span>Resrouces & FAQ</span></router-link>
      <span>Discord</span>
      <v-btn @click="toggleMode">{{ buttonText }}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      darkMode: true,
    }
  },
  computed: {
    buttonText() {
      return this.darkMode ? 'Light Mode' : 'Dark Mode';
    }
  },
  methods: {
    isDarkMode() {
      return Boolean(localStorage.getItem('dark-mode'));
    },
    toggleMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('dark-mode', this.darkMode);
      document.documentElement.className = this.darkMode ? 'dark-theme' : 'light-theme';
    },
  },
  created() {
    this.darkMode = this.isDarkMode();
    document.documentElement.className = this.darkMode ? 'dark-theme' : 'light-theme';
  }
}
</script>

<style lang="scss">
.navbar {
  top: 0;
  width: 100%;
  display: flex;
  padding: 0.5rem;
  z-index: 10;
  background: #2b2d2e;
  justify-content: center;
  margin-bottom: 25px;
  .icon {
    width: 3.125rem;
    height: 3.125rem;
    overflow: hidden;
    border-radius: 50%;
  }
}
</style>
