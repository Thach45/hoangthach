const bcrypt = require('bcryptjs');
const hash = '$2b$10$neGFntgV1JmZoOnno51VE.Vw9Jgx32T1TVYV2yraYo/k0b83lTrze';
const password = 'Thach18012005';

bcrypt.compare(password, hash).then(res => {
  console.log('Match:', res);
});
