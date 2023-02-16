const prisma = require("../models/prisma");
const formSchema = require("../schemas/formSchema");

const getStats = async (req, res) => {
  const allStats = await prisma.stat.findMany({
    where: {
      userStatId: req.user.id,
    },
  });
  res.send(allStats.reverse());
};

function toNumber(n) {
  if (typeof n === "string") {
    return +n;
  }
  return n;
}

const addStat = async (req, res) => {
  const { poids, bras, poitrine, cuisse, hanche } = JSON.parse(req.body.datas);

  const { error } = formSchema.validate({
    photo: req.files.file.newFilename,
    poids: toNumber(poids),
    bras,
    poitrine,
    cuisse,
    hanche,
  });

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  await prisma.stat.create({
    data: {
      weight: +poids,
      photo: req.files.file.newFilename,
      arm: toNumber(bras),
      chest: toNumber(poitrine),
      waist: toNumber(cuisse),
      hips: toNumber(hanche),
      userStat: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });

  return res
    .status(201)
    .json({ message: "Merci ! Votre formulaire est bien enregistrée" });
};

module.exports = {
  getStats,
  addStat,
};
