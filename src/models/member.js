require('dotenv').config()
const db = require('../util/momodb');
const crypt = require('../util/crypt');
const { v3: uuidv3 } = require('uuid');




module.exports = class {

    // READ

    static queryMember(req,res, account) {
        return(db.execute('SELECT * FROM web.member where act_name = ?', [account]));
    }

    static queryEmail(req,res, email) {
        return(db.execute('SELECT * FROM web.member where email = ?', [email]));
    }

    static getFieldLength(req,res) {
        return(db.execute("SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, COLUMN_DEFAULT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'web' AND TABLE_NAME = 'member'"));
    }

    // WRITE

    static writeNewMember(req,res) {
        let account = req.body.account;
        let password = req.body.password;
        let email = req.body.email;
        password = crypt.crypt(password);
        return(db.execute("INSERT INTO `web`.`member` (`uuid`, `act_name`, `pwd`, `email`) VALUES (?, ?, ?, ?)", [uuidv3(`${account}`, process.env.UUID_NAMESPACE), account, password, email]));
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