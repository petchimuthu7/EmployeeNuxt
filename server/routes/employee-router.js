const express = require('express');
const config = require('../config/config');
const employeeservice = require('../services/employee-service');
const router = express.Router();
const multer = require("multer");

router.post('/employee/list', (req, res) => {
    employeeservice.getEmployeeList(req.body.UserId).then(result => res.send(result));
});

router.post('/employee/get', (req, res) => {
    employeeservice.getEmployeeDetailsById(req.body.EmployeeId).then(result => res.send(result));
});

router.post('/employee/save', (req, res) => {
    employeeservice.saveEmployeeDetails(req.body).then(result => res.send(result));
});

router.post('/employee/document-list', (req, res) => {
    employeeservice.getEmployeeDocumentList(req.body.EmployeeId).then(result => res.send(result));
});

router.post('/employee/document-upload', (req, res) => {
    employeeservice.UploadEmployeeDocument(req.body).then(result => res.send(result));
});

router.post('/employee/document-get', (req, res) => {
    employeeservice.GetEmployeeDocumentDetails(req.body).then(result => res.send(result));
});

module.exports = router;