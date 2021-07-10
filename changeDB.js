
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     * CHANGE THE URI WHEN YOU WANT TO UPDATE THE 'PRODUCTION' DATABASE (instead of the Development Database)
     */
    const uri = process.env.DEV_DB_URL;
    
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     */
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // UPDATE
        // Print the Infinite Views listing
        await findItemByName(client, "Lapis Luna . Chardonnay '18");
        // // Update the Infinite Views listing to have 6 bedrooms and 8 beds
        await updateItemByName(client, "Lapis Luna . Chardonnay '18", { price_reg: '11' });
        // // Print the updated Infinite Views listing
        await findItemByName(client, "Lapis Luna . Chardonnay '18");

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

// Add functions that make DB calls here
// Update a Menu Item with the given name
// Note: If more than one Menu Item has the same name, only the first Item the database finds will be updated
async function updateItemByName(client, nameOfItem, updatedItem) {
    const result = await client.db("menu-prod").collection("items")
        .updateOne({ name: nameOfItem }, { $set: updatedItem });

    console.log(result.matchedCount + ' document(s) matched the query criteria.');
    console.log(result.modifiedCount + ' document(s) was/were updated.');
}

// Print a Menu Item with the given name
// Note: If more than one Item has the same name, only the first Item the database finds will be printed
async function findItemByName(client, nameOfItem){
    const result = await client.db('menu-prod').collection('items').findOne({ name: nameOfItem });

    if (result){
        console.log('Found a Menu Item in the db with the name "' + nameOfItem + '"');
        console.log(result);
    } else {
        console.log('No Items found with the name "' + nameOfItem + '"');
    }
}