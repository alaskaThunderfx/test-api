const express = require('express');
const router = express.Router();
const Post = require(`../models/posts`)

// Get all posts
router.get('/', async function (req, res, next) {
  // Stores all posts returned from the call
  const allPosts = await Post.find()

  // Helper function to filter through users' tags to make sure they match the ones in the url query
  let postFilter = (queries, userTags) => queries.every(tag => userTags.includes(tag))

  // Checks for tag (required parameter) in URL, if it does have tag, proceed
  if (req.query.tag) {
    // Empty array meant to store the filtered user results
    const filteredPosts = []
    // Array containing all the queries from the URL
    const tags = req.query.tag.split(',')

    // Filters the users by the tags from the URL and pushes users that pass the filter to the filteredPosts array
    allPosts[0].posts.forEach(post => {
      if (postFilter(tags, post.tags)) {
        filteredPosts.push(post)
      }
    })
    // Checks for the sortBy parameter in the URL, if there is one, then proceeds
    if (req.query.sortBy) {
      // Begins a switch case that uses the sortBy parameter to determine how data will be returned
      switch (req.query.sortBy) {
        // If the sortBy parameter is `id`
        case `id`:
          // Check if the direction parameter exists in the URL, if it does, then proceed
          if (req.query.direction) {
            // Begins a switch statement checking for which value is in the direction parameter
            switch (req.query.direction) {
              // If the value is `asc`, returns list in ascending order
              case `asc`:
                filteredPosts.sort(function (a, b) {
                  return a.id - b.id
                })
                res.status(200).send(filteredPosts)
                break
              // If the value is `desc`, returns list in descending order
              case `desc`:
                console.log(`in desc`)
                filteredPosts.sort(function (a, b) {
                  return b.id - a.id
                })
                res.status(200).send(filteredPosts)
                break
              // If the value is neither of these, return an error
              default:
                res.status(400).json({ error: `direction parameter is invalid.` })
                break
            }
          } else {
            // If there is no direction parameter, then returns the data in asccending order
            filteredPosts.sort(function (a, b) {
              return a.id - b.id
            })
            res.status(200).send(filteredPosts)
            break
          }
          break
        // If the sortBy parameter is `reads`
        case `reads`:
          // Check if the direction parameter exists in the URL, if it does, then proceed
          if (req.query.direction) {
            // Begins a switch statement checking for which value is in the direction parameter
            switch (req.query.direction) {
              // If the value is `asc`, returns list in ascending order
              case `asc`:
                filteredPosts.sort(function (a, b) {
                  return a.reads - b.reads
                })
                res.status(200).send(filteredPosts)
                break
              // If the value is `desc`, returns list in descending order
              case `desc`:
                filteredPosts.sort(function (a, b) {
                  return b.reads - a.reads
                })
                res.status(200).send(filteredPosts)
                break
              // If the value is neither of these, return an error
              default:
                res.status(400).json({ error: `direction parameter is invalid.` })
                break
            }
          } else {
            // If there is no direction parameter, then returns the data in asccending order
            filteredPosts.sort(function (a, b) {
              return a.id - b.id
            })
            res.status(200).send(filteredPosts)
            break
          }
          break
        // If sortBy parameter is `likes`
        case `likes`:
          // Check if the direction parameter exists in the URL, if it does, then proceed
          if (req.query.direction) {
            // Begins a switch statement checking for which value is in the direction parameter
            switch (req.query.direction) {
              // If the value is `asc`, returns list in ascending order
              case `asc`:
                filteredPosts.sort(function (a, b) {
                  return a.likes - b.likes
                })
                res.status(200).send(filteredPosts)
                break
              // If the value is `desc`, returns list in descending order
              case `desc`:
                filteredPosts.sort(function (a, b) {
                  return b.likes - a.likes
                })
                res.status(200).send(filteredPosts)
                break
              // If the value is neither of these, return an error
              default:
                res.status(400).json({ error: `direction parameter is invalid.` })
                break
            }
          } else {
            // If there is no direction parameter, then returns the data in asccending order
            filteredPosts.sort(function (a, b) {
              return a.id - b.id
            })
            res.status(200).send(filteredPosts)
            break
          }
          break
        // If sortBy parameter is `popularity`
        case `popularity`: 
          // Check if the direction parameter exists in the URL, if it does, then proceed
          if (req.query.direction) {
            // Begins a switch statement checking for which value is in the direction parameter
            switch (req.query.direction) {
              // If the value is `asc`, returns list in ascending order
              case `asc`:
                filteredPosts.sort(function (a, b) {
                  return a.popularity - b.popularity
                })
                res.status(200).send(filteredPosts)
                break
              // If the value is `desc`, returns list in descending order
              case `desc`:
                filteredPosts.sort(function (a, b) {
                  return b.popularity - a.popularity
                })
                res.status(200).send(filteredPosts)
                break
              // If the value is neither of these, return an error
              default:
                res.status(400).json({ error: `direction parameter is invalid.` })
                break
            }
          } else {
            // If there is no direction parameter, then returns the data in asccending order
            filteredPosts.sort(function (a, b) {
              return a.id - b.id
            })
            res.status(200).send(filteredPosts)
            break
          }
          break
        // If the sortBy parameter exists and the value is none of the accewpted options, return an error
        default:
          res.status(400).json({ error: `sortBy parameter is invalid.` })
          break
      }
    }
    // Return the data from the tags without a specific sorting method
    res.status(200).send(filteredPosts)
    return
  } else {
    res.status(400).json({ error: `Tag parameter is`})
    return
  }
});

// To add data to local database for testing
router.post(`/`, async function (req, res, next) {
  console.log(`post request coming in`)
  console.log(req.body)
  const post = new Post({
    posts: req.body.posts
  })
  try {
    const savedPost = await post.save()
    res.json(savedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

// router.get()

module.exports = router;
