var ldap = require('ldapjs');

function AuthUser (url, username, password, domainComponent, field, callback) {
    var client = ldap.createClient({
        url: url
    });

    var opts = {
        filter: '(&(' + field + '='+ username + '))',
        scope: 'sub'
    };

    client.search(domainComponent, opts, function(err, search) {
        var users = [];
        if (err) {
            console.log(err);
        }
        search.on('searchEntry', function (entry) {
            if (entry) {
                users.push(entry.dn);
            } 
        });
        search.on('error', function (err) {
            console.log('error: ' + err);
        });
        search.on('searchReference', function (referral) {
            console.log('referral: ' + referral);
        });
        search.on('end', function (result) {
            if (users.length > 0) {
                client.bind(users[0], password, function (err) {
                    if (err) {
                        if (err.name == 'InvalidCredentialsError') {
                            unbind(client);
                            return callback({message: 'Invalid Password', code: 403});
                        } else {
                            unbind(client);
                            return callback(err);
                        }
                    }
                    unbind(client);
                    return callback();
                });
            } else {
                return callback({message: 'No such user', code: 404});
            }
        });
    });

}

function unbind (client) {
    client.unbind(function (err) {
        if (err) {
            console.log(err);
        }
    });
}


module.exports = AuthUser;





