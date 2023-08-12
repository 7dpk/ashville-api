// create a middleware function to check if the user has passed a password in the request and if it matches the password in the .env file
// process.env.PASS
// make the middleware function available to the rest of the application
import { Request, NextFunction, Response } from "express"

export const auth = (req: Request, res: Response, next: NextFunction) => {
    let pass = req.body.password as string
    if (!pass) {
        res.status(401).send({error: "Password is required"})
        return
    }
    if (pass !== process.env.PASS) {
        res.status(403).send({error: "Wrong Password!!"})
        return
    }
    next()
}
