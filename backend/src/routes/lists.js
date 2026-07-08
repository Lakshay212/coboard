const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// CREATE a list inside a board
router.post('/', authenticateToken, async (req, res) => {
  const { board_id, title, position } = req.body;
  const userId = req.user.userId;

  try {
    // Check if user is a member of this board
    const member = await pool.query(
      'SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2',
      [board_id, userId]
    );

    if (member.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const newList = await pool.query(
      'INSERT INTO lists (board_id, title, position) VALUES ($1, $2, $3) RETURNING *',
      [board_id, title, position]
    );

    res.status(201).json({ list: newList.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all lists for a board
router.get('/:board_id', authenticateToken, async (req, res) => {
  const { board_id } = req.params;
  const userId = req.user.userId;

  try {
    // Check if user is a member of this board
    const member = await pool.query(
      'SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2',
      [board_id, userId]
    );

    if (member.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const lists = await pool.query(
      'SELECT * FROM lists WHERE board_id = $1 ORDER BY position',
      [board_id]
    );

    res.status(200).json({ lists: lists.rows });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE a list title
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updated = await pool.query(
      'UPDATE lists SET title = $1 WHERE id = $2 RETURNING *',
      [title, id]
    );

    res.status(200).json({ list: updated.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a list
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM lists WHERE id = $1', [id]);
    res.status(200).json({ message: 'List deleted' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;