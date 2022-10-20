"use strict";

var billArr = [];

var Bill = function (name, address, start, end, vat, totalAmount) {
  this.name = name;
  this.address = address;
  this.start = start;
  this.end = end;
  this.vat = vat;
  this.totalAmount = totalAmount;
};

function renderTable() {
  var html = "";
  billArr.forEach(function (data, index) {
    html += `<tr>
              <td>${index + 1}</td>
              <td>${data.name}</td>
              <td>${data.address}</td>
              <td>${data.start}</td>
              <td>${data.end}</td>
              <td>${data.vat}</td>
              <td>${data.totalAmount}</td>
            </tr>`;
    document.querySelector(".tblBill tbody").innerHTML = html;
  });
}

document
  .querySelector('.btnArea button[type="button"]')
  .addEventListener("click", function () {
    var txtName = document.querySelector("#name").value;
    var txtAddress = document.querySelector("#address").value;
    var txtStartPeriod = document.querySelector("#start-period").value;
    var txtEndPeriod = document.querySelector("#end-period").value;
    var txtVAT = document.querySelector("#vat-tax").value / 100;
    var totalAmount;

    if (txtStartPeriod == "" || txtEndPeriod == "") {
      alert("Please input Start-up period hoac End-of-items digits");
      return;
    }

    if (txtStartPeriod <= 0) {
      document.querySelector(".error-msg-start").innerText =
        "Number must be greater than 0";
      return;
    }

    if (txtEndPeriod < txtStartPeriod) {
      document.querySelector(".error-msg-end").innerText =
        "End-of-items digits must be greater than Start-up period";
      return;
    }

    var useElectricityPeriod = txtEndPeriod - txtStartPeriod;
    if (useElectricityPeriod > 0 && useElectricityPeriod <= 50) {
      totalAmount = useElectricityPeriod * 1480 + useElectricityPeriod * txtVAT;
    } else if (useElectricityPeriod >= 51 && useElectricityPeriod <= 100) {
      totalAmount = useElectricityPeriod * 1500 + useElectricityPeriod * txtVAT;
    } else if (useElectricityPeriod >= 101) {
      totalAmount = useElectricityPeriod * 1800 + useElectricityPeriod * txtVAT;
    }

    var billInfo = new Bill(
      txtName,
      txtAddress,
      txtStartPeriod,
      txtEndPeriod,
      txtVAT,
      totalAmount
    );

    billArr.push(billInfo);

    renderTable();
  });

// Export to XLSX
function exportExcel() {
  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("table.tblBill"));
}

document
  .querySelectorAll(".container .form .row-item input")
  .forEach(function (element) {
    element.addEventListener("keyup", function (e) {
      if (e.keyCode == 13) {
        document.querySelector('.btnArea button[type="button"]').click();
      }
    });
  });
