const formidable = require("formidable");
const fs = require("fs");

const UPLOADS = `./public/uploads`;

const fileMiddleware = (req, res, next) => {
  const userUpload = `${UPLOADS}/${req.user.id}`;
  // create folder if not exist
  if (!fs.existsSync(UPLOADS)) {
    // create folder
    fs.mkdirSync(UPLOADS);
  }

  if (!fs.existsSync(userUpload)) {
    // create folder
    fs.mkdirSync(userUpload);
  }

  // accepted file types
  const acceptedMimeTypes = ["image/jpeg", "image/png", "image/gif"]; // create form
  const form = new formidable.IncomingForm({
    uploadDir: userUpload,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
  });
  // parse form
  form.parse(req, (err, fields, files) => {
    // check error
    if (err) {
      // return error
      return res.status(500).json({ message: "Maximum 5MB" });
    }
    const { file } = files;
    if (acceptedMimeTypes.indexOf(file.mimetype) === -1) {
      fs.unlinkSync(file.filepath);
      return res.status(500).json({ message: "File type not supported" });
    }
    // else add fields to req.body & files to req.files
    req.body = fields;
    req.files = files;
    next();
    return null;
  });
};

module.exports = fileMiddleware;
