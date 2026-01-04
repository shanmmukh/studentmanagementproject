function getData() {
    return {
        sid: document.getElementById("sid").value,
        name: document.getElementById("name").value,   // ✅ correct
        age: document.getElementById("age").value,
        course: document.getElementById("course").value
    };
}


function addStudent() {
    fetch("/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(getData())
    })
    .then(res => res.json())
    .then(data => alert(data.msg));
}

function viewStudents() {
    fetch("/view")
    .then(res => res.json())
    .then(data => {
        let html = "";
        data.forEach(s => {
            html += `
            <div class="student-card">
                <b>ID:</b> ${s.sid}<br>
                <b>Name:</b> ${s.name}<br>
                <b>Age:</b> ${s.age}<br>
                <b>Course:</b> ${s.course}
            </div>`;
        });
        output.innerHTML = html || "No students found";
    });
}

function searchStudent() {
    fetch(`/search/${sid.value}`)
    .then(res => res.json())
    .then(s => {
        output.innerHTML = s.msg ? s.msg : `
        <div class="student-card">
            <b>ID:</b> ${s.sid}<br>
            <b>Name:</b> ${s.name}<br>
            <b>Age:</b> ${s.age}<br>
            <b>Course:</b> ${s.course}
        </div>`;
    });
}

function updateStudent() {
    fetch("/update", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(getData())
    })
    .then(res => res.json())
    .then(data => alert(data.msg));
}

function deleteStudent() {
    fetch(`/delete/${sid.value}`, { method: "DELETE" })
    .then(res => res.json())
    .then(data => alert(data.msg));
}
