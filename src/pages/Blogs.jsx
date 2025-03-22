import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App'; // Import ThemeContext
import CardComponent from '../components/Card'; // Import the CardComponent

const Blogs = () => {
  const { isDarkMode } = useContext(ThemeContext); // Access theme state

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'popular', 'recent'
  const [isCreatingBlog, setIsCreatingBlog] = useState(false); // Toggle blog creation form
  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    author: 'Anonymous', // Default author
    image: 'https://via.placeholder.com/400x200', // Default image
    rating: 0, // Default rating
    tags: [],
  });

  // Mock blog data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: '10 Tips for Effective Community Building',
      description: 'Learn how to build and grow a thriving community with these proven tips.',
      author: 'John Doe',
      date: '2023-10-01',
      rating: 4.5,
      tags: ['Community', 'Tips'],
      image: 'https://via.placeholder.com/400x200',
    },
    {
      id: 2,
      title: 'The Future of Online Communities',
      description: 'Explore the trends shaping the future of online communities and how to stay ahead.',
      author: 'Jane Smith',
      date: '2023-09-25',
      rating: 4.2,
      tags: ['Future', 'Online'],
      image: 'https://via.placeholder.com/400x200',
    },
    {
      id: 3,
      title: 'How to Engage Your Community Members',
      description: 'Discover strategies to keep your community members engaged and active.',
      author: 'Alice Johnson',
      date: '2023-09-15',
      rating: 4.7,
      tags: ['Engagement', 'Strategies'],
      image: 'https://via.placeholder.com/400x200',
    },
  ]);

  // Filter and search blogs
  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            blog.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .filter((blog) => {
      if (filter === 'popular') return blog.rating >= 4.5;
      if (filter === 'recent') return new Date(blog.date) > new Date('2023-09-01');
      return true; // 'all'
    });

  // Handle input changes for the new blog form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle tag input
  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim());
    setNewBlog((prev) => ({
      ...prev,
      tags,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const blogToAdd = {
      ...newBlog,
      id: blogs.length + 1, // Generate a unique ID
      date: new Date().toISOString().split('T')[0], // Add current date
      rating: 0, // Default rating for new blogs
    };
    setBlogs((prev) => [blogToAdd, ...prev]); // Add the new blog to the list
    setIsCreatingBlog(false); // Close the form
    setNewBlog({
      title: '',
      description: '',
      author: 'Anonymous',
      image: 'https://via.placeholder.com/400x200',
      rating: 0,
      tags: [],
    }); // Reset the form
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Page Header */}
      <div className={`text-center py-12 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Blogs & Insights
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          Discover the latest trends, tips, and stories from our community.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Bar */}
          <div className="w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
              }`}
            />
          </div>

          {/* Filter Options */}
          <div className="w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
              }`}
            >
              <option value="all">All Blogs</option>
              <option value="popular">Popular</option>
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create Blog Button */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => setIsCreatingBlog(!isCreatingBlog)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isCreatingBlog ? 'Cancel' : 'Create Blog'}
        </button>
      </div>

      {/* Create Blog Form */}
      {isCreatingBlog && (
        <div className="container mx-auto px-4 py-4">
          <form
            onSubmit={handleSubmit}
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
            <div className="space-y-4">
              <div>
                <label className="block">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newBlog.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block">Description</label>
                <textarea
                  name="description"
                  value={newBlog.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                  }`}
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={newBlog.tags.join(', ')}
                  onChange={handleTagsChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                  }`}
                />
              </div>
              <div>
                <label className="block">Author</label>
                <input
                  type="text"
                  name="author"
                  value={newBlog.author}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                  }`}
                />
              </div>
              <div>
                <label className="block">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={newBlog.image}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                  }`}
                />
              </div>
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog List */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <CardComponent
              key={blog.id}
              image={blog.image}
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={blog.date}
              tags={blog.tags}
              rating={blog.rating}
              buttonText="Read More"
              onClick={() => alert(`Navigating to blog: ${blog.title}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;