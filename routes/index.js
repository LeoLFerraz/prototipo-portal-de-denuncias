const express = require('express');
const router = express.Router();

router.get('/', () => {
   res.marko(__dirname + '/views/index.marko', {
      "teste": "oi"
   })
});

module.exports = router;
