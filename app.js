import { Socket } from 'engine.io'
import {Server} from 'socket.io'
const io = new Server(3000,{
    cors:{
        origin : ['http://localhost:5173']
    }
})
io.on('connection',(socket)=>{
    console.log('client connected successfully')
    socket.on('disconnect',()=>{
        console.log('client disconnected')
    })
    socket.on('newLabPatient',(patient)=>{
        console.log('new incoming patient '+ patient)

        io.emit('newLabPatientFromServer',patient)
    })


    socket.on('resultAuthenticated',(patient)=>{
        console.log('resultAuthenticated for patient '+ patient)

        io.emit('authenticatedResult',patient)
    })
})

