/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Loader } from '../components'

const Article = () => {

  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/entries/${id}`)
      .then((response) => {
        setArticle(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      })
  }, [id])

  if (isLoading) {
    return <Loader />
  }

  if (!article) {
    return <div>Article not found.</div>
  }

  const { title, content, references, img } = article

  return (
    <div className="flex flex-col w-full h-full p-4 justify-center items-center">
      <motion.div
        className="w-full p-2 mx-auto"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold tracking-wider font-['Ysabeau Office']"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
          >
            {title}
          </motion.h2>
          <Link to="/" className="text-blue-500 hover:underline">
            Go Back
          </Link>
        </div>
        {img && (
          <motion.div
            className="flex items-center my-8"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={img}
              alt={`References ${references}`}
              className="w-8 h-8 rounded-full mr-4"
            />
            <h1 className="text-gray-600 font-medium">
              Admin
            </h1>
          </motion.div>
        )}
        <motion.div
          className="w-full my-8 tracking-wider"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-gray-800 mb-4 font-semibold">
            Definisi
          </h2>
          <hr />
          <p className="text-gray-600">
            <br />
            {content}
            <br />
          </p>
        </motion.div>
        <motion.div
          className="w-full my-8 tracking-wider"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-gray-800 mb-4 font-semibold">
            Referensi
          </h2>
          <hr />
          <p className="text-xs text-gray-600">
            <br />
            {references}
            <br />
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Article
