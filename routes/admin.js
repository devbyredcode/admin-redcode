const router = require('express').Router();
const AdminController = require('../controller/AdminController');
const { uploadCaseStudy, uploadStory, uploadPlayground, uploadOtherImage } = require('../middleware/imageHandler');
const auth = require('../middleware/authHandler');

router.use(auth);
router.get('/dashboard', AdminController.viewDashboard);
router.get('/users', AdminController.viewDataUser);
router.get('/users/add', AdminController.viewAddUser);
router.post('/users/add', AdminController.addDataUser);
router.get('/users/edit/:id', AdminController.viewEditUser);
router.put('/users/edit/:id', AdminController.updateDataUser);
router.delete('/users/delete/:id', AdminController.deleteDataUser);

router.get('/category', AdminController.viewDataCategory);
router.get('/category/add', AdminController.viewAddCategory);
router.post('/category/add', AdminController.addDataCategory);
router.get('/category/edit/:id', AdminController.viewEditCategory);
router.put('/category/edit/:id', AdminController.updateDataCategory);
router.delete('/category/delete/:id', AdminController.deleteDataCategory);

router.get('/case-study', AdminController.viewDataCaseStudy);
router.get('/case-study/add', AdminController.viewAddCaseStudy);
router.post('/case-study/add', AdminController.addDataCaseStudy);
router.get('/case-study/edit/:id', AdminController.viewEditCaseStudy);
router.put('/case-study/edit/:id', AdminController.editDataCaseStudy);
router.delete('/case-study/delete/:id', AdminController.deleteDataCaseStudy);

router.get('/story', AdminController.viewDataStory);
router.get('/story/add', AdminController.viewAddStory);
router.post('/story/add', AdminController.addDataStory);
router.get('/story/edit/:id', AdminController.viewEditStory);
router.put('/story/edit/:id', AdminController.editDataStory);
router.delete('/story/delete/:id', AdminController.deleteDataStory);

router.get('/playground', AdminController.viewDataPlayground);
router.get('/playground/add', AdminController.viewAddPlayground);
router.post('/playground/add',  AdminController.addDataPlayground);
router.get('/playground/edit/:id', AdminController.viewEditPlayground);
router.put('/playground/edit/:id',  AdminController.editDataPlayground);
router.delete('/playground/delete/:id', AdminController.deleteDataPlayground);

router.get('/image', AdminController.viewDataImage);
router.get('/image/add', AdminController.viewAddImage);
router.post('/image/add', AdminController.addDataImage);
router.delete('/image/delete/:id', AdminController.deleteDataImage);

module.exports = router;
