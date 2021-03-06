const Pool = require('pg').Pool

const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:true,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM public.user', (error, results) => {
      if (error) {
        return response.status(500).json(error)
      }
      return response.status(200).json(results.rows)
    })
  }
  
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public.user WHERE id = $1', [id], (error, results) => {
      if (error) {
        return response.status(500).json(error)
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = (request, response) => {
    const { email, password } = request.body
    pool.query('INSERT INTO public.user (email, password) VALUES ($1, $2)  RETURNING id', [email, password], (error, results) => {
      if (error) {
        response.status(500).send(error)
      }
      response.status(201).send(results)
    })
  }
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE user SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          return response.status(500).json(error)
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM user WHERE id = $1', [id], (error, results) => {
      if (error) {
        return response.status(500).json(error)
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }