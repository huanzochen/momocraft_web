const db = require('../util/momodb');




module.exports = class {

    // READ

    static queryMember(req,res) {
        const account = req.body.account;
        return(db.execute('SELECT * FROM web.member where act_name = ?', [account]));
    }

    // WRITE

    static writeNewMember(req,res) {
        return

    }

    /*
    // 登入介面
    app.post('/login', function(req, res, next){
        var sess = req.session;
        var user = findUser(req.body.name, req.body.password);
        if(user){
        req.session.regenerate(function(err) {
        if(err){
        return res.json({ret_code: 2, ret_msg: '登入失敗'});        
        }
        req.session.loginUser = user.name;
        res.json({ret_code: 0, ret_msg: '登入成功'});              
        });
        }else{
        res.json({ret_code: 1, ret_msg: '賬號或密碼錯誤'});
        }  
        });
    */



}