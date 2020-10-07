module.exports = {

    age: function (timestamp) {

        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()

        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }

        return age
    },

    aula: function (aula_type) {

        let aula = ""

        if (aula_type == "distancia") {
            aula = "A Distancia "
        } else {
            aula = "Aula Presencial"
        }

        return aula

    },

    date: function (timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()

        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },

    grau: function (grau_type) {

        switch (grau_type) {
            case "medio":
                return "Ensino Médio completo";
            case "superior":
                return "Ensino Superior completo";
            case "mestre":
                return "Mestrado";
            case "dr":
                return "Doutorado";

            default:
                break;
        }

    },

    grade: function (schoolYear) {
        switch (schoolYear) {
            case '5EF': return "5º Ano Fundamental";
            case '6EF': return "6º Ano Fundamental";
            case '7EF': return "7º Ano Fundamental";
            case '8EF': return "8º Ano Fundamental";
            case '1EM': return "1º Ano Ensino Médio";
            case '2EM': return "2º Ano Ensino Médio";
            case '3EM': return "3º Ano Ensino Médio";

            default:
                break;

        }
    }
}

