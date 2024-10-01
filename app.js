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
    socket.on('labPayment',(patient)=>{
        console.log('new incoming patient '+ patient)

        io.emit('labPaymentFromServer',patient)
    })

    socket.on('newDoctorPatient',(patient)=>{
        console.log('new incoming patient '+ patient)

        io.emit('newDoctorPatientFromServer',patient)
    })

    socket.on('lab_request_confirm',(patient)=>{
        console.log( 'labrRquestConfirmFromServer '+ patient)

        io.emit('labrRquestConfirmFromServer',patient)
    })


    socket.on('resultAuthenticated',(patient)=>{
        console.log('resultAuthenticated for patient '+ patient)

        io.emit('authenticatedResult',patient)
    })
})

