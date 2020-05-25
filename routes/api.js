const router = require('express').Router();
const ApiController = require('../controller/ApiController');
const apiHandler = require('../middleware/apiHandler');

// VERSION 1
router.use(apiHandler);
router.get('/v1/landing-page', ApiController.landingPageData);
router.get('/v1/case-study', ApiController.caseStudyData);
router.get('/v1/case-study/:slug', ApiController.detailCaseStudy);
router.get('/v1/case-study/category/:category', ApiController.categoryCaseStudy);
router.get('/v1/playground', ApiController.playgroundData);
router.get('/v1/playground/category/:category', ApiController.categoryPlayground);
router.get('/v1/story', ApiController.storyData);
router.get('/v1/story/:slug', ApiController.detailStory);
router.get('/v1/story/category/:category', ApiController.categoryStory);

module.exports = router;
