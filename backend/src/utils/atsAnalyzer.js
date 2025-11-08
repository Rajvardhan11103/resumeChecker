// utils/atsAnalyzer.js

exports.analyzeATS = async (resumeText) => {
  const keywords = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'API', 'Express'];
  let score = 0;

  keywords.forEach(keyword => {
    if (resumeText.toLowerCase().includes(keyword.toLowerCase())) {
      score += 10;
    }
  });

  // Score out of 100
  return Math.min(score, 100);
};
