import fs from 'fs';
import path from 'path';

export default (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const csvFilePath = path.join('interactions.csv');

    const csvData = `${data.userId},${data.productId},${data.interactionType}\n`;
    console.log("ma data de test : " + csvFilePath);
    fs.appendFile(csvFilePath, csvData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'enregistrement de l\'interaction.' });
      } else {
        res.status(200).json({ message: 'Interaction enregistrée avec succès.' });
      }
    });
  } else {
    res.status(405).end();
  }
};
