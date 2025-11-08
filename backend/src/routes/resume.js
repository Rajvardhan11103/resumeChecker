// const express = require('express');
// const multer = require('multer');
// const pdf = require('pdf-parse');


// const fs = require('fs');
// const path = require('path');
// const mammoth = require('mammoth');
// const { analyzeATS } = require('../utils/atsAnalyzer');

// const router = express.Router();


// // Make sure uploads folder exists
// const uploadDir = path.join(__dirname, '../../uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }


// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });



// // ✅ Upload and Analyze Resume
// router.post('/upload', upload.single('resume'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const filePath = req.file.path;
//     let resumeText = '';

//     // Check file type
//     // if (req.file.mimetype === 'application/pdf') {
//     //   const dataBuffer = fs.readFileSync(filePath);
//     //   const pdfData = await pdfParse(dataBuffer);
//     //   resumeText = pdfData.text;
//     // } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//     //   const dataBuffer = fs.readFileSync(filePath);
//     //   const result = await mammoth.extractRawText({ buffer: dataBuffer });
//     //   resumeText = result.value;
//     // } else {
//     //   // Unsupported file type
//     //   return res.status(400).json({ message: 'Unsupported file type. Use PDF or DOCX.' });
//     // }




//     // Parse file based on type
//     if (req.file.mimetype === 'application/pdf') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdf(dataBuffer);   // FIXED
//       resumeText = pdfData.text;
//     } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const result = await mammoth.extractRawText({ buffer: dataBuffer });
//       resumeText = result.value;
//     } else {
//       return res.status(400).json({ message: 'Unsupported file type. Use PDF or DOCX.' });
//     }


//     // Analyze resume (your ATS logic)
//     const score = await analyzeATS(resumeText);

//     // Optionally, delete file after processing
//     fs.unlinkSync(filePath);

//     res.status(200).json({
//       message: 'Resume uploaded successfully',
//       atsScore: score
//     });
//   } catch (err) {
//     console.error('Resume upload error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });


// // ✅ Upload and Analyze Resume
// // router.post('/upload', upload.single('resume'), async (req, res) => {
// //   try {
// //     const filePath = req.file.path;

// //     // Read PDF text
// //     const dataBuffer = fs.readFileSync(filePath);
// //     const pdfData = await pdfParse(dataBuffer);
// //     const resumeText = pdfData.text;

// //     // Analyze resume (using your ATS logic)
// //     const score = await analyzeATS(resumeText);

// //     res.status(200).json({
// //       message: 'Resume uploaded successfully',
// //       atsScore: score
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// module.exports = router;



// const express = require('express');
// const multer = require('multer');
// const pdf = require('pdf-parse'); // ✅ fixed import
// const fs = require('fs');
// const path = require('path');
// const mammoth = require('mammoth');
// const { analyzeATS } = require('../utils/atsAnalyzer');

// const router = express.Router();

// // Make sure uploads folder exists
// const uploadDir = path.join(__dirname, '../../uploads');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir); // store files in uploads/
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// ✅ Upload and Analyze Resume
// router.post('/upload', upload.single('resume'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     const filePath = req.file.path;
//     let resumeText = '';

//     // Parse file based on type
//     if (req.file.mimetype === 'application/pdf') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdf(dataBuffer); // ✅ pdf-parse works now
//       resumeText = pdfData.text;
//     } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const result = await mammoth.extractRawText({ buffer: dataBuffer });
//       resumeText = result.value;
//     } else {
//       return res.status(400).json({ message: 'Unsupported file type. Use PDF or DOCX.' });
//     }

//     // Analyze resume (your ATS logic)
//     const score = await analyzeATS(resumeText);

//     // Delete file after processing to keep server clean
//     fs.unlinkSync(filePath);

//     res.status(200).json({
//       message: 'Resume uploaded successfully',
//       atsScore: score
//     });
//   } catch (err) {
//     console.error('Resume upload error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;





// const express = require('express');
// const multer = require('multer');
// const pdf = require('pdf-parse').default || require('pdf-parse'); // FIXED import
// const fs = require('fs');
// const path = require('path');
// const mammoth = require('mammoth');
// const { analyzeATS } = require('../utils/atsAnalyzer');

