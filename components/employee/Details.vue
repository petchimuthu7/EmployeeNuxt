<template>
  <div v-if="isLoader">
    <v-card>
      <img src="~/assets/images/loader.gif" />
    </v-card>
  </div>
  <div v-else>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <div class="d-flex flex-column fill-height">
          <div style="margin: 10px 10px 0px 10px">
            <v-btn
              @click="AddEmployee(0)"
              color="primary"
              size="small"
              style="float: right; margin-right: 20px"
            >
              <v-icon>mdi-account-plus</v-icon> Add New Employee</v-btn
            >
            <h1 class="text-h4 font-weight-thin mb-4 grey">
              <v-avatar>
                <v-img :src="ProfileImageUrl" :alt="FirstName"></v-img>
              </v-avatar>
              {{ FirstName + " " + LastName }}
            </h1>
          </div>
          <v-divider></v-divider>
          <div style="margin: 10px 10px 0px 10px">
            <v-btn
              size="x-small"
              color="secondary"
              style="float: right; margin-left: 50%"
              @click="AddEmployee(EmployeeId)"
            >
              <v-icon>mdi-account-edit</v-icon> Edit</v-btn
            >
            <h4 class="subheading">Personal Info</h4>
            <v-table>
              <tr>
                <td>Name:</td>
                <td>
                  {{ FirstName + " " + LastName }}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <v-spacer></v-spacer>
                </td>
              </tr>
              <tr>
                <td>Email Address:</td>
                <td>
                  {{ EmailAddress }}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <v-spacer></v-spacer>
                </td>
              </tr>
              <tr>
                <td>Mobile Number:</td>
                <td>
                  {{ MobileNumber }}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <v-spacer></v-spacer>
                </td>
              </tr>
              <tr>
                <td>Date of Birth:</td>
                <td>
                  {{ dateTime(DOB) }}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <v-spacer></v-spacer>
                </td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>
                  {{ Gender }}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <v-spacer></v-spacer>
                </td>
              </tr>
              <tr>
                <td>Is Sent NewsLetter:</td>
                <td>
                  {{ IsSentNewsLetter }}
                </td>
              </tr>
            </v-table>
          </div>
        </div>
        <div>
          <v-row justify="center">
            <v-dialog v-model="dialog" width="800" persistent>
              <employee-add
                :paramEmployeeId="tempEmployeeId"
                @EmitEmployeeDetailsComponent="EmitEmployeeDetailsComponent"
              />
            </v-dialog>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-divider v-if="isLoader"></v-divider>
        <employee-documentlist
          :docEmployeeId="employeeId"
          v-if="isShowDocument"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as moment from "moment/moment";

export default {
  props: {
    employeeId: "",
  },
  data: () => {
    return {
      isLoader: true,
      tempEmployeeId: "",
      isShowDocument: false,
      documentEmployeeId: "",
      dialog: false,
      EmployeeId: "",
      FirstName: "",
      LastName: "",
      EmailAddress: "",
      MobileNumber: "",
      DOB: "",
      Gender: "",
      ProfileImageUrl: "",
      IsSentNewsLetter: "",
    };
  },
  watch: {
    employeeId: function (newVal, oldVal) {
      this.documentEmployeeId = newVal;
      this.GetEmployeeDetailsById(newVal);
    },
  },
  mounted() {
    this.documentEmployeeId = this.employeeId;
    this.GetEmployeeDetailsById(this.employeeId);
    this.isShowDocument = true;
  },
  methods: {
    dateTime(value) {
      //return new Date(value).toLocaleDateString();
      return moment(value).format("YYYY-MM-DD");
    },
    EmitEmployeeDetailsComponent() {
      this.dialog = false;
    },
    AddEmployee(id) {
      this.tempEmployeeId = id;
      this.dialog = true;
    },
    async GetEmployeeDetailsById(id) {
      this.isLoader = true;
      const employeeList = await this.$axios
        .$post("/employee/get", {
          EmployeeId: id,
        })
        .then((result) => {
          if (
            result != null &&
            result != undefined &&
            result.Status == "Success"
          ) {
            setTimeout(() => {
              this.EmployeeId = result.EmployeeId;
              this.FirstName = result.FirstName;
              this.LastName = result.LastName;
              this.EmailAddress = result.EmailAddress;
              this.MobileNumber = result.MobileNumber;
              this.DOB = new Date(result.DOB).toLocaleDateString("en-CA");
              this.ProfileImageUrl = result.ProfileImageUrl;
              this.Positions = result.Positions;
              this.Gender = result.Gender;
              this.IsSentNewsLetter = result.IsSentNewsLetter;
              this.isLoader = false;
            }, 500);
          } else {
          }
        });
      return employeeList;
    },
  },
};
</script>

<style>
</style>