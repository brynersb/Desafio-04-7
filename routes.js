const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const students = require ('./controllers/students')
const data = require('./data.json')


routes
    .get("/", function (req, res) {
        return res.redirect("/teachers/")
    })

//Routes Studats

    .get("/teachers/", teachers.index)

    .get("/teachers/create", teachers.create)

    .post("/teachers/", teachers.post)

    .get("/teachers/:id", teachers.show)

    .get("/teachers/:id/edit", teachers.edit)

    .put("/teachers", teachers.put)

    .delete("/teachers", teachers.delete)

// Rutes Studentes


    .get("/students/", students.index)

    .get("/students/create", students.create)

    .post("/students/", students.post)

    .get("/students/:id", students.show)

    .get("/students/:id/edit", students.edit)

    .put("/students", students.put)

    .delete("/students", students.delete)

// routes.use(function (req, res) {
//     res.status(404).render("not-found");
// });

module.exports = routes