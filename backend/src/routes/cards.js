const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const { list_id, title, description, position } = req.body;
  const userId = req.user.userId;
  try {
    const list = await pool.query('SELECT * FROM lists WHERE id = $1', [list_id]);
    if (list.rows.length === 0) {
      return res.status(404).json({ error: 'List not found' });
    }
    const member = await pool.query(
      'SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2',
      [list.rows[0].board_id, userId]
    );
    if (member.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    const newcard = await pool.query(
      'INSERT INTO cards (list_id, title, description, position) VALUES ($1, $2, $3, $4) RETURNING *',
      [list_id, title, description, position]
    );
    res.status(201).json({ card: newcard.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:list_id', authenticateToken, async (req, res) => {
  const { list_id } = req.params;
  const userId = req.user.userId;
  try {
    const list = await pool.query('SELECT * FROM lists WHERE id = $1', [list_id]);
    if (list.rows.length === 0) {
      return res.status(404).json({ error: 'List not found' });
    }
    const member = await pool.query(
      'SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2',
      [list.rows[0].board_id, userId]
    );
    if (member.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    const cards = await pool.query(
      'SELECT * FROM cards WHERE list_id = $1 ORDER BY position',
      [list_id]
    );
    res.status(200).json({ cards: cards.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, list_id } = req.body;
  try {
    const updated = await pool.query(
      'UPDATE cards SET list_id = COALESCE($1, list_id), title = COALESCE($2, title) WHERE id = $3 RETURNING *',
      [list_id, title, id]
    );
    res.status(200).json({ card: updated.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM cards WHERE id = $1', [id]);
    res.status(200).json({ message: 'Card deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;