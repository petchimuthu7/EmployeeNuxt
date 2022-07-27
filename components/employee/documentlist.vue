<template>
  <div
    class="d-flex flex-column fill-height"
    style="margin: 10px 10px 0px 10px; width: 100%"
  >
    <div>
      <v-btn
        v-if="documentList != null && documentList.length > 0"
        @click="AddDocument(employeeId, 0)"
        color="primary"
        size="small"
        style="float: right; margin-right: 20px"
      >
        <v-icon>mdi-upload</v-icon> Upload Document</v-btn
      >
      <h3>Documents</h3>
    </div>
    <div v-if="isLoader">
      <v-card>
        <img src="~/assets/images/table-loader.gif" />
      </v-card>
    </div>
    <div v-else style="margin-top: 5px" class="tbl-header">
      <div
        v-if="!isLoader && (documentList == null || documentList.length == 0)"
        style="height: 270px"
      >
        <v-btn
          @click="AddDocument(employeeId, 0)"
          color="primary"
          size="small"
          style="left: 43%; top: 50%"
        >
          <v-icon>mdi-upload</v-icon> Upload Document</v-btn
        >
      </div>
      <v-table
        fixed-header
        width="100"
        v-if="documentList != null && documentList.length > 0"
      >
        <thead style="background-color: pink">
          <tr>
            <th class="text-left">File Name</th>
            <th class="text-left">Description</th>
            <th class="text-center" width="10">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in documentList" :key="item.DocumentId">
            <td>{{ item.DocumentName }}</td>
            <td>{{ item.Description }}</td>
            <td>
              <div class="d-flex justify-space-between">
                <v-btn variant="plain" @click="AddDocument(item.DocumentId, 0)">
                  <v-tooltip activator="parent" location="bottom"
                    >Edit</v-tooltip
                  >
                  <v-icon size="35">mdi-pencil-circle</v-icon>
                </v-btn>
                <v-btn variant="plain" @click="ViewDocument(item.FileData)">
                  <v-tooltip activator="parent" location="bottom"
                    >View</v-tooltip
                  >
                  <v-icon size="35">mdi-eye-circle</v-icon>
                </v-btn>
                <v-btn
                  variant="plain"
                  @click.prevent="DownloadItem(item.FileData)"
                >
                  <v-tooltip activator="parent" location="bottom"
                    >Download</v-tooltip
                  >
                  <v-icon size="35">mdi-download-circle</v-icon>
                </v-btn>
                <!-- <v-btn variant="plain">
                  <v-tooltip activator="parent" location="bottom"
                    >Edit</v-tooltip
                  >
                  <v-icon size="35">mdi-delete-circle</v-icon>
                </v-btn> -->
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <div>
      <v-row justify="center">
        <v-dialog v-model="docdialog" width="800" persistent>
          <employee-adddocument
            :paramEmployeeId="employeeId"
            :paramDocumentId="documentId"
            @EmitEmployeeDocumentComponent="EmitEmployeeDocumentComponent"
          />
        </v-dialog>
      </v-row>
    </div>
    <div>
      <v-row justify="center">
        <v-dialog v-model="viewdialog" width="900" persistent>
          <v-card width="900">
            <v-card-title>
              <span class="text-h5">View Document</span>
              <v-icon
                class="modalpopup"
                @click="CloseViewDocument()"
                large
                color="blue darken-2"
              >
                mdi-close
              </v-icon>
            </v-card-title>
            <v-card-text>
              <iframe
                :src="DocumentSource"
                loading="lazy"
                :width="850"
                :height="500"
              ></iframe>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
export default {
  props: {
    docEmployeeId: "",
  },
  data: () => {
    return {
      isLoader: true,
      employeeId: "",
      documentId: "",
      docdialog: false,
      viewdialog: false,
      DocumentSource: "",
      documentList: [],
    };
  },
  computed() {},
  watch: {
    docEmployeeId: function (newVal, oldVal) {
      this.GetEmployeeDocumentListById(newVal);
    },
  },
  mounted() {
    this.employeeId = this.docEmployeeId;
    this.GetEmployeeDocumentListById(this.docEmployeeId);
  },
  methods: {
    async DownloadItem(data) {
      var byteString = atob(data.split(",")[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      var blob = new Blob([ab], { type: "application/pdf" });
      FileSaver.saveAs(blob, "sample.pdf");
    },
    ViewDocument(fileData) {
      this.DocumentSource = fileData;
      this.viewdialog = true;
    },
    CloseViewDocument() {
      this.viewdialog = false;
      this.DocumentSource = "";
    },
    AddDocument(id) {
      this.documentId = id;
      this.docdialog = true;
    },
    EmitEmployeeDocumentComponent() {
      this.GetEmployeeDocumentListById(this.docEmployeeId);
      this.docdialog = false;
    },
    UploadDocument(employeeId, documentId) {
      this.employeeId = employeeId;
      this.documentId = documentId;
      this.docdialog = true;
    },
    async GetEmployeeDocumentListById(id) {
      this.isLoader = true;
      const documentList = await this.$axios
        .$post("/employee/document-list", {
          EmployeeId: id,
        })
        .then((result) => {
          if (
            result != null &&
            result != undefined &&
            result.Status == "Success"
          ) {
            setTimeout(() => {
              this.documentList = result.DocumentList;
              this.isLoader = false;
            });
          } else {
          }
        });
      return documentList;
    },
  },
};
</script>
