<template>
  <div class="navbar">
    <router-link to="/" class='icon-wrapper'>
      <img 
        class="icon"
        src="../../public/favicon.svg"
      />
    </router-link>
    <div class="nav-tabs">
      <router-link to="/reccomend" class='tab-title'><span>Recommend A Deck</span></router-link>
      <router-link to="/faq" class='tab-title'><span>Resrouces & FAQ</span></router-link>
      <router-link v-if="isVerified" to="/edit" class='tab-title'><span>Admin</span></router-link>
      <a href="https://discord.com/invite/T296j3Mw8K" class='tab-title'>Discord</a>
      <span class='tab-title' @click="toggleMode">{{ buttonText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      darkMode: true,
      isVerified: false,
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
    this.isVerified = Boolean(localStorage.getItem('verified'));
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
  margin-bottom: 25px;
  justify-content: space-between;
  .icon-wrapper {
    .icon {
      width: 3.125rem;
      height: 3.125rem;
      overflow: hidden;
      border-radius: 50%;
    }
  }
  .nav-tabs {
    margin: auto 0;
    .tab-title {
      color: var(--text-primary-color);
      margin: 8px;
      text-decoration: none;
    }
    .toggle-button {
      margin: 8px;
    }
  }
}
</style>
