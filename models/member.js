const db = require('../util/momodb');
const crypt = require('../util/crypt');




module.exports = class {

    // READ

    static queryMember(req,res) {
        let account = req.body.account;
        return(db.execute('SELECT * FROM web.member where act_name = ?', [account]));
    }

    static getFieldLength(req,res) {
        return(db.execute("SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, COLUMN_DEFAULT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'web' AND TABLE_NAME = 'member'"));
    }

    // WRITE

    static writeNewMember(req,res) {
        let account = req.body.account;
        let password = req.body.password;
        let email = req.body.email;
        password = crypt(password);
        return(db.execute("INSERT INTO `web`.`member` (`act_name`, `pwd`, `email`) VALUES (?, ?, ?)", [account, password, email]));
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