export const handlePrompts = (body, messages) => {
    const newMessages = [...messages, ...body.messages]
    const newbody = {
        model: body.model,
        messages: newMessages
    }
    return newbody
}