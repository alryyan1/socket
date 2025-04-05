import { Socket } from 'engine.io'
import { Server } from 'socket.io'
import { connection, handleCbc } from './lis.js'
const io = new Server(3000, {
    cors: {
        origin: ['http://192.168.137.1:5173','http://localhost:5173']
        // origin : ['http://localhost:5173','http://192.168.1.5:8080']
    }
})
io.on('connection', (socket) => {
    console.log('client connected successfully')
    socket.on('disconnect', () => {
        console.log('client disconnected')
    })
    socket.on('cbc', (data) => {
        console.log('cbc data',data)
        handleCbc(data,connection)
    })
    socket.on('labPayment', (patient) => {
        console.log('labPaymentFromServer ' + patient)

        io.emit('labPaymentFromServer', patient)
    })
    socket.on('patientUpdated', (patient) => {
        console.log('patientUpdated ' + patient)

        io.emit('patientUpdatedFromServer', patient)
    })
    socket.on('newDoctorPatient', (patient) => {
        console.log('new incoming patient ' + patient.patient.name)

        io.emit('newDoctorPatientFromServer', patient)
    })

    socket.on('newShift', () => {
        console.log('new incoming shift ' )

        io.emit('newShiftOpenedFromServer')
    })
    socket.on('lab_request_confirm', (patient) => {
        console.log('labrRquestConfirmFromServer ' + patient)

        io.emit('labrRquestConfirmFromServer', patient)
    })


    socket.on('resultAuthenticated', (patient) => {
        console.log('resultAuthenticated for patient ' + patient)

        io.emit('authenticatedResult', patient)
    })


    //flutter
    socket.on('msg', () => {
        console.log('message from flutter ' )

        io.emit('flutter', 'msg from pc')
    })
    socket.on('new deduct', (data) => {
       

        io.emit('new deduct recieved', JSON.parse(data))
    })
    socket.on('update deduct', (data) => {
       

        io.emit('update deduct recieved', JSON.parse(data))
    })
})

