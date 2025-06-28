import { extname } from 'path';
import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = extname(file.originalname); // conserva la extensión original
      cb(null, `${uniqueSuffix}${extension}`);
    },
  }),
};
