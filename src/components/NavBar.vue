<template>
  <div class="navbar">
    <router-link to="/" class='icon-wrapper'>
      <img 
        class="icon"
        src="../assets/favicon.svg"
      />
    </router-link>
    <div class="nav-tabs">
      <router-link to="/reccomend" class='tab-title'><span>Recommend A Deck</span></router-link>
      <router-link to="/faq" class='tab-title'><span>Resources & FAQ</span></router-link>
      <router-link v-if="isVerified" to="/edit" class='tab-title'><span>Admin</span></router-link>
      <a href="https://discord.com/invite/T296j3Mw8K" class='tab-title'>Discord</a>
      <span class='tab-title' @click="toggleMode">{{ buttonText }}</span>
    </div>
    <v-app-bar-nav-icon class="moble-nav-menu" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-navigation-drawer
      v-model="drawer"
      class="mobile-items"
      absolute
      dark
      right
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item>
            <v-list-item-title><router-link to="/reccomend" class='tab-title'><span>Recommend A Deck</span></router-link></v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title><router-link to="/faq" class='tab-title'><span>Resources & FAQ</span></router-link></v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isVerified">
            <v-list-item-title><router-link v-if="isVerified" to="/edit" class='tab-title'><span>Admin</span></router-link></v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title><a href="https://discord.com/invite/T296j3Mw8K" class='tab-title'>Discord</a></v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title><span class='tab-title' @click="toggleMode">{{ buttonText }}</span></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      darkMode: true,
      drawer: false,
      isVerified: false,
      group: null,
    }
  },
  computed: {
    buttonText() {
      return this.darkMode ? 'Light Mode' : 'Dark Mode';
    }
  },
  methods: {
    isDarkMode() {
      return Boolean(Number(localStorage.getItem('dark-mode')));
    },
    toggleMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('dark-mode', this.darkMode ? 1 : 0);
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
      color: #ddd;
      margin: 8px;
      text-decoration: none;
    }
    .toggle-button {
      margin: 8px;
    }
  }
  .moble-nav-menu {
    display: none;
  }
}
@media only screen and (max-width: 720px) {
  .navbar{
    .nav-tabs {
      display: none;
    }
    .moble-nav-menu {
      display: block;
      margin: auto 0;
    }
    .tab-title {
      margin: 10 auto;
      color: #ddd;
      text-decoration: none;
    }
  }
}
</style>
