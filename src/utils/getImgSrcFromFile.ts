import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';

export async function getImgSrcFromFile(image: Express.Multer.File) {
  const fileName = nanoid();
  const extension = image.originalname.split('.').pop();
  const folderPath = join(__dirname, '../../public/images');
  const fileNameWithExtension = `${fileName}.${extension}`;
  const fullPath = join(folderPath, fileNameWithExtension);

  await writeFile(fullPath, image.buffer);
  let imgSrc = `/images/${fileNameWithExtension}`;

  return imgSrc;
}
