const prisma = require("../models/prisma");

const getAll = async (req, res) => {
  const allStats = await prisma.stat.findMany();
  res.send(allStats);
};

const addStat = async (req, res) => {
  const { weight, arm, chest, waist, hips } = JSON.parse(req.body.datas);
  await prisma.stat.create({
    data: {
      weight,
      photo: req.files.file.newFilename,
      arm,
      chest,
      waist,
      hips,
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
  getAll,
  addStat,
};
