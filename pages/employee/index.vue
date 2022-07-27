<script setup>
const route = useRoute();
</script>

<template>
  <v-navigation-drawer color="grey">
    <employee-sub-menu
      @EmitSeletedComponent="EmitSeletedComponent"
    ></employee-sub-menu>
  </v-navigation-drawer>
  <v-main>
    <v-card height="100%">
      <EmployeeDetails
        :employeeId="EmployeeId"
        v-if="isDisplayEmployeeDetails"
      />
    </v-card>
  </v-main>
</template>

<script>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  data: () => ({
    isDisplayEmployeeDetails: false,
    EmployeeId: 0,
  }),
  methods: {
    EmitSeletedComponent(employeeId) {
      // if (this.route.query != undefined && this.route.query.id != undefined && this.route.query.id != "") {
      //   employeeId = this.route.query.id;
      // }
      this.$router.push({
        path: "/employee",
        query: {
          id: employeeId,
        },
      });
      this.EmployeeId = employeeId;
      this.isDisplayEmployeeDetails = true;
      this.$root.$emit('EmployeeDetails')
    },
  },
};
</script>