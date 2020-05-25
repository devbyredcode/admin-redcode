const CaseStudy = require('../model/CaseStudy');
const Story = require('../model/Story');
const Playground = require('../model/Playground');

module.exports = {
    landingPageData : async (req, res) => {
        try {
            const dataCaseStudy = await CaseStudy.find().select('image title subtitle slug');
            const dataStory = await Story.find().select('image title slug');
            const dataPlayground = await Playground.find().select('image title link');
            
            res.status(200).json({
                status  : 200,
                message : "success",
                data    : {
                    data_case_study : dataCaseStudy,
                    data_story : dataStory,
                    data_playground : dataPlayground 
                }, 
                errors  : null 
            });
        } catch (err) {
            res.status(500).json({
                status  : 500,
                message : "error",
                data    : null,
                errors  : `error ${err.message}`
            });
        }
    },

    caseStudyData : async (req, res) => {
        try {
            const dataCaseStudy = await CaseStudy.find().select('image title subtitle slug');

            res.status(200).json({
                status  : 200,
                message : "success",
                data    : {
                    data_case_study : dataCaseStudy
                }, 
                errors  : null 
            });
        } catch (err) {
            res.status(500).json({
                status  : 500,
                message : "error",
                data    : null,
                errors  : `error ${err.message}`
            });
        }
    },

    detailCaseStudy : async (req, res) => {
        try {
            const { slug } = req.params;

            const dataCaseStudy = await CaseStudy.findOne({ slug : slug });
            res.status(200).json({
                status  : 200,
                message : "success",
                data    : {
                    data_case_study : dataCaseStudy
                }, 
                errors  : null 
            });
        } catch (err) {
            res.status(500).json({
                status  : 500,
                message : "error",
                data    : null,
                errors  : `error ${err.message}`
            });
        }
    },

    categoryCaseStudy : async (req, res) => {
        try {
            const { category } = req.params;

            const dataCaseStudy = await CaseStudy.findOne({ category : category }).select('image title subtitle slug');
            res.status(200).json({
                status: 200,
                message: "success",
                data: {
                    data_case_study : dataCaseStudy
                },
                errors : null
            });
        } catch (err) {
            res.status(500).json({
                status  : 500,
                message : "error",
                data    : null,
                errors  : `error ${err.message}`
            });
        }
    },

    storyData : async (req, res) => {
        try {
            const dataStory = await Story.find().select('image title slug');

            res.status(200).json({
                status  : 200,
                message : "success",
                data    : {
                    data_story : dataStory
                }, 
                errors  : null 
            });
        } catch (err) {
            res.status(500).json({
                status  : 500,
                message : "error",
                data    : null,
                errors  : `error ${err.message}`
            });
        }
    },

    detailStory : async (req, res) => {
        try {
            const { slug } = req.params;

            const dataStory = await Story.findOne({ slug : slug });
            res.status(200).json({
                status  : 200,
                message : "success",
                data    : {
                    data_story : dataStory
                }, 
                errors  : null 
            });
        } catch (err) {
            res.status(500).json({
                status  : 500,
                message : "error",
                data    : null,
                errors  : `error ${err.message}`
            });
        }
    },

    categoryStory : async (req, res) => {
        try {
            const { category } = req.params;

            const dataStory = await Story.findOne({ category : category }).select('image title subtitle slug');
            res.status(200).json({
                status: 200,
                message: "success",
                data: {
                    data_story : dataStory
                },
                errors : null
            });
        } catch (err) {
            res.status(500).json({
                status  : 500,
                message : "error",
                data    : null,
                errors  : `error ${err.message}`
            });
        }
    },

    playgroundData : async (req, res) => {
        try {
            const dataPlayground = await Playground.find().select('image title link');

            res.status(200).json({
                status  : 200,
                message : "success",
                data    : {
                    data_playground : dataPlayground
                }, 
                errors  : null 
            });
        } catch (err) {
            res.status(500).json({
                status  : 500,
                message : "error",
                data    : null,
                errors  : `error ${err.message}`
            });
        }
    },

    categoryPlayground : async (req, res) => {
        try {
            const { category } = req.params;

            const dataPlayground = await Story.findOne({ category : category }).select('image title subtitle slug');
            res.status(200).json({
                status: 200,
                message: "success",
                data: {
                    data_playground : dataPlayground
                },
                errors : null
            });
        } catch (err) {
            res.status(500).json({
                status  : 500,
                message : "error",
                data    : null,
                errors  : `error ${err.message}`
            });
        }
    },
}

