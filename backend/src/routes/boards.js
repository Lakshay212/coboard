const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// All routes here are protected - user must be logged in
// CREATE a new board
router.post('/', authenticateToken, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;

  try {
    // Create the board
    const newBoard = await pool.query(
      'INSERT INTO boards (name, owner_id) VALUES ($1, $2) RETURNING *',
      [name, userId]
    );

    const board = newBoard.rows[0];

    // Automatically add creator as owner in board_members
    await pool.query(
      'INSERT INTO board_members (board_id, user_id, role) VALUES ($1, $2, $3)',
      [board.id, userId, 'owner']
    );

    res.status(201).json({ message: 'Board created', board });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all boards for logged in user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const boards = await pool.query(
      `SELECT boards.* FROM boards
       JOIN board_members ON boards.id = board_members.board_id
       WHERE board_members.user_id = $1`,
      [userId]
    );

    res.status(200).json({ boards: boards.rows });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single board by id
router.get('/:id', authenticateToken, async (req, res) => {
  const boardId = req.params.id;
  const userId = req.user.userId;

  try {
    // Check if user is a member of this board
    const member = await pool.query(
      'SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2',
      [boardId, userId]
    );

    if (member.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const board = await pool.query(
      'SELECT * FROM boards WHERE id = $1',
      [boardId]
    );

    res.status(200).json({ board: board.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;