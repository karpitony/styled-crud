module.exports = {
  // username으로 유저 검색
  async findUserByUsername(db, username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    return await db.get(query, [username]); // username에 해당하는 유저 반환
  },

  // 유저 생성
  async createUser(db, username, hashedPassword) {
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    const result = await db.run(query, [username, hashedPassword]);
    return result.lastID; // 생성된 유저의 ID 반환
  },
};
