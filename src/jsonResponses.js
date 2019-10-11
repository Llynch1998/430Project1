const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);


const addUser = (request, response, body) => {
  
  const responseJSON = {
    message: 'Please fill in all the fields',
  };

  if (!body.game || !body.maxP || !body.raid) {
    console.log(body.game);
    console.log(body.maxP);
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  
  let responseCode = 201;

  if (users[body.game]) {
    responseCode = 204;
  } else {
    
    users[body.game] = {};//body.game is the JSON "key" lateer, check by the key in order to get things in the key
  }

  
  users[body.game].raid = body.raid;
  users[body.game].maxP = body.maxP;

  
  if (responseCode === 201) {
    responseJSON.message = 'Raid Added';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
 
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  
  respondJSON(request, response, 404, responseJSON);
};



module.exports = {
  getUsers,
  addUser,
  notFound,
  getUsersMeta,
  notFoundMeta,
};
