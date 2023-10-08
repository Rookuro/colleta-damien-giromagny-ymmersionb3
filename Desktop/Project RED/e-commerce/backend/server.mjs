import express from 'express';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccount.mjs';
import cors from 'cors';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
};

app.use(cors(corsOptions));
app.use(express.json());

let storedUserId = null;

app.get('/api/user-id', (req, res) => {
  if (storedUserId) {
    res.json({ userId: storedUserId });
  } else {
    res.json({ userId: null });
  }
});

app.post('/api/user-id', async (req, res) => {
  try {
    const idToken = req.body.idToken;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    storedUserId = userId;

    res.json({ userId });
  } catch (error) {
    console.error('Erreur lors de la vérification du jeton :', error);
    res.status(500).json({ error: 'Erreur de vérification du jeton' });
  }
});

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
