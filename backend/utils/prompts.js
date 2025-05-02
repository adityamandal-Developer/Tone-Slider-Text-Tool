export const messagesWithTones = (tone) => {
    return [
        {
            role: "user",
            content: "Return only the plain paragraph-formatted text, as if it's being typed directly into an email editor or .txt file. Do not return escape sequences like \n or including response like Sure, I'd be happy to help with that. Your output must be 100% directly copy-pastable into Word or email"
        },
        {
            role: "user",
            content: "do not ask for additional info"
        },
        {
            role: "user",
            content: `make this ${tone}`
        }
    ]
}