// const router = express.Router();

// // Make sure uploads folder exists
// const uploadDir = path.join(__dirname, '../../uploads');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir); // store files in uploads/
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // ✅ Upload and Analyze Resume
// router.post('/upload', upload.single('resume'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     const filePath = req.file.path;
//     let resumeText = '';

//     // Parse file based on type
//     if (req.file.mimetype === 'application/pdf') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdf(dataBuffer); // ✅ fixed
//       resumeText = pdfData.text;
//     } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const result = await mammoth.extractRawText({ buffer: dataBuffer });
//       resumeText = result.value;
//     } else {
//       return res.status(400).json({ message: 'Unsupported file type. Use PDF or DOCX.' });
//     }

//     // Analyze resume (your ATS logic)
//     const score = await analyzeATS(resumeText);

//     // Delete file after processing to keep server clean
//     fs.unlinkSync(filePath);

//     res.status(200).json({
//       message: 'Resume uploaded successfully',
//       atsScore: score
//     });
//   } catch (err) {
//     console.error('Resume upload error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;




// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const pdf = require('pdf-parse'); // now works

// const dataBuffer = fs.readFileSync(filePath);
// const pdfData = await pdf(dataBuffer); // ✅ works
// const resumeText = pdfData.text;


// const mammoth = require('mammoth');
// const { analyzeATS } = require('../utils/atsAnalyzer');

// const router = express.Router();

// // Make sure uploads folder exists
// const uploadDir = path.join(__dirname, '../../uploads');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // ✅ Upload and Analyze Resume
// router.post('/upload', upload.single('resume'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     const filePath = req.file.path;
//     let resumeText = '';

//     // Dynamically import pdf-parse inside the route
//     const pdf = (await import('pdf-parse')).default;

//     if (req.file.mimetype === 'application/pdf') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdf(dataBuffer); // ✅ works now
//       resumeText = pdfData.text;
//     } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const result = await mammoth.extractRawText({ buffer: dataBuffer });
//       resumeText = result.value;
//     } else {
//       return res.status(400).json({ message: 'Unsupported file type. Use PDF or DOCX.' });
//     }

//     // Analyze resume
//     const score = await analyzeATS(resumeText);

//     // Delete uploaded file
//     fs.unlinkSync(filePath);

//     res.status(200).json({
//       message: 'Resume uploaded successfully',
//       atsScore: score
//     });
//   } catch (err) {
//     console.error('Resume upload error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;



// const express = require('express');
// const multer = require('multer');
// const pdf = require('pdf-parse'); // ✅ CommonJS compatible v1.1.1
// const fs = require('fs');
// const path = require('path');
// const mammoth = require('mammoth');
// const { analyzeATS } = require('../utils/atsAnalyzer');

// const router = express.Router();

// // Ensure uploads folder exists
// const uploadDir = path.join(__dirname, '../../uploads');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // ✅ Upload and Analyze Resume
// router.post('/upload', upload.single('resume'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const filePath = req.file.path;
//     let resumeText = '';

//     // Parse PDF
//     if (req.file.mimetype === 'application/pdf') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdf(dataBuffer);
//       resumeText = pdfData.text;

