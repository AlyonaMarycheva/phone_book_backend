const mongoose = require('mongoose')

const password =  process.argv[2]

const url = `mongodb+srv://fullstack:fullstack000@cluster0-alqcj.mongodb.net/phone-book?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema ({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
                
    const person = new Person ({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log('entry saved')
        mongoose.connection.close()
    })
}

else {
    Person.find({}).then(result => {
        result.forEach(person => console.log(person))
        mongoose.connection.close()
    })
}