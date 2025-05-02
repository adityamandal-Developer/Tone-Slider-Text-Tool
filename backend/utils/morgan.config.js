import morgan from "morgan"

morgan.token('body', (req) => JSON.stringify(req.body));
export const customFormat = ':method :url status - :status length - :res[content-length] respose time - :response-time ms body - :body';