const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(err => {
    logger.error('Database Connection Error: ', err)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const newNote = new Note({
	content: 'HTML is easy',
	important: false
})

newNote.save()
  .then(() => {
		console.log('saved successfully')
		mongoose.connection.close()
	})
	.catch((err) => {
		console.log('Error saving the note', err)
	})
