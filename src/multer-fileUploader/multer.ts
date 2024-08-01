import multer from 'multer';
import path from 'path';
import fs from 'fs';

const projectStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const projectFolder = global.__basepath + '/uploads/projects';
    if (!fs.existsSync(projectFolder)) {
      fs.mkdirSync(projectFolder);
    }
    callback(null, projectFolder);
  },
  filename: (req, file, callback) => {
    const uniqueId = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    callback(null, uniqueId + extension);
  },
});
const uploadProjectFiles = multer({ storage: projectStorage });

export default uploadProjectFiles;
