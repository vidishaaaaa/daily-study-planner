const stats =
  JSON.parse(localStorage.getItem("studyStats") || "{}");

const dash = document.getElementById("dashboard");

let total = 0;
let html = "<h2>📊 Study Dashboard</h2><ul>";

for (let subject in stats) {
  total += stats[subject];
  html += `<li>
    <strong>${subject.toUpperCase()}</strong> :
    ${stats[subject].toFixed(1)} hrs
  </li>`;
}

html += `</ul>
<p><strong>Total Studied:</strong> ${total.toFixed(1)} hrs</p>`;

dash.innerHTML = html;
