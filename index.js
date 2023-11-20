const express = require('express')
const app = express()

let notes = [  {    
    id: 1,    
    content: "HTML is easy, nice",    
    important: true  
},  
{    
    id: 2,    
    content: "Browser can execute only JavaScript",    
    important: false  
},  
{    
    id: 3,    
    content: "GET and POST are the most important methods of HTTP protocol",    
    important: true  
}]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/notes', (req, res) => {
    res.json(notes)
  })

  app.get('notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    response.json(note)
  })
  
  const PORT = 3002
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })