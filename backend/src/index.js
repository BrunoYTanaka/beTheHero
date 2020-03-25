import express from 'express'
import cors from 'cors'
import Routes from './routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use(Routes)

app.listen(3333)
