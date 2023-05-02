const express = require('express')
const {Sequelize} = require('sequelize')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')
const sequelize = db.sequelize
const userRoute = require('./routes/userRoutes')
const postRoute = require('./routes/postRoutes')
const app = express()
const port = process.env.DATABASE_PORT || 3001

// const sequelize = new Sequelize('testdb', 'root', "1234", {
//     dialect: 'mysql',
//     host: 'localhost',
//     logging: true,
// })

app.use(cors())
app.use(bodyParser.json())

//routes
app.use('/users', userRoute)
app.use('/posts', postRoute)



// console.log('sequelize o server \n =============================================================',sequelize)


async function test(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      // sequelize.sync({ force: true })
      //   .then(() => {
      //       console.log('Sync successfully');
      //   })
      //   .catch((err) => {
      //       console.log('Sync failed \n =======================================', err);
      //   })
}
test()
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
