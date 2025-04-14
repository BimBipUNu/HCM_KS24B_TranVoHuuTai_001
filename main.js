let students = [
    {
        name: "Trần Minh Cường",
        id: "SV001",
        email: "cuongtm@gmail.com",
        classes: "HN_ENG_KS24A"
    },
    {
        name: "Trần Võ Hữu Tài",
        id: "SV002",
        email: "trantai180506@gmail.com",
        classes: "HCM_KS24B"
    },
    {
        name: "Phan Trung Kiên",
        id: "SV003",
        email: "kienphan@gmail.com",
        classes: "HCM_KS24B"
    },
]
let tbody = document.getElementById("tbody")
let formAddNewStudent = document.getElementById("addNewStudent-form")
const updateStudent = document.getElementById("updateStudent")
let keyWord = ""

const renderStudentsList = () => {
    students = students.filter((stu) => stu.name.toLocaleLowerCase().includes(keyWord))
    let html = ""
    tbody.innerHTML="";
    students.forEach((student, index) => {
        html += `<tr>
                <td scope="col">${student.name}</td>
                <td scope="col">${student.id}</td>
                <td scope="col">${student.email}</td>
                <td scope="col">${student.classes}</td>
                <td scope="col" class="border border-end-0" onclick="handleEditStudent('${student.id}')" data-bs-toggle="modal" data-bs-target="#editModal"><button type="button" class="btn btn-success">Sửa</button></td>
                <td scope="col" class="border border-start-0"><button type="button" onclick="deleteStudent('${student.id}')" class="btn btn-danger">Xóa</button></td>
              </tr>`
    })
    tbody.innerHTML = html
}
renderStudentsList()

const getData = () => {
    let name = document.getElementById("name").value.trim()
    let id = document.getElementById("id").value.trim()
    let email = document.getElementById("email").value.trim()
    let classes = document.getElementById("class").value.trim()

    let flag = true;
    //name
    if (name.trim() == "") {
        document.getElementById("errorName").innerText = "Họ và tên không được để trống";
        flag = false;
    }else {
        document.getElementById("errorName").innerText = "";
    }
    //id
    if (id.trim() == "") {
        document.getElementById("errorId").innerText = "Mã sinh viên không được để trống";
        flag = false;
    } else if (students.some(stu => stu.id === id)) {
        document.getElementById("errorId").innerText = "Mã sinh viên đã tồn tại, vui lòng nhập id khác";
        flag = false;
    } else {
        document.getElementById("errorId").innerText = "";
    }
    //email
    if (email.trim() == "") {
        document.getElementById("errorEmail").innerText = "Email không được để trống";
        flag = false;
    }else {
        document.getElementById("errorEmail").innerText = "";
    }
    //class
    if (classes.trim() == "") {
        document.getElementById("errorClass").innerText = "Lớp không được để trống";
        flag = false;
    }else {
        document.getElementById("errorClass").innerText = "";
    }

    return flag ? {name, id, email, classes} : null;
}

const addNewStudent = () => {
    let data = getData()
    if(data) {
        students.push(data);
        renderStudentsList();

        document.getElementById("name").value = ""
        document.getElementById("id").value = ""
        document.getElementById("email").value = ""
        document.getElementById("class").value = ""
    }
}

const handleEditStudent = (id) => {
    let student = students.find((stu) => stu.id === id);
    if (student) {
        document.getElementById("name-edit").value = student.name;
        document.getElementById("id-edit").value = student.id;
        document.getElementById("email-edit").value = student.email;
        document.getElementById("class-edit").value = student.classes;
    }
};

updateStudent.addEventListener("click", function(e){
    e.preventDefault();

    let name = document.getElementById("name-edit").value.trim()
    let id = document.getElementById("id-edit").value.trim()
    let email = document.getElementById("email-edit").value.trim()
    let classes = document.getElementById("class-edit").value.trim()

    //validate edit form
    let flag = true;
    //name
    if (name.trim() == "") {
        document.getElementById("errorName-edit").innerText = "Họ và tên không được để trống";
        flag = false;
    }else {
        document.getElementById("errorName-edit").innerText = "";
    }
    //email
    if (email.trim() == "") {
        document.getElementById("errorEmail-edit").innerText = "Email không được để trống";
        flag = false;
    }else {
        document.getElementById("errorEmail-edit").innerText = "";
    }
    //class
    if (classes.trim() == "") {
        document.getElementById("errorClass-edit").innerText = "Lớp không được để trống";
        flag = false;
    }else {
        document.getElementById("errorClass-edit").innerText = "";
    }

    let updatedStu
    if (flag) {
        updatedStu = {name, id, email, classes}

        students = students.map((stu) => (stu.id === id ? updatedStu : stu));
        renderStudentsList();

        let myModal = document.getElementById('editModal');
        let modal = bootstrap.Modal.getInstance(myModal)
        modal.hide();

        document.getElementById("errorName-edit").innerText = "";
        document.getElementById("errorEmail-edit").innerText = "";
        document.getElementById("errorClass-edit").innerText = "";
    } else {
        updatedStu = null
    }
})

const deleteStudent =(id) => {
    if(confirm("Xác nhận xóa sinh viên")) {
        students = students.filter((stu) => stu.id !== id)
        renderStudentsList();
    }
}
// //tim kiem
// const searchStudent= () => {
//     students = students.filter((stu) => stu.name.toLocaleLowerCase().includes(keyWord))
//     renderStudentsList();
// }
// document.getElementById("formSearch").addEventListener("keydown", function (e) {
//     if (e.key === "Enter"){
//         e.preventDefault();
//         keyWord = document.getElementById("keyWord").value.toLocaleLowerCase()
//         searchStudent()
//     }
// });
//tim kiem
document.getElementById("formSearch").addEventListener("keydown", function (e) {
    if (e.key === "Enter"){
        e.preventDefault();
        keyWord = document.getElementById("keyWord").value.toLocaleLowerCase()
        renderStudentsList()
    }
});
