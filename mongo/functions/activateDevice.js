exports = async function (request, response) {

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  const dbName = "beez";
  const collName = "device";

  // Get a collection from the context
  const deviceCollection = context.services.get(serviceName).db(dbName).collection(collName);

  const { factoryToken, name } = JSON.parse(request.body.text())

  try {
    // Execute a FindOne in MongoDB 
    const device = await deviceCollection.findOneAndUpdate(
      { factoryToken, status: 'cold'},
      { $set: { status: 'active', userId: context.user.id, name } }
    );

    if (!!device) {
      response.setStatusCode(200);
      return;
    }
  } catch (err) {
    console.log("Error occurred while executing findOne:", err.message);
  }
  response.setStatusCode(403)
  response.setBody(JSON.stringify({ error: "forbidden" }));
};