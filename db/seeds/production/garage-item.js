exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then(() => {
    return Promise.all([
      knex('users').insert({
        name: "Pogs",
        reason: "I gotta mean game planned for 1995",
        cleanliness: "yummm",
        created_at: new Date,
      }),
      knex('users').insert({
        name: "Bedazzler",
        reason: "I have a jean jacket that I plan on wearing to the Cyndi Lauper concert that needs some bling",
        cleanliness: "yuk",
        created_at: new Date,
      })
    ]);
  });
};
