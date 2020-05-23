const router = require('express').Router();
const ApiController = require('../controller/ApiController');
const apiHandler = require('../middleware/apiHandler');

// VERSION 1
router.use(apiHandler);
router.get('/v1/landing-page', ApiController.landingPageData);

module.exports = router;
