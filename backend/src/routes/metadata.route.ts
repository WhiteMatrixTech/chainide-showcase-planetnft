import MetadataController from '@controllers/metadata.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import multer from 'multer';

class MetadataRoute implements Routes {
  public path = '/metadata';
  public router = Router();
  public metadataController = new MetadataController();
  public upload = multer({ dest: 'uploads/' });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:tokenId`, this.metadataController.getMetadata);
    this.router.post(`${this.path}`, this.upload.single('image'), this.metadataController.uploadMetadata);
  }
}

export default MetadataRoute;
