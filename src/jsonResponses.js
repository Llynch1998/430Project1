const users = {};
let ID = 1;


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

const increment = (request, response, body) =>{
  const responseJSON = {
    message: 'Please fill in all the fields',
  };
  console.log(body.id);
  if (!body.id) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  
  let responseCode = 201;
  for(let key in users){
    for(let ID in users[key]){
      if(body.id == users[key][ID].id){
        if(users[key][ID].currentPlayers < users[key][ID].maxPlayers){
          users[key][ID].currentPlayers++;
        }
      }
    }
  }
  
  
  return respondJSON(request, response, responseCode);
}
const addUser = (request, response, body) => {
  
  const responseJSON = {
    message: 'Please fill in all the fields',
  };

  if (!body.game || !body.maxP || !body.raid) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  
  let responseCode = 201;

  if (users[body.game]) {
    responseCode = 204;
      users[body.game][ID] = {};
      users[body.game][ID].id = ID;
      users[body.game][ID].raid = body.raid;
      users[body.game][ID].maxPlayers = body.maxP;
      users[body.game][ID].currentPlayers = 1;
    
  
  } else {
    
    users[body.game] = {};
    users[body.game].game = body.game;
    users[body.game][ID] = {};
    users[body.game][ID].id = ID;
    users[body.game][ID].raid = body.raid;
    users[body.game][ID].maxPlayers = body.maxP;
    users[body.game][ID].currentPlayers = 1;
  }

  
  ID++;
  
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
