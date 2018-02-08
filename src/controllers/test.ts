import { Request, Response } from "express";
import { Song } from "../models/Song";


/**
 * GET /test
 * test api endpoint
 */
export let getTest = (req: Request, res: Response) => {
  const song: Song = new Song({
    title: "never gonna give you up",
    artist: "rick astley"
  });

  res.send(song);
};

export let postTest = (req: Request, res: Response) => {
  req.checkBody("x", "must include a field in the body named 'x'").exists();
  req.checkBody("y", "must include a field in the body named 'y'").exists();
  req.checkBody("y", "field y must be at least 4 characters long").len({ min: 4 });
  req.checkBody("z", "must include a field in the body named 'z'").exists();

  const errors = req.validationErrors();
  if (errors)
    res.send(errors).status(400);
  else
    res.send("nice");
};
