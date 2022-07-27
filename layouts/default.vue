<script>
</script>

<template>
  <v-layout>
    <nuxt-loading-bar :duration="2000" />
    <Nav />
    <slot />
    <v-footer app>
      <LazyFooter />
    </v-footer>
  </v-layout>
</template>

<style>
table thead tr th {
  background-color: #25b7c4 !important;
}

table tbody {
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
}

table tbody {
  height: 300px;
  overflow-x: auto;
  margin-top: 0px;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
}

table thead tr th {
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
}

table tbody tr td {
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 12px;
  color: #fff !important;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1) !important;
}

.v-btn {
  text-transform: none;
}
/* .v-list-item--active{
  background-color: rgb(6, 123, 84);
  color: white;
} */
.v-card .v-card-title {
  background-color: mediumaquamarine;
  color: white;
}
.modalpopup {
  position: absolute;
  right: 7px;
  top: 7px;
  color: #fbfbfb !important;
  cursor: pointer;
}
.v-card-actions {
  background-color: ghostwhite !important;
}
</style>