<template>
  <div class="navbar" @click="$router.push('/')">
    <div class="logo">🎞️ The Movie Search App</div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.navbar {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #313030;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 90;
}

.logo {
  cursor: pointer;
  transition: transform 300ms ease;
}
.logo:hover {
  transform: scale(1.05);
}
.logo:active {
  transform: scale(0.95);
}
</style>
