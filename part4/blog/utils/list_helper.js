const dummy = (blogs) => {
  //...
  return 1;
};

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, current) => {
    return sum + current.likes;
  }, 0);
  return sum;
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((mostLiked, current) => {
    if (mostLiked.likes < current.likes) {
      return current;
    }
    return mostLiked;
  }, blogs[0]);

  const { title, author, likes } = favorite;

  return { title, author, likes };
};

const mostBlogs = (givenBlogs) => {
  let authors = {};
  let highestBlogCount = 1;
  let authorWithMostBlogs = givenBlogs[0];

  for (let blog of givenBlogs) {
    const author = blog.author;
    // If author is already encountered, add to their count. Otherwise add them to authors object
    if (authors.hasOwnProperty(author)) {
      authors[author].count = authors[author].count + 1;
    } else {
      authors[author] = blog;
      authors[author].count = 1;
    }

    const authorBlogCount = authors[author].count;
    if (authorBlogCount > highestBlogCount) {
      authorWithMostBlogs = blog;
      highestBlogCount = authorBlogCount;
    }
  }

  const authorToReturn = {
    author: authorWithMostBlogs.author,
    blogs: highestBlogCount,
  };

  return authorToReturn;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
