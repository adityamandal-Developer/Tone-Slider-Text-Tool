import { validationResult } from "express-validator"
import { mistralResponse } from "../utils/call-mistral.js"
import { handlePrompts } from "../utils/handle-prompts.js"
import { messagesWithTones } from "../utils/prompts.js"

export const toneChanger = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const data = await mistralResponse(handlePrompts(req.body, messagesWithTones(req.body.tone)))

    if (data.error || data.success == false) {
        res.status(400)
        return next(new Error("something went wrong Mistral AI"))
    }

    return res.send({ message: data.choices[0].message.content, data: data })
}