
import express from "express";
import { toneChanger } from "../service/tone-changer.js";
import { validateCoreRequest } from "../validator/core.validator.js";
const router = express.Router()

router.post('/tone-changes', validateCoreRequest, toneChanger)
export default router
/**
 * @swagger
 * tags:
 *   - name: textTone
 *     description: API for changing the tone of text using Mistral AI
 * 
 * /change-tone:
 *   post:
 *     summary: Change the tone of input text using Mistral AI
 *     tags: [textTone]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - model
 *               - messages
 *             properties:
 *               model:
 *                 type: string
 *                 description: Mistral model to use
 *                 example: "mistral-small-latest"
 *               messages:
 *                 type: array
 *                 description: Array of message objects for chat input
 *                 items:
 *                   type: object
 *                   required:
 *                     - role
 *                     - content
 *                   properties:
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     content:
 *                       type: string
 *                       example: "Your message"
 *     responses:
 *       200:
 *         description: AI-generated response with adjusted tone
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 object:
 *                   type: string
 *                 created:
 *                   type: integer
 *                 model:
 *                   type: string
 *                 choices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       index:
 *                         type: integer
 *                       message:
 *                         type: object
 *                         properties:
 *                           role:
 *                             type: string
 *                           content:
 *                             type: string
 *                       finish_reason:
 *                         type: string
 *                 usage:
 *                   type: object
 *                   properties:
 *                     prompt_tokens:
 *                       type: integer
 *                     completion_tokens:
 *                       type: integer
 *                     total_tokens:
 *                       type: integer
 *       400:
 *         description: Bad Request - Invalid model or message format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 object:
 *                   type: string
 *                 message:
 *                   type: string
 *                 type:
 *                   type: string
 *                 param:
 *                   type: string
 *                   nullable: true
 *                 code:
 *                   type: string
 *                 request_id:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
