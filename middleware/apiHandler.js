const apiHeader = (req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', '*'); 

    // const API_Version = 1;
    // const API_Key = 'redcode-api-option';
    
    // if(req.header.API_Version == API_Version){
    //     if(req.header.API_Key == API_Key){
    //     }
    // }
    next();
};

module.exports = apiHeader;