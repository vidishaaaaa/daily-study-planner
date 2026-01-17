// content.js
// Auto content ideas from study topics

function generateContentIdea(subject, topic) {
  const templates = [
    `One important concept from ${topic} you must remember`,
    `${topic} – most common mistake students make`,
    `${topic} trick that saves time in exams`,
    `Exam question from ${topic} you should not miss`,
    `${topic} explained in 30 seconds`
  ];

  const idea =
    templates[Math.floor(Math.random() * templates.length)];

  return {
    subject,
    topic,
    idea,
    createdAt: new Date().toLocaleString(),
    status: "pending" // pending | posted
  };
}

function saveContentIdea(content) {
  const list =
    JSON.parse(localStorage.getItem("contentIdeas") || "[]");

  list.push(content);
  localStorage.setItem("contentIdeas", JSON.stringify(list));
}
