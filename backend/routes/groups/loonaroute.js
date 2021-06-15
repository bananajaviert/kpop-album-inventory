import express from 'express'
import { albums as loonaalbums } from '../../data/loona.js'

const router = express.Router()

// Get all albums
router.get('/', (req, res) => res.render('loona.handlebars', {
    title: `LOONA`,
    albums: loonaalbums
}))

// Get single album as requested
router.get('/:id', (req, res) => {
    const found = loonaalbums.some(album => {
        return album.id === parseInt(req.params.id)
    })

    if(found) {
        res.status(200).render('loona.handlebars', {
            title: `Album ${req.params.id}`,
            albums: loonaalbums.filter(album => {
                return album.id === parseInt(req.params.id)
            })
        })
    }

    if(!found) {
        res.status(404).render('404.handlebars', {
            returnlink: `/groups/loona`,
            title: `Server responded 404 NOT FOUND`,
            message: `Album does not exists. Please check search ID or try again later.`
        })
    }
})

class Counter {
    constructor() {
        this.initial_count = loonaalbums.length + 1
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
            returnlink: '/groups/loona',
            title: `ERROR`,
            message: `Please enter title, image source, and price`
        })
    }

    loonaalbums.push(newAlbum)
    res.redirect('/groups/loona')
})

// UPDATE
router.put('/:id', (req, res) => {
    const found = loonaalbums.some(album => {
        return album.id === parseInt(req.params.id)
    })
    
    const updateAlbum = req.body

    loonaalbums.forEach(album => {
        if(album.id === parseInt(req.params.id)) {
            album.title = updateAlbum.title ? updateAlbum.title : album.title
            album.released_date = updateAlbum.released_date ? updateAlbum.released_date : album.released_date
            album.price = updateAlbum.price ? updateAlbum.price : album.price 
            album.imgsrc = updateAlbum.imgsrc ? updateAlbum.imgsrc : album.imgsrc
        }

        res.status(200).render('izone.handlebars', {
            title: `Album ${req.params.id}`,
            albums: loonaalbums.filter(album => {
                return album.id === parseInt(req.params.id)
            })
        })
    })

    if(!found) {
        res.status(404).render('404.handlebars', {
            returnlink: `/groups/loona`,
            title: `Server responded 404 NOT FOUND`,
            message: `Album does not exists. Please check search ID or try again later.`
        })
    }
})

// DELETE
router.delete('/:id', (req, res) => {
    const found = loonaalbums.some(album => {
        return album.id === parseInt(req.params.id)
    })

    if(found) {
        res.status(200).render('loona.handlebars', {
            title: `Album ${req.params.id}`,
            albums: loonaalbums.filter(album => {
                return album.id !== parseInt(req.params.id)
            })
        })
    }

    if(!found) {
        res.status(404).render('404.handlebars', {
            returnlink: `/groups/loona`,
            title: `Server responded 404 NOT FOUND`,
            message: `Album does not exists. Please check search ID or try again later.`
        })
    }
})

export { router }