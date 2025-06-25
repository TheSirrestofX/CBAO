import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_fcBYUgy8E7u6j-zp_wbaRzH3TBQZ04w",
  authDomain: "program-of-work-stage.firebaseapp.com",
  projectId: "program-of-work-stage",
  storageBucket: "program-of-work-stage.appspot.com",
  messagingSenderId: "541617325107",
  appId: "1:541617325107:web:213eb242c362f2c53a8f46"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#reportsTable tbody");
  tableBody.innerHTML = "";

  const snapshot = await getDocs(collection(db, "powRecords"));

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${docSnap.id}</td>
      <td>${data.projectTitle || 'N/A'}</td>
      <td>${data.location || 'N/A'}</td>
      <td>${data.inCharge || 'N/A'}</td>
      <td>${data.sourceOfFunds || 'N/A'}</td>
      <td>${data.appropriation || 'N/A'}</td>
      <td>${data.abc || 'N/A'}</td>
      <td>${data.dateAssigned || 'N/A'}</td>
      <td>${data.adjustedAssignedDate || 'N/A'}</td>
      <td>${data.targetCompletionDate || 'N/A'}</td>
      <td>${data.initialSubmissionDate || 'N/A'}</td>
      <td>${data.initialReturnDate || 'N/A'}</td>
      <td>${data.revisedSubmissionDate || 'N/A'}</td>
      <td>${data.revisedReturnDate || 'N/A'}</td>
      <td>${data.additionalRevisedSubmissionDate || 'N/A'}</td>
      <td>${data.additionalRevisedReturnDate || 'N/A'}</td>
      <td>${data.finalSubmissionDate || 'N/A'}</td>
      <td>${data.finalReturnDate || 'N/A'}</td>
      <td>${data.actualApprovalDate || 'N/A'}</td>
      <td>${data.typeCategory || 'N/A'}</td>
      <td>${data.status || 'N/A'}</td>
      <td>${data.remarks || 'N/A'}</td>
      <td>
        <button class="update-btn" data-id="${docSnap.id}">
          <i class="fa fa-edit"></i> Update
        </button>
        <button class="print-btn" data-id="${docSnap.id}">
          <i class="fa fa-print"></i> Print
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Update listener
  document.querySelectorAll(".update-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      window.location.href = `/HTML/form.html?id=${id}`;
    });
  });

  // Print listener
  document.querySelectorAll(".print-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");
      const docSnap = snapshot.docs.find(doc => doc.id === id);
      if (!docSnap) return;
      const data = docSnap.data();

      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>${data.projectTitle || "N/A"} #${id}</title>
            <style>
              body { font-family: Arial, padding: 20px; background: #fff; }
              h1 { text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 10px; border: 1px solid #ddd; vertical-align: top; }
              th { background: #f7f7f7; width: 35%; text-align: left; }
              /*logo styling for document*/
              .header-container{display: flex; align-items: center; justify-content:flex-start; gaps 20px; margin-bottom: 20px;}
              .document-logo img {width: 80px; height: auto;}
              .document-title h1 {font-size: 24px; margin-left: 50px; padding: 0px}
            </style>
          </head>
          <body>
            <div class="header-container">
              <div class="document-logo">
                <img src="/Img/CBAO logo.jpg" alt="logo here"/>
              </div>
              <div class="document-title">
                <h1>Program of Work Record</h1>
              </div>
            </div>
            <table>
              <tr><th>Project Title</th><td>${data.projectTitle || "N/A"}</td></tr>
              <tr><th>Location</th><td>${data.location || "N/A"}</td></tr>
              <tr><th>In Charge</th><td>${data.inCharge || "N/A"}</td></tr>
              <tr><th>Source of Funds</th><td>${data.sourceOfFunds || "N/A"}</td></tr>
              <tr><th>Appropriation</th><td>${data.appropriation || "N/A"}</td></tr>
              <tr><th>ABC</th><td>${data.abc || "N/A"}</td></tr>
              <tr><th>Date Assigned</th><td>${data.dateAssigned || "N/A"}</td></tr>
              <tr><th>Adjusted Assigned Date</th><td>${data.adjustedAssignedDate || "N/A"}</td></tr>
              <tr><th>Target Completion Date</th><td>${data.targetCompletionDate || "N/A"}</td></tr>
              <tr><th>Initial Submission Date</th><td>${data.initialSubmissionDate || "N/A"}</td></tr>
              <tr><th>Initial Return Date</th><td>${data.initialReturnDate || "N/A"}</td></tr>
              <tr><th>Revised Submission Date</th><td>${data.revisedSubmissionDate || "N/A"}</td></tr>
              <tr><th>Revised Return Date</th><td>${data.revisedReturnDate || "N/A"}</td></tr>
              <tr><th>Additional Revised Submission Date</th><td>${data.additionalRevisedSubmissionDate || "N/A"}</td></tr>
              <tr><th>Additional Revised Return Date</th><td>${data.additionalRevisedReturnDate || "N/A"}</td></tr>
              <tr><th>Final Submission Date</th><td>${data.finalSubmissionDate || "N/A"}</td></tr>
              <tr><th>Final Return Date</th><td>${data.finalReturnDate || "N/A"}</td></tr>
              <tr><th>Actual Approval Date</th><td>${data.actualApprovalDate || "N/A"}</td></tr>
              <tr><th>Type Category</th><td>${data.typeCategory || "N/A"}</td></tr>
              <tr><th>Status</th><td>${data.status || "N/A"}</td></tr>
              <tr><th>Remarks</th><td>${data.remarks || "N/A"}</td></tr>
            </table>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    });
  });
});
