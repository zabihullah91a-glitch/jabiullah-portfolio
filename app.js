import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import portfolioData from "./src/controllers/myPortfolioData.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.join(__dirname, "src", "static");
const viewsPath = path.join(__dirname, "src", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/css", express.static(path.join(staticPath, "css")));
app.use("/js", express.static(path.join(staticPath, "js")));
app.use("/images", express.static(path.join(staticPath, "images")));

app.use(
    "/resume",
    express.static(path.join(staticPath, "resume"))
);

app.set("view engine", "ejs");
app.set("views", viewsPath);
// SITEMAP
app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");

    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url>
        <loc>https://jabiullah-portfolio.onrender.com/</loc>
    </url>

</urlset>`);
});

// HOME PAGE
app.get("/", (req, res) => {
    res.render("home", {
        portfolio: portfolioData
    });
});


// SECOND HOME URL
app.get("/jabiullah", (req, res) => {
    res.render("home", {
        portfolio: portfolioData
    });
});


// RESUME
app.get("/resume/Jabiullah_Resume.pdf", (req, res) => {
    res.sendFile(
        path.join(
            staticPath,
            "resume",
            "Jabiullah_Resume.pdf"
        )
    );
});
app.get("/certificate/Invigo_Internship_Acceptance_Letter.pdf", (req, res) => {
    res.sendFile(
        path.join(
            staticPath,
            "certificates",
            "Invigo_Internship_Acceptance_Letter.pdf"
        )
    );
});

// CONTACT FORM
// FormSubmit handles the email,
// so Express does not need a /contact POST route.


app.use((req, res) => {
    res.status(404).render("404");
});


// SERVER
const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `PORTFOLIO SERVER: http://localhost:${PORT}`
    );
});