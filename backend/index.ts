import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = "3000" || process.env.PORT;

app.use(cors());

app.get("/hello", (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.send("<h1>No greeting for anonymos!</h1>");
  }

  if (username === "Rahaf") {
    return res.send(`<h1>Hello Boss  ${username}</h1>` );
  } else {
    return res.send( `<h1>Hello ${username}</h1>`);
  }

  // const html = "<h1>Hello World!</h1>";
  // res.send(html);
});

app.get("/", (req: Request, res: Response) => {
  const username: any = req.query.username;

  if (!username) {
    return res.json({ message: "No greeting for anonymos!" });
  }

  if (username === "Rahaf") {
    return res.json({ message: "Hello Boss " + username });
  } else {
    res.json({ message: "Hello " + username });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
