function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("open");
}

const subjectList = document.getElementById("subject-list");

Object.keys(syllabus).forEach(subject => {
  const li = document.createElement("li");
  li.innerText = subject.toUpperCase();

  li.onclick = () => {
    window.location.href = `subject.html?name=${subject}`;
  };

  subjectList.appendChild(li);
});
