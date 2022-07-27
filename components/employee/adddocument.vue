<template>
  <v-card width="600">
    <v-card-title>
      <span class="text-h5">Upload Document</span>
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
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="DocumentName"
                label="Document Name*"
                variant="outlined"
                maxlength="150"
                shaped
                :error-messages="fileNameErrors"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-textarea
                v-model="Description"
                label="Description*"
                variant="outlined"
                maxlength="500"
                shaped
                :error-messages="descriptionErrors"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-file-input
                v-model="files"
                color="deep-purple accent-4"
                counter
                label="Select your file"
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
                outlined
                accept=".jpg,.png,.jpeg,.pdf,.xlsx"
                @change="FileSeleted($event)"
                :error-messages="fileErrors"
              >
                <template v-slot:selection="{ fileNames }">
                  <template v-for="(file, index) in fileNames" :key="file">
                    <v-chip
                      v-if="index < 2"
                      color="deep-purple-accent-4"
                      label
                      size="small"
                      class="mr-2"
                    >
                      {{ file }}
                    </v-chip>
                  </template>
                </template>
              </v-file-input>
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
        Upload
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
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
  props: {
    paramEmployeeId: "",
    paramDocumentId: "",
  },
  data: () => ({
    v$: useVuelidate(),
    valid: true,
    files: [],
    EmployeeId: "",
    DocumentId: "",
    DocumentName: "",
    Description: "",
    FileName: "",
    FileData: "",
    FileSize: 0,
    FileType: "",
    isEnableLoader: false,
    btnSubmitDisabled: false,
    overlay: true,
  }),
  validations() {
    return {
      FileName: {
        required,
        maxlength() {
          if (this.FileName?.length < 150) {
            return true;
          } else {
            return false;
          }
        },
      },
      Description: {
        required,
        maxlength() {
          if (this.Description?.length < 500) {
            return true;
          } else {
            return false;
          }
        },
      },
      files: {
        required,
      },
    };
  },
  mounted() {
    debugger;
    this.overlay = false;
    this.EmployeeId = this.paramEmployeeId;
    this.DocumentId = this.paramDocumentId;
    this.GetEmployeeDocumentDetailsById(
      this.paramEmployeeId,
      this.paramDocumentId
    );
  },
  computed: {
    documentNameErrors() {
      const errors = [];
      if (this.overlay == false) {
        if (!this.v$.DocumentName.$dirty) return errors;
        this.v$.DocumentName.required.$invalid &&
          errors.push("Document Name required");
        this.v$.DocumentName.maxlength.$invalid &&
          errors.push("Document Name should be a maximum of 150 characters");
      }
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (this.overlay == false) {
        if (!this.v$.Description.$dirty) return errors;
        this.v$.Description.required.$invalid &&
          errors.push("Description required");
        this.v$.Description.maxlength.$invalid &&
          errors.push("Description should be a maximum of 150 characters");
      }
      return errors;
    },
    fileErrors() {
      const errors = [];
      if (this.overlay == false) {
        if (!this.v$.files.$dirty) return errors;
        this.v$.files.required.$invalid && errors.push("File required");
      }
      return errors;
    },
  },
  methods: {
    async GetEmployeeDocumentDetailsById(id, id1) {
      await this.$axios
        .$post("/employee/document-get", {
          EmployeeId: id,
          DocumentId: id1,
        })
        .then((result) => {
          if (
            result != null &&
            result != undefined &&
            result.Status == "Success"
          ) {
            debugger;
            this.EmployeeId = result.EmployeeId;
            this.DocumentId = result.DocumentId;
            this.DocumentName = result.DocumentName;
            this.Description = result.Description;
            this.FileData = result.FileData;
            this.FileName = result.FileName;
          }
        });
    },
    async submit() {
      const result = await this.v$.$validate();
      if (!result) {
        // notify user form is invalid
        return;
      } else {
        this.btnSubmitDisabled = true;
        this.isEnableLoader = true;
        this.UploadDocument();
      }
      // perform async actions
    },
    close() {
      this.$refs.form.reset();
      this.$emit("EmitEmployeeDocumentComponent");
    },
    FileSeleted(e) {
      debugger;
      if (this.files) {
        this.FileName = this.files[0].name;
        const fileNameSplit = this.FileName.split(".");
        if (fileNameSplit != null && fileNameSplit?.length > 0) {
          this.FileType = fileNameSplit[fileNameSplit?.length - 1];
          this.FileType = this.FileType?.toLowerCase();
        }
        this.FileSize = this.files[0].size;
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this.files[0]);
        reader.readAsDataURL(this.files[0]);
      } else {
        this.FileName = "";
        this.FileSize = 0;
        this.FileData = "";
        this.FileType = "";
      }
    },
    handleReaderLoaded(file) {
      const reader = file.target;
      this.FileData = reader.result;
    },
    UploadDocument() {
      this.$axios
        .$post("/employee/document-upload", {
          EmployeeId: this.EmployeeId,
          DocumentId: this.DocumentId,
          DocumentName: this.DocumentName,
          Description: this.Description,
          FileName: this.FileName,
          FileData: this.FileData,
        })
        .then((result) => {
          if (result.Status == "Success" && result.DocumentId != "") {
            this.$emit("EmitEmployeeDocumentComponent");
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
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
};
</script>