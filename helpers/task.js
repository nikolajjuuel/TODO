module.exports = {
  categorizeMe(text) {
    if (text.toLowerCase().includes("food")) {
      return "To eat";
    } else if (text.toLowerCase().includes("movie")) {
      return "To watch";
    } else if (text.toLowerCase().includes("book")) {
      return "To read";
    } else {
      return "To buy";
    }
  },
};

