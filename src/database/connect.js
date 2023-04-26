const mongoose = require('mongoose');


const connectToDatabase = async () => {

    console.log(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cursonodejs.s3hwkba.mongodb.net/?retryWrites=true&w=majority`)
    
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cursonodejs.s3hwkba.mongodb.net/?retryWrites=true&w=majority`, 
    (error) => {
        if(error)
            console.log('Ocorreu um erro ao se conectar com o banco de dados');
    });

    return console.log('Conexao bem-sucedida!');

}

module.exports = connectToDatabase;