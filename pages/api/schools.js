import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  if (req.method === 'GET') {
    const [rows] = await db.execute(
      'SELECT id, name, address, city, image FROM schools'
    );
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const { name, address, city, state, contact, email_id, image } = req.body;
    await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, email_id, image]
    );
    return res.status(201).json({ message: 'School added!' });
  }

  res.status(405).end();
}
