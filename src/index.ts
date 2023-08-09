import express from 'express';
import userController from './controllers/userController';
import sessionController from './controllers/sessionController'
import registerController from './controllers/registerController';
import authMiddleware from './middlewares/auth';

const app = express()

app.use(express.json())

app.post('/sessions', sessionController.store)

app.use(authMiddleware);

app.get('/users', userController.index)
app.post('/users', userController.store)

app.get('/registers', registerController.index)
app.post('/registers', registerController.store)


app.listen(3000, () => console.log('REST API server ready at: http://localhost:3000'))