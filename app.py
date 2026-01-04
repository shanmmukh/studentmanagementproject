from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

students = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add", methods=["POST"])
def add_student():
    data = request.json
    students.append(data)
    return jsonify({"message": "Student added successfully"})

@app.route("/view", methods=["GET"])
def view_students():
    return jsonify(students)

@app.route("/search/<sid>", methods=["GET"])
def search_student(sid):
    for s in students:
        if s["sid"] == sid:
            return jsonify(s)
    return jsonify({"error": "Student not found"})

@app.route("/update", methods=["PUT"])
def update_student():
    data = request.json
    for s in students:
        if s["sid"] == data["sid"]:
            s.update(data)
            return jsonify({"message": "Student updated"})
    return jsonify({"error": "Student not found"})

@app.route("/delete/<sid>", methods=["DELETE"])
def delete_student(sid):
    global students
    students = [s for s in students if s["sid"] != sid]
    return jsonify({"message": "Student deleted"})

if __name__ == "__main__":
    app.run(debug=True)
