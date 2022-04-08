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
      <span>Dark Mode</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',

}
</script>

<style lang="scss">
.navbar {
  top: 0;
  width: 100%;
  display: flex;
  padding: 0.5rem;
  z-index: 10;
  position: fixed;
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
