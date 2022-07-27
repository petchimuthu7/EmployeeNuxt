<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="800" persistent>
      <!-- <template v-slot:activator="{ props }">
        <v-icon
          v-bind="props"
          v-if="paramEmployeeId == null || paramEmployeeId == undefined"
          style="float: right; margin-top: 20px; margin-right: 20px"
          @click="open(paramEmployeeId)"
          >mdi-account-plus</v-icon
        >

        <v-icon
          v-bind="props"
          v-if="paramEmployeeId != null && paramEmployeeId != undefined"
          style="float: right; margin-top: 20px; margin-right: 20px"
          @click="open(paramEmployeeId)"
          >mdi-account-edit
        </v-icon>
      </template> -->
      <v-form
        ref="form"
        @submit.prevent="submit"
        class="form"
        v-model="valid"
        lazy-validation
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Employee Profile Info</span>
            <v-icon
              class="modalpopup"
              @click="close()"
              large
              color="blue darken-2"
            >
              mdi-close
            </v-icon>
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-form ref="form">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="FirstName"
                      label="First Name*"
                      variant="outlined"
                      shaped
                      @blur="v$.FirstName.$touch()"
                      :rules="firstNameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="LastName"
                      label="Last Name*"
                      variant="outlined"
                      shaped
                      @blur="v$.LastName.$touch()"
                      :rules="lastNameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="EmailAddress"
                      onkeydown="if(['Space'].includes(arguments[0].code)){return false;}"
                      label="Email Address*"
                      variant="outlined"
                      shaped
                      type="email"
                      @blur="v$.EmailAddress.$touch()"
                      :rules="emailAddressRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="MobileNumber"
                      label="Mobile Number*"
                      variant="outlined"
                      shaped
                      @blur="v$.MobileNumber.$touch()"
                      :rules="mobileNubmerRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="Positions"
                      :items="positions"
                      item-title="text"
                      item-value="value"
                      label="Position*"
                      @select="v$.Positions.$touch()"
                      :rules="positionsRules"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-radio-group
                      v-model="Gender"
                      @click="v$.Gender.$touch()"
                      :rules="genderRules"
                      inline
                    >
                      <template v-slot:label>
                        <div>Gender:</div>
                      </template>
                      <v-radio
                        label="Male"
                        value="male"
                        color="indigo"
                      ></v-radio>
                      <v-radio
                        label="Female"
                        value="female"
                        color="indigo"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="DOB"
                      label="DOB"
                      type="date"
                      variant="outlined"
                      shaped
                      @blur="v$.DOB.$touch()"
                      :rules="dobRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-checkbox
                      v-model="IsSentNewsLetter"
                      value="true"
                      color="indigo"
                      label="Is Sent Newsletters?"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-btn
              style="background-color: gray; color: white !important"
              rounded="pill"
              @click="close()"
            >
              <v-icon start icon="mdi-minus-circle"></v-icon>Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              rounded="pill"
              style="background-color: #0a910d; color: white !important"
              @click="submit"
            >
              Save
              <template v-slot:isEnableLoader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    paramEmployeeId: "",
  },
  data: () => ({
    valid: true,
    EmployeeId: "",
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    MobileNumber: "",
    DOB: "",
    Positions: "",
    ProfileImageUrl: "",
    Gender: "",
    IsSentNewsLetter: false,
    isHide: true,
    enabled: false,
    dialog: false,
    isEnableLoader: false,
    positions: [
      { text: "Software Engineer", value: "Software Engineer" },
      { text: "Quality Assurance", value: "Quality Assurance" },
      { text: "Business Analyst", value: "Business Analyst" },
      { text: "Manager", value: "Manager" },
    ],
    firstNameRules: [
      (v) => !!v || "First Name is required",
      (v) =>
        /^[a-zA-Z0-9!@#$%^&*();:?/+,._-\s]*$/i.test(v) ||
        "First Name must be valid",
    ],
    lastNameRules: [
      (v) => !!v || "Last Name is required",
      (v) =>
        /^[a-zA-Z0-9!@#$%^&*();:?/+,._-\s]*$/i.test(v) ||
        "Last Name must be valid",
    ],
    emailAddressRules: [
      (v) => !!v || "EmailAddress is required",
      (v) =>
        /^[a-zA-Z0-9!@#$%^&*();:?/+,._-\s]*$/i.test(v) ||
        "EmailAddress must be valid",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "EmailAddress must be valid",
    ],
    mobileNubmerRules: [
      (x) => !!x || "Mobile Number is required",
      (x) => x.length <= 15 || "Mobile Number must be valid",
    ],
    positionsRules: [(x) => !!x || "Positions is required"],
    genderRules: [(x) => !!x || "Gender is required"],
    dobRules: [(x) => !!x || "DOB is required"],
  }),
  methods: {
    open(params) {
      this.GetEmployeeDetailsById(params);
      this.dialog = true;
    },
    async GetEmployeeDetailsById(id) {
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
          } else {
          }
        });
      return employeeList;
    },
    async submit() {
      debugger;
      this.$refs.form.validate();
      if (!this.valid) {
        // notify user form is invalid
        return;
      } else {
        this.isEnableLoader = true;
        this.SaveEmployeeDetails();
      }
      // perform async actions
    },
    close() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    SaveEmployeeDetails() {
      debugger;
      const user = this.$axios
        .$post("/employee/save", {
          EmployeeId: this.EmployeeId,
          FirstName: this.FirstName,
          LastName: this.LastName,
          EmailAddress: this.EmailAddress,
          Positions: this.Positions,
          DOB: this.DOB,
          MobileNumber: this.MobileNumber,
          Gender: this.Gender,
          IsSentNewsLetter: this.IsSentNewsLetter,
        })
        .then((result) => {
          if (result.Status == "Success" && result.EmployeeId != "") {
            debugger;
            location.href = "/employee";
          } else {
            this.isEnableLoader = false;
            this.errorMessage = result.Message;
            this.isShowErrorMessage = true;
            setTimeout(() => {
              this.isShowErrorMessage = false;
              this.errorMessage = "";
            }, 3000);
          }
        });
      return user;
    },
  },
};
</script>