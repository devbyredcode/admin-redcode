const bcrypt = require('bcrypt');
const User = require('../model/User');
const Category = require('../model/Category');
const CaseStudy = require('../model/CaseStudy');
const Story = require('../model/Story');
const Playground = require('../model/Playground');
const Image = require('../model/Image');
const fs = require('fs-extra');
const path = require('path');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    
    viewDashboard : async (req, res) => {
        const countImage = await Image.countDocuments();
        const countUser = await User.countDocuments();
        const countCategory = await Category.countDocuments();
        const countCaseStudy = await CaseStudy.countDocuments();
        const countStory = await Story.countDocuments();
        const countPlayground = await Playground.countDocuments();
        
        const data = [
            { name : 'IMAGE', total : countImage },
            { name : 'USER', total : countUser },
            { name : 'CATEGORY', total : countCategory },
            { name : 'CASE STUDY', total : countCaseStudy },
            { name : 'STORY', total : countStory },
            { name : 'PLAYGROUND', total : countPlayground },            
        ]

        res.render('admin/dashboard/index', {
            title : 'Admin | Dashboard',
            page_name : 'Dashboard',
            data
        });
    },

    // CATEGORY FUNCTION
    viewDataCategory : async (req, res) => {
        try {
            const data = await Category.find();

            const alertMessage = req.flash('alert_message');
            const alertStatus = req.flash('alert_status');
            const alert = {
                message: alertMessage,
                status : alertStatus
            };
    
            res.render('admin/dashboard/category/', {
                title : 'Admin | Category',
                page_name : 'Category',
                alert,
                data
            });
        } catch (err) {
            
        }
    },

    viewAddCategory : (req, res) => {
        res.render('admin/dashboard/category/add', {
            title : 'Admin | Category',
            page_name : 'Category'
        });
    },

    addDataCategory : async (req, res) => {
        try {
            const {
                input_category_name,
                input_category_type
            } = req.body;

            await Category.create({
                name : netralizeInput(input_category_name),
                type : input_category_type
            });

            showNotification(req, "Success Add Category", "success");
            res.redirect('/admin/category');
        } catch (err) {
            showNotification(req, `Error ${err.message}`, "danger");
            res.redirect('/admin/category');
        }
    },

    viewEditCategory : async (req, res) => {
        try {
            const { id } = req.params;

            const data = await Category.findOne({ _id : id });
            res.render('admin/dashboard/category/edit', {
                title : 'Admin | Category',
                page_name : 'Category',
                data
            });
        } catch (err) {
            showNotification(req, `Error ${err.message}`, "danger");
            res.redirect('/admin/category');
        }
    },
    
    updateDataCategory : async (req, res) => {
        try {
            const { id } = req.params;
            const {
                input_category_name,
                input_category_type
            } = req.body;

            const data = await Category.findOne({ _id : id });
            data.name = input_category_name,
            data.type = input_category_type,
            data.save();

            showNotification(req, 'Success Update Category', 'success');
            res.redirect('/admin/category');
        } catch (err) {
            showNotification(req, 'Failed Update Category', 'danger');
            res.redirect('/admin/category');
        }
    },

    deleteDataCategory : async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Category.findOne({ _id : id });

            await data.remove();
            showNotification(req, "Success Delete Category", "success");
            res.redirect('/admin/category');
        } catch (err) {
            showNotification(req, "Gagal Delete Category", "danger");
            res.redirect('/admin/category');
        }
    },
    // CATEGORY FUNCTION

    // USER FUNCTION
    viewDataUser : async (req, res) => {
        try{
            const data = await User.find();

            const alertMessage = req.flash('alert_message');
            const alertStatus = req.flash('alert_status');
            const alert = {
                message: alertMessage,
                status : alertStatus
            };
    
            res.render('admin/dashboard/users/', {
                title : 'Admin | Users',
                page_name : 'Users',
                data,
                alert
            });
        } catch (err) {
            console.log(err);
        }
    },

    viewAddUser : (req, res) => {
        res.render('admin/dashboard/users/add', {
            title : 'Admin | Users',
            page_name : 'Users'
        });
    },

    addDataUser : async (req, res) => {
        try {
            const {
                input_first_name,
                input_last_name,
                input_username,
                input_password,
                input_roles
            } = req.body;
    
            await User.create({
                firstname : input_first_name,
                lastname : input_last_name,
                username : input_username,
                password : bcrypt.hashSync(input_password, salt),
                roles : input_roles
            });
            
            showNotification(req, "Success Add User", "success");
            res.redirect('/admin/users');
        } catch (err) {
            console.error(err)
            res.redirect('/admin/users');
        }
    },

    viewEditUser : async (req, res) => {
        try {
            const { id } = req.params;
            const data = await User.findOne({_id : id});
            
            res.render('admin/dashboard/users/edit', {
                title : 'Admin | Users',
                page_name : 'Users',
                data
            });
        } catch (err) {
            console.log(err);
        }
    },

    updateDataUser : async (req, res) => {
        try {
            const { id } = req.params;
            const { 
                input_first_name,
                input_last_name,
                input_username,
                input_roles
            } = req.body;

            const data = await User.findOne({_id : id});

            data.firstname = input_first_name,
            data.lastname = input_last_name,
            data.username = input_username,
            data.roles = input_roles
            data.save();

            showNotification(req, `Sukses Mengubah Data ${input_username}`, 'success');
            res.redirect('/admin/users');
        } catch (err) {
            showNotification(req, `Gagal Mengubah Data ${err.message}`, 'danger');
            res.redirect('/admin/users');
        }
    },

    deleteDataUser : async (req, res) => {
        try {
            const { id } = req.params;
            const data = await User.findOne({ _id : id });

            await data.remove();
            showNotification(req, "Success Delete User", "success");
            res.redirect('/admin/users');
        } catch (err) {
            showNotification(req, "Gagal Delete User", "danger");
            res.redirect('/admin/users');
        }
    },
    // USER FUNCTION
    
    // CASE STUDY FUNCTION
    viewDataCaseStudy : async (req, res) => {
        const data = await CaseStudy.find();
        const alertMessage = req.flash('alert_message');
        const alertStatus = req.flash('alert_status');
        const alert = {
            message: alertMessage,
            status : alertStatus
        };

        res.render('admin/dashboard/case-study/', {
            title : 'Admin | Case Study',
            page_name : 'Case Study',
            alert,
            data
        });
    },

    viewAddCaseStudy : async (req, res) => {
        const category = await Category.find({ type: 'Case Study'});

        res.render('admin/dashboard/case-study/add', {
            title : 'Admin | Case Study',
            page_name : 'Case Study',
            category
        });
    },

    addDataCaseStudy : async (req, res) => {
        try {
            const {
                input_title,
                input_subtitle,
                input_client,
                input_category,
                input_client_problem,
                input_client_brief,
                input_our_solution,
                input_our_result
            } = req.body;
    
            const input_image = req.file.filename;
    
            await CaseStudy.create({
                image : input_image,
                client : input_client,
                category : input_category,
                title : netralizeInput(input_title),
                slug: slugGenerator(input_title),
                subtitle : netralizeInput(input_subtitle),
                client_brief : input_client_brief,
                client_problem : input_client_problem,
                our_solution : input_our_solution,
                our_result : input_our_result
            });
    
            showNotification(req, "Success Add Case Study", "success");
            res.redirect('/admin/case-study');
        } catch (err) {
            showNotification(req, "Error Add Case Study", "danger");
            res.redirect('/admin/case-study');
        }        
    },

    viewEditCaseStudy : async (req, res) => {
        const { id } = req.params;
        const data = await CaseStudy.findOne({ _id : id });
        const category = await Category.find({ type: 'Case Study'});

        res.render('admin/dashboard/case-study/edit', {
            title : 'Admin | Case Study',
            page_name : 'Case Study',
            data,
            category
        });
    },

    editDataCaseStudy : async (req, res) => {
        try {
            const { id } = req.params;
            const {
                input_title,
                input_subtitle,
                input_client,
                input_category,
                input_client_problem,
                input_client_brief,
                input_our_solution,
                input_our_result
            } = req.body;

            const data = await CaseStudy.findOne({ _id : id });   
            if(req.file != null){
                await fs.unlink(path.join(`public/img/upload/case-study/${data.image}`));
                data.image = req.file.filename;
            }
            
            data.title = netralizeInput(input_title),
            data.slug = slugGenerator(input_title),
            data.subtitle = netralizeInput(input_subtitle),
            data.client = input_client,
            data.category = input_category,
            data.client_problem = input_client_problem,
            data.client_brief = input_client_brief,
            data.our_solution = input_our_solution,
            data.our_result = input_our_result
            data.save();

            showNotification(req, "Success Update Case Study", "success");
            res.redirect('/admin/case-study');
        } catch (err) {
            console.log('ERROR KESINI');
            showNotification(req, `Failed Update Case Study ${err.message}`, "danger");
            res.redirect('/admin/case-study');
        }
    },

    deleteDataCaseStudy : async (req, res) => {
        const { id } = req.params;
        const data = await CaseStudy.findOne({ _id : id });

        await fs.unlink(path.join(`public/img/upload/case-study/${data.image}`));
        await data.remove();
        
        showNotification(req, "Success Delete Case Study", "success");
        res.redirect('/admin/case-study');
    },
    // CASE STUDY FUNCTION
    
    // STORY FUNCTION
    viewDataStory : async (req, res) => {
        const alertMessage = req.flash('alert_message');
        const alertStatus = req.flash('alert_status');
        const alert = {
            message: alertMessage,
            status : alertStatus
        };

        const data = await Story.find();

        res.render('admin/dashboard/story', {
            title : 'Admin | Story',
            page_name : 'Story',
            alert,
            data
        });
    },

    viewAddStory : async (req, res) => {
        const category = await Category.find({ type: 'Story'});
        res.render('admin/dashboard/story/add', {
            title : 'Admin | Story',
            page_name : 'Story',
            category
        });
    },

    addDataStory : async (req, res) => {
        const {
            input_author,
            input_title,
            input_category,
            input_detail
        } = req.body;

        const input_image = req.file.filename;

        await Story.create({
            image : input_image,
            author : input_author,
            title : netralizeInput(input_title),
            slug: slugGenerator(input_title),
            category : input_category,
            detail : input_detail
        });

        showNotification(req, "Success Add Story", "success");
        res.redirect('/admin/story');
    },

    viewEditStory : async (req, res) => {
        const { id } = req.params;
        const data = await Story.findOne({ _id : id });
        const category = await Category.find({ type: 'Story'});

        res.render('admin/dashboard/story/edit', {
            title : 'Admin | Story',
            page_name : 'Story',
            data,
            category
        });
    },

    editDataStory : async (req, res) => {
        try {
            const { id } = req.params;
            const {
                input_author,
                input_title,
                input_category,
                input_detail
            } = req.body;

            const data = await Story.findOne({ _id : id });
            if(req.file != null){
                await fs.unlink(path.join(`public/img/upload/story/${data.image}`));
                data.image = req.file.filename;
            }
            data.author = input_author
            data.title = netralizeInput(input_title),
            data.slug = slugGenerator(input_title),
            data.category = input_category,
            data.detail = input_detail
            data.save();

            showNotification(req, "Success Edit Story", "success");
            res.redirect('/admin/story');
        } catch (err) {
            showNotification(req, `ailed Edit Story ${err.message}`, "success");
            res.redirect('/admin/story');
        }
    },

    deleteDataStory : async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Story.findOne({ _id : id });
            
            fs.unlink(path.join(`public/img/upload/story/${data.image}`));
            data.remove();
    
            showNotification(req, "Success Delete Story", "success");
            res.redirect('/admin/story');
        } catch (err) {
            showNotification(req, `Failed Delete Story ${err.message}`, "success");
            res.redirect('/admin/story');
        }
    },

    viewDataPlayground : async (req, res) => {
        const alertMessage = req.flash('alert_message');
        const alertStatus = req.flash('alert_status');
        const alert = {
            message: alertMessage,
            status : alertStatus
        };

        const data = await Playground.find();

        res.render('admin/dashboard/playground', {
            title : 'Admin | Playground',
            page_name : 'Playground',
            alert,
            data
        });
    },

    viewAddPlayground : async (req, res) => {
        const category = await Category.find({ type: 'Playground'});

        res.render('admin/dashboard/playground/add', {
            title : 'Admin | Playground',
            page_name : 'Playground',
            category
        });
    },

    addDataPlayground : async (req, res) => {
        const {
            input_author,
            input_title,
            input_category,
            input_link
        } = req.body;

        const input_image = req.file.filename;

        await Playground.create({
            image : input_image,
            author : input_author,
            title : netralizeInput(input_title),
            category : input_category,
            link : input_link
        });

        showNotification(req, "Success Add Story", "success");
        res.redirect('/admin/playground');
    },

    viewEditPlayground : async (req, res) => {
        const { id } = req.params;
        const data = await Playground.findOne({ _id : id });
        const category = await Category.find({ type: 'Story'});

        res.render('admin/dashboard/playground/edit', {
            title : 'Admin | Playground',
            page_name : 'Playground',
            data,
            category
        });
    },

    editDataPlayground : async (req, res) => {
        try {
            const { id } = req.params;
            const {
                input_author,
                input_title,
                input_category,
                input_link
            } = req.body;

            const data = await Playground.findOne({ _id : id });
            
            if(req.file != null){
                await fs.unlink(path.join(`public/img/upload/playground/${data.image}`));
                data.image = req.file.filename;
            }
            data.author = input_author
            data.title = netralizeInput(input_title),
            data.category = input_category,
            data.link = input_link
            data.save();

            showNotification(req, "Success Edit Story", "success");
            res.redirect('/admin/playground');
        } catch (err) {
            showNotification(req, `ailed Edit Story ${err.message}`, "success");
            res.redirect('/admin/playground');
        }
    },

    deleteDataPlayground : async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Playground.findOne({ _id : id });

            fs.unlink(path.join(`public/img/upload/Playground/${data.image}`));
            data.remove();

            showNotification(req, "Success Delete Playground", "success");
            res.redirect('/admin/playground');
        } catch (err) {
            showNotification(req, `Failed Delete Playground ${err.message}`, "danger");
            res.redirect('/admin/playground');
        }
    },

    viewDataImage : async (req, res) => {
        const alertMessage = req.flash('alert_message');
        const alertStatus = req.flash('alert_status');
        const alert = {
            message: alertMessage,
            status : alertStatus
        };

        const data = await Image.find();

        res.render('admin/dashboard/image', {
            title : 'Admin | Image',
            page_name : 'Image',
            alert,
            data
        });
    },

    viewAddImage : (req, res) => {
        res.render('admin/dashboard/image/add', {
            title : 'Admin | Image',
            page_name : 'Image',
        });
    },

    addDataImage : async (req, res) => {
        const input_image = req.file.filename;

        await Image.create({
            name : input_image
        });

        showNotification(req, "Success Add Image", "success");
        res.redirect('/admin/image');
    },
}

const netralizeInput = (params) => {
    return params.toLowerCase();
}

const showNotification = (req, message, status) => {
    req.flash('alert_message', message);
    req.flash('alert_status', netralizeInput(status));
}

const slugGenerator = (string) => {
    const str = netralizeInput(string);
    return str.split(' ').join('-');
}