//     // Parse DOCX
//     } else if (
//       req.file.mimetype ===
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     ) {
//       const dataBuffer = fs.readFileSync(filePath);
//       const result = await mammoth.extractRawText({ buffer: dataBuffer });
//       resumeText = result.value;

//     } else {
//       return res
//         .status(400)
//         .json({ message: 'Unsupported file type. Use PDF or DOCX.' });
//     }

//     // Analyze resume (ATS logic)
//     const score = await analyzeATS(resumeText);

//     // Delete file after processing
//     fs.unlinkSync(filePath);

//     res.status(200).json({
//       message: 'Resume uploaded successfully',
//       atsScore: score
//     });

//   } catch (err) {
//     console.error('Resume upload error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const pdf = require('pdf-parse'); // ✅ CommonJS v1.1.1
// const fs = require('fs');
// const path = require('path');
// const mammoth = require('mammoth');
// const { analyzeATS } = require('../utils/atsAnalyzer');

// const router = express.Router();

// // Ensure uploads folder exists
// //const uploadDir = path.join(__dirname, '../../uploads');
// //const uploadDir = path.join(__dirname, 'uploads');

// const uploadDir = path.join(__dirname, '../uploads');

// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // Upload and analyze resume
// router.post('/upload', upload.single('resume'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     const filePath = req.file.path;
//     let resumeText = '';

//     // PDF
//     if (req.file.mimetype === 'application/pdf') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdf(dataBuffer);
//       resumeText = pdfData.text;

//     // DOCX
//     } else if (
//       req.file.mimetype ===
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     ) {
//       const dataBuffer = fs.readFileSync(filePath);
//       const result = await mammoth.extractRawText({ buffer: dataBuffer });
//       resumeText = result.value;

//     } else {
//       return res.status(400).json({ message: 'Unsupported file type. Use PDF or DOCX.' });
//     }

//     // Analyze resume (ATS)
//     const score = await analyzeATS(resumeText);

//     // Delete file after processing
//     fs.unlinkSync(filePath);

//     res.status(200).json({
//       message: 'Resume uploaded successfully',
//       atsScore: score
//     });

//   } catch (err) {
//     console.error('Resume upload error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;








// // --------------------------------------------- Pre Final Version (PDF Come but not Save)---------------------------------------------

// const express = require('express');
// const multer = require('multer');
// const pdf = require('pdf-parse');
// const fs = require('fs');
// const path = require('path');
// const mammoth = require('mammoth');
// const { analyzeATS } = require('../utils/atsAnalyzer');

// const router = express.Router();

// // 1️⃣ Set uploads folder inside src
// const uploadDir = path.join(__dirname, '../uploads'); // backend/src/uploads
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // 2️⃣ Configure Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });
// const upload = multer({ storage });

// // 3️⃣ Upload & analyze resume
// router.post('/upload', upload.single('resume'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     const filePath = req.file.path;
//     let resumeText = '';

//     // 4️⃣ Parse file based on type
//     if (req.file.mimetype === 'application/pdf') {
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdf(dataBuffer);
//       resumeText = pdfData.text;
//     } else if (
//       req.file.mimetype ===
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     ) {
//       const dataBuffer = fs.readFileSync(filePath);
//       const result = await mammoth.extractRawText({ buffer: dataBuffer });
//       resumeText = result.value;
//     } else {
//       return res.status(400).json({ message: 'Unsupported file type. Use PDF or DOCX.' });
//     }

//     // 5️⃣ Analyze resume (ATS scoring)
//     const score = await analyzeATS(resumeText);

//     // 6️⃣ Optional: delete uploaded file to keep server clean
//     fs.unlinkSync(filePath);

//     res.status(200).json({
//       message: 'Resume uploaded successfully',
//       atsScore: score
//     });
//   } catch (err) {
//     console.error('Resume upload error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;







// --------------------------------------------- Final Version ---------------------------------------------
const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const { analyzeATS } = require('../utils/atsAnalyzer');

const router = express.Router();

// 1️⃣ Set uploads folder inside src
const uploadDir = path.join(__dirname, '../uploads'); // backend/src/uploads
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// 2️⃣ Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// 3️⃣ Upload & analyze resume
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const filePath = req.file.path;
    let resumeText = '';

    // 4️⃣ Parse file based on type
    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdf(dataBuffer);
      resumeText = pdfData.text;
    } else if (
      req.file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const dataBuffer = fs.readFileSync(filePath);
      const result = await mammoth.extractRawText({ buffer: dataBuffer });
      resumeText = result.value;
    } else {
      return res.status(400).json({ message: 'Unsupported file type. Use PDF or DOCX.' });
    }

    // 5️⃣ Analyze resume (ATS scoring)
    const score = await analyzeATS(resumeText);

    // ✅ Keep uploaded file (do NOT delete)
    // fs.unlinkSync(filePath); // Commented out to keep files

    res.status(200).json({
      message: 'Resume uploaded successfully',
      atsScore: score,
      filePath: `/uploads/${path.basename(filePath)}` // optional: frontend can access it
    });
  } catch (err) {
    console.error('Resume upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
