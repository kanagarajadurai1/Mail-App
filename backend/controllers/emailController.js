const nodemailer = require('nodemailer');
const Email = require('../models/Email');

// POST /api/emails/send
exports.sendEmail = async (req, res) => {
  const { subject, body, recipients } = req.body;

  if (!subject || !body || !recipients || !recipients.length) {
    return res.status(400).json({ message: 'Subject, body, and recipients are required' });
  }

  try {
    // Auto-creates a free test account - no Gmail setup needed!
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"BulkMail App" <bulkmail@demo.com>',
      to: recipients.join(', '),
      subject,
      html: body,
    });

    const previewURL = nodemailer.getTestMessageUrl(info);
    console.log('✅ Email sent! View it at:', previewURL);

    const email = await Email.create({ subject, body, recipients, status: 'sent' });

    res.status(200).json({
      message: `✅ Email sent to ${recipients.length} recipient(s)!`,
      previewURL,
      email,
    });

  } catch (err) {
    console.error('❌ Send error:', err.message);
    await Email.create({ subject, body, recipients, status: 'failed' });
    res.status(500).json({ message: '❌ Failed to send email', error: err.message });
  }
};

// GET /api/emails/history
exports.getHistory = async (req, res) => {
  try {
    const emails = await Email.find().sort({ sentAt: -1 });
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};