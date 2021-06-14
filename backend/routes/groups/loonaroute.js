import express from 'express'
import * as uuid from 'uuid'
import { albums as loonaalbums } from '../../data/loona.js'
import { albums as albumtext} from '../../../main.js'

const router = express.Router()

// Get all albums
router.get('/', async(req, res) => res.render('loona.handlebars', {
    title: albumtext,
    albums: loonaalbums
}))


export { router }