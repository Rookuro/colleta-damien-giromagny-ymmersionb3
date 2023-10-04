import { Request, Response } from "express";
import { File } from "formidable";
import Formidable from "formidable-serverless";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};
function generateUniqueFileName(originalFileName: string): string {
  const uniquePrefix = Date.now().toString(36);
  const fileExtension = path.extname(originalFileName);
  const uniqueFileName = `${uniquePrefix}${fileExtension}`;
  return uniqueFileName;
}
export default function uploadFormFiles(
  req: Request,
  res: Response
) {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
      uploadDir: path.join(process.cwd(), 'public/uploads'),
    });

    form
    .on("file", (name: string, file: File) => {
      console.log("Source Path:", file.path);
      const sourcePath = file.path;
  
      // Générez un nom de fichier unique
      const uniqueFileName = generateUniqueFileName(file.name);
      const destinationPath = path.join(form.uploadDir, uniqueFileName);
  
      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);
  
      readStream.pipe(writeStream);
  
      readStream.on("end", () => {
        // Supprimez le fichier source après la copie
        fs.unlinkSync(sourcePath);
      });
    })
    .on("aborted", () => {
      reject(res.status(500).send('Aborted'));
    })
    .on("end", () => {
      resolve(res.status(200).send('done'));
    });
  

    await form.parse(req);
  });
}
