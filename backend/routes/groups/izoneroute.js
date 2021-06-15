import express from 'express'
import { albums as izonealbums } from '../../data/izone.js'

const router = express.Router()
const icon = 'https://twibbon.blob.core.windows.net/twibbon/2018/246/26466e7d-24ee-4a39-96c8-2546db4d7c8d.png'

// READ

// Get all albums
router.get('/', (req, res) => res.render('izone.handlebars', {
    icon: icon,
    title: `IZ*ONE`,
    albums: izonealbums
}))

// Get each album
router.get('/:id', (req, res) => {
    const found = izonealbums.some(album => {
        return album.id === parseInt(req.params.id)
    })

    if(found) {
        res.status(200).render('izone.handlebars', {
            icon: icon,
            title: `Album ${req.params.id}`,
            albums: izonealbums.filter(album => {
                return album.id === parseInt(req.params.id)
            })
        })
    }
    if(!found) {
        res.status(404).render('404.handlebars', {
            returnlink: '/groups/izone',
            message: `Server responded 404 NOT FOUND`,
            description: `Album does not exists. Please check search ID or try again later.`
        })
    }
})

class Counter {
    constructor() {
        this.initial_count = izonealbums.length + 1
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
            returnlink: '/groups/izone',
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
                album.imgsrc = updateAlbum.imgsrc ? updateAlbum.imgsrc: album.imgsrc
            }

            res.status(200).render('izone.handlebars', {
                icon: icon,
                title: `Album ${req.params.id}`,
                albums: izonealbums.filter(album => {
                    return album.id === parseInt(req.params.id)
                })
            })
        })
    }
    if(!found) {
        res.status(404).render('404.handlebars', {
            returnlink: '/groups/izone',
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
            icon: icon,
            title: `Album ${req.params.id}`,
            albums: izonealbums.filter(album => {
                // Returns all albums except
                return album.id !== parseInt(req.params.id)
            })
        })
    }
    if(!found) {
        res.status(404).render('404.handlebars', {
            returnlink: '/groups/izone',
            message: `404 Not Found`,
            description: `Album does not exists. Please check search ID or try again later.`
        })
    }
})

export { router }