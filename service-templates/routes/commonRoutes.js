const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/views/:templateName', (req, res) => {
  const templateName = req.params.templateName;
  res.render(templateName, { user: req.user });
});



module.exports = router;