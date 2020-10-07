const fs = require("fs")
const data = require("../data.json")
const { age, date, grade } = require("../utils")

//### functions Students =>

//index

exports.index = function (req, res) {

    const students = []

    for (let student of data.students) {

        students.push({
            ...student,
            school_year: grade(student.school_year)
        })
    }

    return res.render('students/index', { students })

    
}

//create

exports.create = function (req, res) {
    return res.render("./students/create")
}

//show
exports.show = function (req, res) {

    const { id } = req.params

    const foundStudent = data.students.find(function (student) {

        return id == student.id
    })

    if (!foundStudent) {
        return res.send("Professor não encontrado!")
    }

    const keys = Object.keys(req.body)

    const student = {
        ...foundStudent,
        school_year: grade(foundStudent.school_year),
        age: age(foundStudent.birth),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at)
    }

    return res.render("./students/show", { student })

}
//create
exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send(`Por favor preencha o campo: ${key}`)
        }
    }

    let { avatar_url, name, birth, school_year, email, workload, } = req.body



    birth = Date.parse(birth)

    const created_at = Date.now()

    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if (lastStudent) {
        id = lastStudent.id + 1
    }

    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        school_year,
        email,
        workload,
        created_at
    })


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

        if (err) return res.send("write file error!")

        return res.redirect("students")
    })
}

//edit
exports.edit = function (req, res) {

    const { id } = req.params

    const foundStudent = data.students.find(function (student) {

        return id == student.id
    })

    if (!foundStudent) {
        return res.send("Professor não encontrado!!")
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso,
    }


    return res.render("./students/edit", { student })
}

exports.put = function (req, res) {

    const { id } = req.body

    let index = 0

    const foundStudent = data.students.find(function (student, foundIndex) {

        if (id == student.id) {

            index = foundIndex
            return true
        }
    })

    if (!foundStudent) {
        return res.send("Professor não encontrado!!")
    }


    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)

    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

        if (err) return res.send("write file error!")

        return res.redirect(`/students/${id}`)
    })
}

//delete
exports.delete = function (req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter(function (student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

        if (err) return res.send("Write file Error!")

        return res.redirect("/students")
    })
}



