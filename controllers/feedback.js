// const { customerModal } = require("../modal/contact")
var nodemailer = require('nodemailer');
const path = require('path');
const feedBack = async (req,res,next) => {
    const savedData = 'Message Send'

    const emailContent = `
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333;
              }
              .container {
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                max-width: 600px;
                margin: auto;
                background-color: #f9f9f9;
              }
              h2 {
                color: #0056b3;
              }
              .info {
                font-size: 16px;
                margin-top: 10px;
              }
              .message {
                font-style: italic;
                background: #eee;
                padding: 10px;
                border-radius: 5px;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>New Inquiry from ${req.body.username}</h2>
              <p class="info"><strong>Name:</strong> ${req.body.username}</p>
              <p class="info"><strong>Email:</strong> ${req.body.email}</p>
              <p class="info"><strong>Subject:</strong> ${req.body.subject}</p>
              <p class="info"><strong>Mobile No:</strong> ${req.body.phone}</p>
              <p class="info"><strong>Message:</strong></p>
              <p class="message">"${req.body.message}"</p>
              <p>Kindly reach out to them at your earliest convenience.</p>
              <br>
              <p>Best regards,<br><strong>Vinayak Constructions</strong></p>
            </div>
          </body>
          </html>
        `;


        const seeYouSoon = `
            <html>
            <body>
              <div>
                <p>Hello ${req.body.username},</p>
                <p>Thank you for reaching out to Vinayak Constructions. We will get back to you soon!</p>
              </div>

              <!-- Include Footer Here -->
              <footer style="background: #f4f4f4; padding: 20px; text-align: center; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: auto;">
              <!-- Company Logo --> 
              <img src="cid:companylogo" style="width: 100px; margin-bottom: 10px;">
              
              <!-- Company Name -->
              <h3 style="color: #333; margin: 5px 0;">Vinayak Constructions</h3>
              
              <!-- Address -->
              <p style="color: #555; font-size: 14px; margin: 5px 0;">
                Flat no 101,Parsh Chhaya Apartment, Bal Mandir Road
                Bhimganjmandi, Kota, Rajasthan, 324002
              </p>

              <!-- Contact Info -->
              <p style="color: #555; font-size: 14px; margin: 5px 0;">
              📞 Vaibhav Saxena - +91 6376-635379 & 094133 50792
              📞 Ikramuddin khan - +91 94141 76392 & +91 861-9470159
              </p>

              <!-- Social Media Links -->
              <div style="margin-top: 10px;">
                <a href="https://facebook.com" style="text-decoration: none; margin: 0 5px;">
                  <img src="https://img.icons8.com/ios-filled/50/000000/facebook.png" alt="Facebook" width="25">
                </a>
                <a href="https://twitter.com" style="text-decoration: none; margin: 0 5px;">
                  <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter" width="25">
                </a>
                <a href="https://linkedin.com" style="text-decoration: none; margin: 0 5px;">
                  <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" width="25">
                </a>
              </div>

              <!-- Copyright -->
              <p style="color: #777; font-size: 12px; margin-top: 10px;">
                &copy; 2025 Vinayak Constructions. All Rights Reserved.
              </p>
            </div>
          </footer>
            </body>
            </html>
          `;
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',   
        port: 587,
        secure:false,
        auth: {
          user: 'vinayakconstructions9255@gmail.com',
          pass: process.env.PASSWORD
        }
      });
      var mailOptions = {
        from: 'Vinayakconstructions9255@gmail.com',
        to: req.body.email,
        subject: 'Thankyou for contacting us!',
        // text: `Hii ${req.body.username} thanks for contacting Us. I will touch you soon!`
        html:seeYouSoon,
        attachments: [
          {
            filename: 'logo.png',
            path: path.join(__dirname, '..', 'public', 'images', 'logo.png'),
            cid: 'companylogo', // Content ID referenced in the email
          },
        ],
      };
      var mailOptionsSender = {
        from: 'Vinayakconstructions9255@gmail.com',
        to: 'Vinayakconstructions9255@gmail.com',
        subject: `${req.body.username} Wants to connect With you !`,
        html:emailContent
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
            transporter.sendMail(mailOptionsSender, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
        }
      });
      res.json(savedData)
}
const GetDetails = async (req,res) => {
    console.log("message called");
    const message = "Api Called";
    res.json(message)
}

module.exports = {
    feedBack,
    GetDetails
}
