<template>
      <nuxt-loading-bar  :duration="2000" />

</template>

<script>
// useHead({
//   titleTemplate: (titleChunk) => {
//     return titleChunk ? `${titleChunk} - Site Title` : "Site Title";
//   },
// });

export default {
  created() {
    this.$router.push("/login");
  },
};
</script>
