const { json } = require("body-parser");
const fs = require("fs")
const underscore = require("underscore")

class EmployeeService {

  async GetEmployeeDocumentDetails(documentGetRequest) {
    if (documentGetRequest.EmployeeId != null && documentGetRequest.EmployeeId != undefined && documentGetRequest.EmployeeId != "") {
      if (documentGetRequest.DocumentId != null && documentGetRequest.DocumentId != undefined && documentGetRequest.DocumentId != "") {
        var documentList = JSON.parse(fs.readFileSync("./employee-document-list.json", 'utf8'));
        if (documentList != null && documentList.length > 0) {
          var document = underscore.where(documentList, { EmployeeId: documentGetRequest.EmployeeId, DocumentId: documentGetRequest.DocumentId });
          if (document != null && document.length > 0) {
            return {
              Status: "Success",
              DocumentId: document[0].DocumentId,
              EmployeeId: document[0].EmployeeId,
              DocumentName: document[0].DocumentName,
              FileData: document[0].FileData,
              FileName: document[0].FileName,
              Description: document[0].Description,
            };
          } else {
            return {
              Status: "Failure",
              Message: "Invalid DocumentId"
            }
          }
        }
      } else {
        return {
          Status: "Failure",
          Message: "Invalid DocumentId"
        }
      }
    } else {
      return {
        Status: "Failure",
        Message: "Invalid EmployeeId"
      }
    }
  }

  async UploadEmployeeDocument(documentDetails) {
    if (documentDetails != null && documentDetails != undefined) {
      var documentList = JSON.parse(fs.readFileSync("./employee-document-list.json", 'utf8'));
      if (documentList != null && documentList.length > 0) {
        var document = underscore.where(documentList, { EmployeeId: documentDetails.EmployeeId, DocumentId: documentDetails.Documentid });
        if (document != null && document.length > 0) {
          for (var i = 0; i < documentList.length; i++) {
            if (documentList[i].EmployeeId === documentDetails.EmployeeId && documentList[i].DocumentId === documentDetails.DocumentId) {
              documentList.splice(i, 1);
              i--;
            }
          }
          documentList.push(documentDetails)
        } else {
          documentDetails.DocumentId = "200" + documentList.length + 1
          documentList.push(documentDetails)
        }
        fs.writeFileSync("./employee-document-list.json", JSON.stringify(documentList), 'utf8')
        return {
          DocumentId: documentDetails.DocumentId,
          Status: "Success"
        }
      }
    }
  }

  async getEmployeeList() {
    return JSON.parse(fs.readFileSync("./employee-list.json", 'utf8'));
  }

  async getEmployeeDetailsById(employeeId) {
    if (employeeId != null && employeeId != undefined && employeeId != "") {
      var employeeList = JSON.parse(fs.readFileSync("./employee-list.json", 'utf8'));
      if (employeeList != null && employeeList.length > 0) {
        var employee = underscore.where(employeeList, { EmployeeId: employeeId });
        if (employee != null && employee.length > 0) {
          return {
            Status: "Success",
            EmployeeId: employee[0].EmployeeId,
            FirstName: employee[0].FirstName,
            LastName: employee[0].LastName,
            EmailAddress: employee[0].EmailAddress,
            MobileNumber: employee[0].MobileNumber,
            DOB: employee[0].DOB,
            ProfileImageUrl: employee[0].ProfileImageUrl,
            Positions: employee[0].Positions,
            Gender: employee[0].Gender,
            IsSentNewsLetter: employee[0].IsSentNewsLetter,
          };
        } else {
          return {
            Status: "Failure",
            Message: "Invalid EmployeeId"
          }
        }
      }
    } else {
      return {
        Status: "Failure",
        Message: "Invalid EmployeeId"
      }
    }
  }

  async saveEmployeeDetails(employeeDetails) {
    if (employeeDetails != null && employeeDetails != undefined) {
      var employeeList = JSON.parse(fs.readFileSync("./employee-list.json", 'utf8'));
      if (employeeList != null && employeeList.length > 0) {
        var employee = underscore.where(employeeList, { EmployeeId: employeeDetails.EmployeeId });
        if (employee != null && employee.length > 0) {
          for (var i = 0; i < employeeList.length; i++) {
            if (employeeList[i].EmployeeId === employeeDetails.EmployeeId) {
              employeeList.splice(i, 1);
              i--;
            }
          }
          employeeList.push(employeeDetails)
        } else {
          employeeDetails.EmployeeId = "100" + employeeList.length
          employeeList.push(employeeDetails)
        }
        fs.writeFileSync("./employee-list.json", JSON.stringify(employeeList), 'utf8')
        return {
          EmployeeId: employeeDetails.EmployeeId,
          Status: "Success"
        }
      }
    }
  }

  async getEmployeeDocumentList(employeeId) {
    if (employeeId != null && employeeId != undefined && employeeId != "") {
      var documentList = JSON.parse(fs.readFileSync("./employee-document-list.json", 'utf8'));
      if (documentList != null && documentList.length > 0) {
        var document = underscore.where(documentList, { EmployeeId: employeeId });
        if (document != null && document.length > 0) {
          return {
            Status: "Success",
            DocumentList: document
          }
        } else {
          return {
            Status: "Success"
          }
        }
      }
    } else {
      return {
        Status: "Failure",
        Message: "Invalid EmployeeId"
      }
    }
  }

}

module.exports = new EmployeeService()