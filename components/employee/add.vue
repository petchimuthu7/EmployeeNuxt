<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Employee Profile Info</span>
      <v-icon class="modalpopup" @click="close()" large color="blue darken-2">
        mdi-close
      </v-icon>
    </v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-form
          ref="form"
          @submit.prevent="submit"
          class="form"
          v-model="valid"
          lazy-validation
        >

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="FirstName"
                label="First Name*"
                variant="outlined"
                maxlength="75"
                shaped
                :rules="firstNameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="LastName"
                label="Last Name*"
                variant="outlined"
                maxlength="75"
                shaped
                :rules="lastNameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="EmailAddress"
                onkeydown="if(['Space'].includes(arguments[0].code)){return false;}"
                label="Email Address*"
                variant="outlined"
                maxlength="150"
                shaped
                type="email"
                :rules="emailAddressRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="MobileNumber"
                label="Mobile Number*"
                variant="outlined"
                shaped
                maxlength="15"
                :rules="mobileNubmerRules"
                v-mask="'(###) ###-####'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="Positions"
                :items="positions"
                item-title="text"
                item-value="value"
                label="Position*"
                :rules="positionsRules"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-radio-group
                v-model="Gender"
                :rules="genderRules"
                inline
              >
                <template v-slot:label>
                  <div>Gender:</div>
                </template>
                <v-radio label="Male" value="male" color="indigo"></v-radio>
                <v-radio label="Female" value="female" color="indigo"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="DOB"
                label="DOB"
                type="date"
                variant="outlined"
                shaped
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
        size="large"
        rounded="pill"
        style="background-color: #0a910d; color: white !important"
        @click="submit"
      >
        Save
        <v-progress-circular
          v-if="isEnableLoader"
          :width="2"
          color="white"
          indeterminate
        ></v-progress-circular>
      </v-btn>
    </v-card-actions>
  </v-card>
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
    isEnableLoader: false,
    btnSubmitDisabled: false,
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
  mounted() {
    this.GetEmployeeDetailsById(this.paramEmployeeId);
  },
  methods: {
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
      this.$refs.form.validate();
      if (!this.valid) {
        // notify user form is invalid
        return;
      } else {
        this.btnSubmitDisabled = true;
        this.isEnableLoader = true;
        this.SaveEmployeeDetails();
      }
      // perform async actions
    },
    close() {
      this.$refs.form.reset();
      this.$emit("EmitEmployeeDetailsComponent");
    },
    SaveEmployeeDetails() {
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
            location.href = "/employee";
          } else {
            this.btnSubmitDisabled = false;
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