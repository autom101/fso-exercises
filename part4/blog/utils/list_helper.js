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

module.exports = { dummy, totalLikes };
