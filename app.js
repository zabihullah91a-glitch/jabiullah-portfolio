import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

import portfolioData from "./src/controllers/myPortfolioData.js";

const app = express();


// ===============================
// PATH SETUP
// ===============================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.join(__dirname, "src", "static");
const viewsPath = path.join(__dirname, "src", "views");


// ===============================
// MIDDLEWARE
// ===============================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ===============================
// STATIC FILES
// ===============================

app.use(
    "/css",
    express.static(path.join(staticPath, "css"))
);

app.use(
    "/js",
    express.static(path.join(staticPath, "js"))
);

app.use(
    "/images",
    express.static(path.join(staticPath, "images"))
);


// ===============================
// RESUME
// ===============================

app.use(
    "/resume",
    express.static(
        path.join(staticPath, "resume")
    )
);


// ===============================
// EJS SETUP
// ===============================

app.set("view engine", "ejs");
app.set("views", viewsPath);


// ===============================
// HOME PAGE
// ===============================

app.get("/", (req, res) => {

    res.render("home", {
        portfolio: portfolioData
    });

});


// ===============================
// JABIULLAH PAGE
// ===============================

app.get("/jabiullah", (req, res) => {

    res.render("home", {
        portfolio: portfolioData
    });

});


// ===============================
// RESUME DOWNLOAD
// ===============================

app.get("/resume/Jabiullah_Resume.pdf", (req, res) => {

    res.sendFile(
        path.join(
            staticPath,
            "resume",
            "Jabiullah_Resume.pdf"
        )
    );

});


// ===============================
// CONTACT FORM
// ===============================

app.post("/contact", async (req, res) => {

    const {
        name,
        email,
        subject,
        message
    } = req.body;


    try {

        // Gmail transporter
        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }

        });


        // Send email
        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `Portfolio Contact: ${subject}`,

            html: `

                <h2>New Portfolio Message</h2>

                <p>
                    <strong>Name:</strong>
                    ${name}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${email}
                </p>

                <p>
                    <strong>Subject:</strong>
                    ${subject}
                </p>

                <p>
                    <strong>Message:</strong>
                </p>

                <p>
                    ${message}
                </p>

            `

        });


        // Success response
        res.send(`

            <html>

                <head>

                    <title>Message Sent</title>

                    <style>

                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            padding-top: 100px;
                            background: #f5f5f5;
                        }

                        h1 {
                            color: #222;
                        }

                        p {
                            color: #555;
                            font-size: 18px;
                        }

                        a {
                            display: inline-block;
                            margin-top: 20px;
                            padding: 12px 25px;
                            background: #111;
                            color: white;
                            text-decoration: none;
                            border-radius: 8px;
                        }

                    </style>

                </head>

                <body>

                    <h1>Thank You, ${name}! 🎉</h1>

                    <p>
                        Your message has been sent successfully.
                    </p>

                    <a href="/">
                        Back to Portfolio
                    </a>

                </body>

            </html>

        `);

    } catch (error) {

        console.error("Email Error:", error);


        // Error response
        res.status(500).send(`

            <html>

                <head>

                    <title>Email Error</title>

                    <style>

                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            padding-top: 100px;
                            background: #f5f5f5;
                        }

                        h1 {
                            color: #d32f2f;
                        }

                        p {
                            color: #555;
                            font-size: 18px;
                        }

                        a {
                            display: inline-block;
                            margin-top: 20px;
                            padding: 12px 25px;
                            background: #111;
                            color: white;
                            text-decoration: none;
                            border-radius: 8px;
                        }

                    </style>

                </head>

                <body>

                    <h1>Something went wrong! ❌</h1>

                    <p>
                        Your message could not be sent.
                    </p>

                    <a href="/">
                        Back to Portfolio
                    </a>

                </body>

            </html>

        `);

    }

});


// ===============================
// 404 PAGE
// ===============================

app.use((req, res) => {

    res.status(404).send("Page Not Found");

});


// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `PORTFOLIO SERVER: http://localhost:${PORT}`
    );

});