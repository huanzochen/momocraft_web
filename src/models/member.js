require('dotenv').config()
const web = require('../util/webdb')
const crypt = require('../util/crypt')
const { v3: uuidv3 } = require('uuid')
const momocraft = require('../util/momocraftdb')


module.exports = class {

  // READ
  static queryMomocraftEmail(req, res, email) {
    return momocraft.execute('SELECT * FROM authme.authme where email = ?', [email])
  }
  static queryMomocraftMember(req, res, account) {
    return momocraft.execute('SELECT * FROM authme.authme where realname = ?', [account])
  }
  static getFieldLength(req, res) {
    return momocraft.execute('SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, COLUMN_DEFAULT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = \'authme\' AND TABLE_NAME = \'authme\'')
  }
  
  // WRITE
  static writeNewMember(req, res) {
    let account = req.body.account
    let password = req.body.password
    let email = req.body.email
    password = crypt.crypt(password)
    return web.execute('INSERT INTO `web`.`member` (`uuid`, `act_name`, `pwd`, `email`) VALUES (?, ?, ?, ?)', [uuidv3(`${account}`, process.env.UUID_NAMESPACE), account, password, email])
  }
  static resetMemberPassword(req, res, email, password) {
    return momocraft.execute('UPDATE authme.authme SET password = ? where email = ?', [password, email])
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