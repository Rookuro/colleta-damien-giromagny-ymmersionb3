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
        const destinationPath = path.join(form.uploadDir, file.name);

          const readStream = fs.createReadStream(sourcePath);
          const writeStream = fs.createWriteStream(destinationPath);

          readStream.pipe(writeStream);

          fs.unlinkSync(sourcePath);
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
