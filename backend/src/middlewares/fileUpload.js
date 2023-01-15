const formidable = require("formidable");
const fs = require("fs");

const UPLOADS = `./upload/`;

const fileMiddleware = (req, res, next) => {
  const userUpload = `./upload/${req.user.id}`;
  // create folder if not exist
  if (!fs.existsSync(UPLOADS)) {
    // create folder
    fs.mkdirSync(UPLOADS);
  }

  if (!fs.existsSync(userUpload)) {
    // create folder
    fs.mkdirSync(userUpload);
  }

  // create form
  const form = new formidable.IncomingForm({
    uploadDir: userUpload,
    keepExtensions: true,
  });
  // parse form
  form.parse(req, (err, fields, files) => {
    // check error
    if (err) {
      // return error
      res.status(500).json({ message: [{ message: err.message }] });
    } else {
      // else add fields to req.body & files to req.files
      req.body = fields;
      req.files = files;
      next();
    }
  });
};

module.exports = fileMiddleware;
