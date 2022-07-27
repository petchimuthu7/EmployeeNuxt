<template>
  <v-app-bar color="teal-darken-4">
    <template v-slot:prepend>
      <img
        style="width: 100px"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2WhG1J-PBGi8Shr2Q3jq_bSukQBFXqPfo4w&usqp=CAU"
      />
    </template>
    <v-app-bar-title>Company Name</v-app-bar-title>
      <v-list class="pb-0 pt-0 main-menu bg-transparent" style="margin-right: 1%; margin-top: 2%;" lines="one">
        <v-list-item active-color="white" style="cursor: pointer;" class="d-inline-flex home-icon" :active="activeMenu=='dashboard'">
          <v-list-item-subtitle @click="GotoDashboard()">Dashboard</v-list-item-subtitle>
        </v-list-item>
        <v-list-item active-color="white" style="cursor: pointer;" class="d-inline-flex home-icon" :active="activeMenu=='employee'">
          <v-list-item-subtitle @click="GotoEmployee()">Employee</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    <template v-slot:append>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="brown" size="large">
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="text-center">
              <v-avatar size="large">
                <v-icon size="50" icon="mdi-account-circle"></v-icon>
              </v-avatar>
              <h3>{{ store.getUserName }}</h3>
              <p class="text-caption mt-1">
                {{ store.getEmailAddress }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text"> My Account </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="logOut()"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>

  <!-- 
  <v-toolbar color="purple" dense>
    <v-toolbar-title>Logo</v-toolbar-title>
    <v-divider class="mx-4" vertical></v-divider>
    <v-spacer></v-spacer>

    <v-btn variant="outlined" style="margin-right: 10px" to="/dashboard"
      >Dashboard</v-btn
    >
    <v-btn variant="outlined" to="/employee"> Employee</v-btn>

    <v-spacer></v-spacer>

    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="brown" size="large">
            <span class="white--text text-h5">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card style="left: -80% !important">
        <v-card-text>
          <div class="text-center">
            <v-avatar color="brown">
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
            <h3>{{ store.getUserName }}</h3>
            <p class="text-caption mt-1">
              {{ store.getEmailAddress }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text"> My Account </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text" @click="logOut()"> Logout </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-toolbar> -->
</template>

<script>
import { useStore } from "~/store/index";
export default {
  setup() {
    const store = useStore();
    return {
      // you can return the whole store instance to use it in the template
      store,
    };
  },
  data: () => ({
    activeMenu: "",
  }),
  mounted() {
    const domainName = location.hostname;
    this.isWhiteLabelClient = !(
      domainName === process.env.AdminSiteDomainName ||
      domainName?.substring(
        0,
        domainName.indexOf(".") === process.env.AdminSiteDomainName
      )
    );
    const path = this.$route.path.split("/");
    this.activeMenu = path[1] === "" ? "dashboard" : path[1];
  },
  methods: {
    logOut() {
      this.store.logOut();
    },
    GotoDashboard() {
      location.href = "/dashboard";
    },
    GotoEmployee() {
      location.href = "/employee";
    },
  },
};
</script>