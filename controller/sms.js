var request = require("request");

var options = { method: 'POST',
  url: 'http://api.mytelly.in/api/sms-campaign/single-sms-campaign',
  headers: 
   { 'postman-token': '00c69f0c-1569-3129-46d7-d6d87275d536',
     'cache-control': 'no-cache',
     authorization: 'Bearer XVS9v_SE3JFDP31T8GUTODGrLanIj6rguR9dxA0QHtjLVaACVrhv97EV9aaMgbtPh5sXJTX4CEBdYRV5KtKoOEOfvETeCPdbq6jlkt9wll7Ab7ClgKBnV4CBx5iOoxFl',
     'content-type': 'application/json' },
  body: 
   { senderId: 'NROLYF',
     phone: '8105719681',
     template: 'On a Budget But But Now  Want To Celebrate New Year in Grand Style? We Got You Covered. Join us at Royal Orchid Hotel This New Year Starting from Only Rs. 4200/- https://bit.ly/3go2xAV' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});