# ldap_authenticator
ldap authenticator for client side nodejs

## Usage

```javascript
var authUser = require('ldap_authenticator');

var config = {
  url: 'url',                           //ldap server ip  'ldap://xxx.xxx.xxx.xxx:389'
  username: 'username',                 // username to login
  password: 'password',
  domainComponent: 'domainComponent',   //'dc=xxx, dc=xxx'
  filterField: 'filterField'            // 'xxx'=username   the username field in ldap
};
authUser(config.url, config.username, config.password, config.domainComponent, config.filterField, function (err) {
    if (err) {
        'authentication fail ......'
        'do something'
    } else {
        'authentication success ......'
        'do something'
    }
});
```

