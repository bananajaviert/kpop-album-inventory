import express from 'express'
import * as uuid from 'uuid'
import moment from 'moment'
import { albums as izonealbums } from '../../data/izone.js'
import { albums as albumtext} from '../../../main.js'

const router = express.Router()

// READ

// Get all albums
router.get('/', async(req, res) => res.render('izone.handlebars', {
    title: albumtext,
    albums: izonealbums
}))

// Get each album
router.get('/:id', (req, res) => {
    const found = izonealbums.some(album => {
        return album.id === parseInt(req.params.id)
    })

    if(found) {
        res.status(200).render('izone.handlebars', {
            title: `Album ${req.params.id}`,
            albums: izonealbums.filter(album => {
                return album.id === parseInt(req.params.id)
            })
        })
    }
    if(!found) {
        res.status(404).render('404.handlebars', {
            message: `404 Not Found`,
            description: `Album does not exists. Please check search ID or try again later.`
        })
    }
})

class Counter {
    constructor() {
        this.initial_count = 9
    }
    count = () => {
        return this.initial_count++
    }
}

const counter = new Counter

// CREATE
router.post('/', (req, res) => {
    const newAlbum = {
        id: counter.initial_count,
        title: req.body.title,
        imgsrc: req.body.imgsrc,
        released_date: req.body.released_date,
        price: req.body.price
    }

    if(!newAlbum.title || !newAlbum.imgsrc || !newAlbum.price) {
        return res.status(400).render('error.handlebars', {
            title: `ERROR`,
            message: `Please enter title, image source, and price`
        })
    }

    counter.count()
    izonealbums.push(newAlbum)
    res.redirect('/groups/izone')
})

// UPDATE
router.put('/:id', (req, res) => {
    const found = izonealbums.some(album => {
        return album.id === parseInt(req.params.id)
    })

    if(found) {
        const updateAlbum = req.body

        izonealbums.forEach(album => {
            if(album.id === parseInt(req.params.id)) {
                album.title = updateAlbum.title? updateAlbum.title : album.title
                album.released_date = updateAlbum.released_date ? updateAlbum.released_date : album.released_date
                album.price = updateAlbum.price ? updateAlbum.price: album.price
            }

            res.status(200).render('izone.handlebars', {
                title: `Album ${req.params.id}`,
                albums: izonealbums.filter(album => {
                    return album.id === parseInt(req.params.id)
                })
            })
        })
    }
    if(!found) {
        res.status(404).render('404.handlebars', {
            message: `404 Not Found`,
            description: `Album does not exists. Please check search ID or try again later.`
        })
    }
})

// DELETE
router.delete('/:id', (req, res) => {
    const found = izonealbums.some(album => {
        return album.id === parseInt(req.params.id)
    })

    if(found) {
        res.status(200).render('izone.handlebars', {
            title: `Album ${req.params.id}`,
            albums: izonealbums.filter(album => {
                // Returns all albums except
                return album.id !== parseInt(req.params.id)
            })
        })
    }
    if(!found) {
        res.status(404).render('404.handlebars', {
            message: `404 Not Found`,
            description: `Album does not exists. Please check search ID or try again later.`
        })
    }
})

export { router }