import { Socket } from 'engine.io'
import {Server} from 'socket.io'
const io = new Server(3000,{
    cors:{
        origin : ['http://localhost:5173']
    }
})
io.on('connection',(socket)=>{
    console.log('client connected successfully')
    socket.emit('hello','data sent to client with 123')
    socket.on('doc-data',(data)=>{
        console.log(data)
    })
    socket.on('resultAuthenticated',(patient)=>{
        console.log('resultAuthenticated for patient '+ patient)

        io.emit('authenticatedResult',patient)
    })
})

