import MetadataController from '@controllers/metadata.controller';
import { HttpException } from '@exceptions/HttpException';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import multer from 'multer';
import path from 'path';

// Uploaded files are served from this origin (express.static), so only images may be stored.
// SVG is left out on purpose, it can carry scripts.
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

class MetadataRoute implements Routes {
  public path = '/metadata';
  public router = Router();
  public metadataController = new MetadataController();
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname).toLowerCase()); //Appending extension
    },
  });
  upload = multer({
    storage: this.storage,
    limits: { fileSize: MAX_IMAGE_SIZE, files: 1 },
    fileFilter: function (req, file, cb) {
      const extension = path.extname(file.originalname).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(extension) && file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new HttpException(400, `Only ${IMAGE_EXTENSIONS.join(', ')} images can be uploaded`));
      }
    },
  });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:tokenId`, this.metadataController.getMetadata);
    this.router.post(`${this.path}`, this.upload.single('image'), this.metadataController.uploadMetadata);
  }
}

export default MetadataRoute;
