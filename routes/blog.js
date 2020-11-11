const express = require('express')
const slugify = require('slugify')
const Post = require('../models/post')


const router = express.Router()

// delete view
router.post('/delete/:slug', async (req, res) => {
  const slug = req.params.slug;

  try {
    const post = await Post.findOneAndDelete({ slug: slug })

    res.redirect('/')
  } catch (e) {
    res.redirect('/')
  }
})

// edit view
router.get('/edit/:slug', async (req, res) => {
  const slug = req.params.slug;

  try {
    const post = await Post.findOne({ slug: slug })

    console.log(post)
    
    if (post) {
      res.render('edit', {
        post
      })
    }
    res.redirect('/')
  } catch (e) {
    console.log('erre')
    res.redirect('/')
  }

})

router.post('/edit/:slug', async (req, res) => {
  let { title, meta_desc, body, published=false } = req.body;
  let slug = req.params.slug

  try {
    let post = await Post.findOne({ slug: slug })

    post.title = title
    post.meta_desc = meta_desc
    post.body = body
    post.published = published === "on" ? true: false

    post = await post.save();
    res.redirect('/')
    }
    catch (e) {
      console.log(e)
      res.render('edit', {
        title: 'Edit',
        post
      })
  } 

})


// detail view
router.get('/detail/:slug', async (req, res) => {
  const slug = req.params.slug;

  try {
    const post = await Post.findOne({ slug: slug })

    res.render('detail', {
      title: post.title,
      post
    })
  } catch (e) {
    res.redirect('/')

  }
  
})

router.get('/', async (req, res, next) => {
  // query all posts
  const posts = await Post.find({ published: true }).sort({ date_posted: 'desc' })

  res.render('index', {
    title: 'Home',
    posts: posts
  })
})

router.route('/create')
  .get((req, res) => {
    res.render('create', {
      title: 'Create',
      post: {
        title: '',
        body: '',
        meta_desc: '',
        slug: '',
        published: false
      }
    })
  })
  .post(async (req, res) => {
    let { title, meta_desc, body, published=false } = req.body;
    let slug = slugify(title)
    
    // new document
    let post = new Post({
      title,
      body,
      meta_desc,
      slug,
      published: published === "on" ? true: false
    })

    try {
      post = await post.save();
      res.redirect('/')
    } catch (e) {
      console.log(e)
      res.render('create', {
        title: 'Create',
        post
      })
    }
    
  })

module.exports = router