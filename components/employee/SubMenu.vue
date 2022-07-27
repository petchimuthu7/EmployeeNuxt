<template>
  <v-row>
    <v-card>
      <v-list lines="three">
        <v-list-subheader inset style="font-weight: 800"
          >Employee List</v-list-subheader
        >
        <v-list-item
          v-for="employee in employeeList"
          :key="employee.EmployeeId"
          :prepend-avatar="employee.prependAvatar"
          :title="employee.title"
          :subtitle="employee.subtitle"
          :active="selectedemployee == employee.EmployeeId"
          @click="ShowEmployeeDetails(employee.EmployeeId)"
          active-color="#136a8a"
        >
          <template v-slot:subtitle="{ subtitle }">
            <div v-html="subtitle"></div>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-row>
</template>

<script>
import { useStore } from "~/store/index";

export default {
  data: () => ({
    store: useStore(),
    isShow: true,
    selectedemployee: "0",
    employeeList: [],
  }),
  mounted() {
    this.GetEmployeeListByUserId();
  },
  methods: {
    async GetEmployeeListByUserId() {
      const employeeList = await this.$axios
        .$post("/employee/list", {
          UserId: this.store.getUserId,
        })
        .then((result) => {
          if (result != null && result != undefined && result.length > 0) {
            result.forEach((element) => {
              this.employeeList.push({
                EmployeeId: element.EmployeeId,
                prependAvatar: element.ProfileImageUrl != "" && element.ProfileImageUrl != undefined && element.ProfileImageUrl != null ? element.ProfileImageUrl : "<v-avatar color=\"info\" size=\"30\"><v-icon icon=\"mdi-account-circle\"></v-icon></v-avatar>",
                title: element.FirstName + " " + element.LastName,
                subtitle:
                  element.EmailAddress + "<br />" + element.MobileNumber,
              });
            });
            this.ShowEmployeeDetails(result[0].EmployeeId);
          } else {
          }
        });
      return employeeList;
    },
    ShowEmployeeDetails(employeeId) {
      this.selectedemployee = employeeId;
      this.$emit("EmitSeletedComponent", employeeId);
    },
  },
};
</script>
