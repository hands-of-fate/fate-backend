const client = require('../lib/client');
// import our seed data:
const players = require('./players.js');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.password]);
      })
    );
      
    const user = users[0].rows[0];

    await Promise.all(
      players.map(player => {
        return client.query(`
                    INSERT INTO players (all_cards, current_deck, health, owner_id)
                    VALUES ($1, $2, $3, $4);
                `,
        [player.all_cards, player.current_deck, player.health, user.id]);
      })
    );
    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
