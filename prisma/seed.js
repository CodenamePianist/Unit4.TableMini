const prisma = require("../prisma");
const seed = async (numRestaurants = 3, numReservations = 5) => {
  // TODO: Create 3 restaurants with 5 reservations each
  for (let i = 0; i < numRestaurants; i++) {
    const reservations = [];
    for (let j = 0; j < numReservations; j++) {
      reservations.push({
        name: `Person ${i}${j}`,
        email: `${i}${j}@foo.bar`,
        partySize: Math.floor(Math.random() * 10) + 1,
      });
    }

    await prisma.restaurant.create({
      data: {
        name: `Restaurant ${i + 1}`,
        reservations: {
          create: reservations,
        },
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
