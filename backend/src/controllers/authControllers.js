const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");
const jwtService = require("../services/jwt");
const userSchema = require("../schemas/userSchema");
const loginSchema = require("../schemas/loginSchema");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const signup = async (req, res) => {
  const SALT_ROUNDS = 10;
  // je récupère les données du body
  const { name, email, password, repeatPassword, height } = req.body;

  // j'utilise le schéma Joi pour valider les données
  const { error } = userSchema.validate({
    name,
    email,
    password,
    repeatPassword,
    height,
  });

  // si les données ne sont pas valides, je renvoie une erreur
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  // je vérifie que les mots de passe sont identiques
  if (password !== repeatPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  // je vérifie que l'utilisateur n'existe pas déjà
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // si l'utilisateur existe déjà, je renvoie une erreur
  if (user) {
    return res.status(409).send({ message: "User already exists" });
  }

  // je hash le mot de passe
  const hPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // je crée l'utilisateur
  await prisma.user.create({
    data: {
      name,
      email,
      password: hPassword,
      height: parseInt(height, 10),
    },
  });
  return res.send({ message: "User created" });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  // je vérifie que les données sont valides
  const { error } = loginSchema.validate({
    email,
    password,
  });

  // si les données ne sont pas valides, je renvoie une erreur
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  // je récupère l'utilisateur
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // je vérifie que l'utilisateur existe
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  // je vérifie que le mot de passe est correct
  const decodePwd = bcrypt.compareSync(password, user.password);

  // si le mot de passe est incorrect, je renvoie une erreur
  if (!decodePwd) {
    return res.status(401).send({ message: "Invalid password" });
  }

  // j'ajoute un token à l'utilisateur
  const token = jwtService.generateToken({ id: user.id });

  // je renvoie l'utilisateur avec le token
  res.cookie("cyb_user", token, {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  });

  return res.send({ message: "Login successful" });
};

module.exports = {
  signup,
  login,
};
