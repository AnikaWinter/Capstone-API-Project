import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_key = "https://byabbe.se/on-this-day";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/get-events", async (req, res) => {
    const searchMonth = req.body.month;
    const searchDay = req.body.day;
    try{
        const result = await axios.get(API_key + "/" + searchMonth + "/" + searchDay + "/events.json");
        res.render("index.ejs", {
            events: result.data.events,
            month: searchMonth,
            day: searchDay
        });
    } catch (error) {
        res.render("index.ejs", {content: error.response.data});
    }
});

app.post("/get-births", async (req, res) => {
    const searchMonth = req.body.month;
    const searchDay = req.body.day;
    try{
        const result = await axios.get(API_key + "/" + searchMonth + "/" + searchDay + "/births.json");
        res.render("index.ejs", {
            births: result.data.births,
            month: searchMonth,
            day: searchDay
        });
    } catch (error) {
        res.render("index.ejs", {content: error.response.data});
    }
});

app.post("/get-deaths", async (req, res) => {
    const searchMonth = req.body.month;
    const searchDay = req.body.day;
    try{
        const result = await axios.get(API_key + "/" + searchMonth + "/" + searchDay + "/deaths.json");
        res.render("index.ejs", {
            deaths: result.data.deaths,
            month: searchMonth,
            day: searchDay
        });
    } catch (error) {
        res.render("index.ejs", {content: error.response.data});
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});