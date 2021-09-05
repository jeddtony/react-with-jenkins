const jestConfig = {
    verbose: true,
    testURL: "http://localhost:3000/",
    "transform": {
        "^.+\\.(js|jsx)$": "babel-jest"
     },
    testMatch: ['**/__tests__/*.js?(x)'],
    transformIgnorePatterns: [
        '/node_modules/(?!react-icons)'
    ]
  }
  
  module.exports = jestConfig