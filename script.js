// script.js

// Data Structures
let students = JSON.parse(localStorage.getItem("students")) || [];
let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
let courses = JSON.parse(localStorage.getItem("courses")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

// Helper Functions
function saveToLocalStorage() {
	localStorage.setItem("students", JSON.stringify(students));
	localStorage.setItem("teachers", JSON.stringify(teachers));
	localStorage.setItem("courses", JSON.stringify(courses));
	localStorage.setItem("attendance", JSON.stringify(attendance));
}

function populateCoursesDropdown(selectElement) {
	selectElement.innerHTML = "";
	const activeCourses = courses.filter((c) => c.status === "active");
	activeCourses.forEach((course) => {
		const option = document.createElement("option");
		option.value = course.name;
		option.textContent = course.name;
		selectElement.appendChild(option);
	});
}

function populateTeachersDropdown(selectElement) {
	selectElement.innerHTML = "";
	const activeTeachers = teachers.filter((t) => t.status === "active");
	activeTeachers.forEach((teacher) => {
		const option = document.createElement("option");
		option.value = teacher.name;
		option.textContent = teacher.name;
		selectElement.appendChild(option);
	});
}

// Students Page Logic
if (window.location.pathname.endsWith("students.html")) {
	const studentForm = document.getElementById("student-form");
	const studentsTable = document.getElementById("students-table");
	const totalStudents = document.getElementById("total-students");
	const activeStudents = document.getElementById("active-students");
	const inactiveStudents = document.getElementById("inactive-students");
	const graduatedStudents = document.getElementById("graduated-students");
	const submitBtn = document.getElementById("submit-btn");
	const cancelEdit = document.getElementById("cancel-edit");
	const courseSelect = document.getElementById("course");

	let editIndex = -1;

	function renderStudents() {
		studentsTable.innerHTML = "";
		students.forEach((student, index) => {
			const row = document.createElement("tr");
			row.innerHTML = `
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.course}</td>
                <td>${student.dob}</td>
                <td>${student.status}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editStudent(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
			studentsTable.appendChild(row);
		});

		totalStudents.textContent = students.length;
		activeStudents.textContent = students.filter(
			(s) => s.status === "active"
		).length;
		inactiveStudents.textContent = students.filter(
			(s) => s.status === "inactive"
		).length;
		graduatedStudents.textContent = students.filter(
			(s) => s.status === "graduated"
		).length;
	}

	function resetForm() {
		studentForm.reset();
		submitBtn.textContent = "Add Student";
		cancelEdit.style.display = "none";
		editIndex = -1;
	}

	studentForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const student = {
			rollNo: document.getElementById("roll-no").value,
			name: document.getElementById("name").value,
			email: document.getElementById("email").value,
			phone: document.getElementById("phone").value,
			course: courseSelect.value,
			dob: document.getElementById("dob").value,
			status: document.getElementById("status").value,
		};

		if (editIndex >= 0) {
			students[editIndex] = student;
		} else {
			students.push(student);
		}

		saveToLocalStorage();
		renderStudents();
		resetForm();
	});

	cancelEdit.addEventListener("click", resetForm);

	window.editStudent = function (index) {
		const student = students[index];
		document.getElementById("roll-no").value = student.rollNo;
		document.getElementById("name").value = student.name;
		document.getElementById("email").value = student.email;
		document.getElementById("phone").value = student.phone;
		courseSelect.value = student.course;
		document.getElementById("dob").value = student.dob;
		document.getElementById("status").value = student.status;

		editIndex = index;
		submitBtn.textContent = "Update Student";
		cancelEdit.style.display = "inline";
	};

	window.deleteStudent = function (index) {
		students.splice(index, 1);
		saveToLocalStorage();
		renderStudents();
	};

	populateCoursesDropdown(courseSelect);
	renderStudents();
}

// Teachers Page Logic
if (window.location.pathname.endsWith("teachers.html")) {
	const teacherForm = document.getElementById("teacher-form");
	const teachersTable = document.getElementById("teachers-table");
	const totalTeachers = document.getElementById("total-teachers");
	const activeTeachers = document.getElementById("active-teachers");
	const inactiveTeachers = document.getElementById("inactive-teachers");
	const retiredTeachers = document.getElementById("retired-teachers");
	const submitBtn = document.getElementById("teacher-submit-btn");
	const cancelEdit = document.getElementById("teacher-cancel-edit");

	let editIndex = -1;

	function renderTeachers() {
		teachersTable.innerHTML = "";
		teachers.forEach((teacher, index) => {
			const row = document.createElement("tr");
			row.innerHTML = `
                <td>${teacher.id}</td>
                <td>${teacher.name}</td>
                <td>${teacher.email}</td>
                <td>${teacher.status}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editTeacher(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTeacher(${index})">Delete</button>
                </td>
            `;
			teachersTable.appendChild(row);
		});

		totalTeachers.textContent = teachers.length;
		activeTeachers.textContent = teachers.filter(
			(t) => t.status === "active"
		).length;
		inactiveTeachers.textContent = teachers.filter(
			(t) => t.status === "inactive"
		).length;
		retiredTeachers.textContent = teachers.filter(
			(t) => t.status === "retired"
		).length;
	}

	function resetForm() {
		teacherForm.reset();
		submitBtn.textContent = "Add Teacher";
		cancelEdit.style.display = "none";
		editIndex = -1;
	}

	teacherForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const teacher = {
			id: document.getElementById("teacher-id").value,
			name: document.getElementById("teacher-name").value,
			email: document.getElementById("teacher-email").value,
			status: document.getElementById("teacher-status").value,
		};

		if (editIndex >= 0) {
			teachers[editIndex] = teacher;
		} else {
			teachers.push(teacher);
		}

		saveToLocalStorage();
		renderTeachers();
		resetForm();
	});

	cancelEdit.addEventListener("click", resetForm);

	window.editTeacher = function (index) {
		const teacher = teachers[index];
		document.getElementById("teacher-id").value = teacher.id;
		document.getElementById("teacher-name").value = teacher.name;
		document.getElementById("teacher-email").value = teacher.email;
		document.getElementById("teacher-status").value = teacher.status;

		editIndex = index;
		submitBtn.textContent = "Update Teacher";
		cancelEdit.style.display = "inline";
	};

	window.deleteTeacher = function (index) {
		teachers.splice(index, 1);
		saveToLocalStorage();
		renderTeachers();
	};

	renderTeachers();
}

// Courses Page Logic
if (window.location.pathname.endsWith("courses.html")) {
	const courseForm = document.getElementById("course-form");
	const coursesTable = document.getElementById("courses-table");
	const totalCourses = document.getElementById("total-courses");
	const activeCourses = document.getElementById("active-courses");
	const inactiveCourses = document.getElementById("inactive-courses");
	const completedCourses = document.getElementById("completed-courses");
	const submitBtn = document.getElementById("course-submit-btn");
	const cancelEdit = document.getElementById("course-cancel-edit");
	const instructorSelect = document.getElementById("instructor");

	let editIndex = -1;

	function renderCourses() {
		coursesTable.innerHTML = "";
		courses.forEach((course, index) => {
			const row = document.createElement("tr");
			row.innerHTML = `
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.instructor}</td>
                <td>${course.status}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editCourse(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCourse(${index})">Delete</button>
                </td>
            `;
			coursesTable.appendChild(row);
		});

		totalCourses.textContent = courses.length;
		activeCourses.textContent = courses.filter(
			(c) => c.status === "active"
		).length;
		inactiveCourses.textContent = courses.filter(
			(c) => c.status === "inactive"
		).length;
		completedCourses.textContent = courses.filter(
			(c) => c.status === "completed"
		).length;
	}

	function resetForm() {
		courseForm.reset();
		submitBtn.textContent = "Add Course";
		cancelEdit.style.display = "none";
		editIndex = -1;
	}

	courseForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const course = {
			id: document.getElementById("course-id").value,
			name: document.getElementById("course-name").value,
			instructor: instructorSelect.value,
			status: document.getElementById("course-status").value,
		};

		if (editIndex >= 0) {
			courses[editIndex] = course;
		} else {
			courses.push(course);
		}

		saveToLocalStorage();
		renderCourses();
		resetForm();
	});

	cancelEdit.addEventListener("click", resetForm);

	window.editCourse = function (index) {
		const course = courses[index];
		document.getElementById("course-id").value = course.id;
		document.getElementById("course-name").value = course.name;
		instructorSelect.value = course.instructor;
		document.getElementById("course-status").value = course.status;

		editIndex = index;
		submitBtn.textContent = "Update Course";
		cancelEdit.style.display = "inline";
	};

	window.deleteCourse = function (index) {
		courses.splice(index, 1);
		saveToLocalStorage();
		renderCourses();
	};

	populateTeachersDropdown(instructorSelect);
	renderCourses();
}

// Attendance Page Logic
if (window.location.pathname.endsWith("attendance.html")) {
	const attendanceDate = document.getElementById("attendance-date");
	const attendanceTable = document.getElementById("attendance-table");
	const todaysAttendanceTable = document.getElementById(
		"todays-attendance-table"
	);
	const saveBtn = document.getElementById("save-attendance");

	let currentAttendance = [];

	function getTodayDate() {
		const today = new Date();
		return today.toISOString().split("T")[0]; // YYYY-MM-DD format
	}

	function renderAttendanceTable() {
		attendanceTable.innerHTML = "";
		students.forEach((student) => {
			const row = document.createElement("tr");
			row.innerHTML = `
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="markPresent('${student.rollNo}')">Mark Present</button>
                    <button class="btn btn-sm btn-danger" onclick="markAbsent('${student.rollNo}')">Mark Absent</button>
                    <span id="status-${student.rollNo}"></span>
                </td>
            `;
			attendanceTable.appendChild(row);
		});
	}

	function renderTodaysAttendance() {
		const today = getTodayDate();
		const todaysRecords = attendance[today] || [];
		todaysAttendanceTable.innerHTML = "";
		students.forEach((student) => {
			const record = todaysRecords.find(
				(r) => r.rollNo === student.rollNo
			);
			const status = record
				? record.present
					? "Present"
					: "Absent"
				: "Not Marked";
			const row = document.createElement("tr");
			row.innerHTML = `
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>${status}</td>
            `;
			todaysAttendanceTable.appendChild(row);
		});
	}

	attendanceDate.addEventListener("change", () => {
		const date = attendanceDate.value;
		currentAttendance =
			attendance[date] ||
			students.map((s) => ({ rollNo: s.rollNo, present: null }));
		renderAttendanceTable();
		updateStatuses();
	});

	function updateStatuses() {
		currentAttendance.forEach((record) => {
			const statusSpan = document.getElementById(
				`status-${record.rollNo}`
			);
			if (statusSpan) {
				statusSpan.textContent =
					record.present === true
						? " (Present)"
						: record.present === false
						? " (Absent)"
						: "";
			}
		});
	}

	window.markPresent = function (rollNo) {
		const record = currentAttendance.find((r) => r.rollNo === rollNo);
		if (record) record.present = true;
		updateStatuses();
	};

	window.markAbsent = function (rollNo) {
		const record = currentAttendance.find((r) => r.rollNo === rollNo);
		if (record) record.present = false;
		updateStatuses();
	};

	saveBtn.addEventListener("click", () => {
		const date = attendanceDate.value;
		if (date) {
			attendance[date] = currentAttendance;
			saveToLocalStorage();
			alert("Attendance saved!");
			renderTodaysAttendance(); // Update today's table if the saved date is today
		} else {
			alert("Please select a date.");
		}
	});

	// Initial render
	renderAttendanceTable();
	renderTodaysAttendance();
}
