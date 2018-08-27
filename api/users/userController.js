const getAllUsers = (req, res) => {
  return res.json('Testing response');
};

const getUserById = (req, res) => {

};

const createUser = (req, res) => {
  return res.json(req.body.username);
};

const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {

};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
