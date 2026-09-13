import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import portfolioData from "./src/controllers/myPortfolioData.js";

const app = express();


// ========================================
// PATH SETUP
// ========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.join(__dirname, "src", "static");
const viewsPath = path.join(__dirname, "src", "views");


// ========================================
// MIDDLEWARE
// ========================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ========================================
// STATIC CSS
// ========================================

app.use(
    "/css",
    express.static(
        path.join(staticPath, "css")
    )
);


// ========================================
// STATIC JAVASCRIPT
// ========================================

app.use(
    "/js",
    express.static(
        path.join(staticPath, "js")
    )
);


// ========================================
// STATIC IMAGES
// ========================================

app.use(
    "/images",
    express.static(
        path.join(staticPath, "images")
    )
);
// ========================================
// STATIC RESUME
// ========================================

app.use(
    "/resume",
    express.static(
        path.join(staticPath, "resume")
    )
);

// ========================================
// EJS
// ========================================

app.set("view engine", "ejs");

app.set("views", viewsPath);


// ========================================
// HOME
// ========================================

app.get("/", (req, res) => {

    res.render("home", {
        portfolio: portfolioData
    });

});


// ========================================
// JABIULLAH
// ========================================

app.get("/jabiullah", (req, res) => {

    res.render("home", {
        portfolio: portfolioData
    });

});
app.get("/resume-test", (req, res) => {
    res.send("RESUME ROUTE WORKING");
});
// ========================================
// RESUME PDF
// ========================================

app.get("/resume/Jabiullah_Resume.pdf", (req, res) => {

    res.sendFile(
        path.join(
            staticPath,
            "resume",
            "Jabiullah_Resume.pdf"
        )
    );

});

// ========================================
// 404
// ========================================

app.use((req, res) => {

    res.status(404).send("Page Not Found");

});


// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `PORTFOLIO SERVER: http://localhost:${PORT}`
    );

});