import {randomBytes} from 'crypto'

exports = async function(request, response){
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see: 
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  const dbName = "beez";
  const collName = "device";

  // Get a collection from the context
  const deviceCollection = context.services.get(serviceName).db(dbName).collection(collName);

  try {
    // Execute a FindOne in MongoDB 
    const token = randomBytes(48).toString('base64')
    const device = await deviceCollection.findOneAndUpdate(
      { armIp: request.headers['X-Cluster-Client-Ip'][0] },
      { $set: { token } }
    );

    if(!!device){
      response.setStatusCode(200);
      response.setBody(token);
      return;
    }
  } catch(err) {
    console.log("Error occurred while executing findOne:", err.message);
  }
  response.setStatusCode(403)
  response.setBody(JSON.stringify({ error: "forbidden" }));
};