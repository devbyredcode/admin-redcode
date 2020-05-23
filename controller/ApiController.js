const CaseStudy = require('../model/CaseStudy');

module.exports = {
    landingPageData : async (req, res) => {
        try {
            const caseStudy = await CaseStudy.find();
            
            res.status(200).json({
                message : "SUCCESS",
                data : {
                    data_case_study : caseStudy 
                }, 
                errors : null 
            });
        } catch (err) {
            res.status(500).json({
                message : "ERROR",
                data : null,
                errors : `error ${err.message}`
            });
        }
    }
}

