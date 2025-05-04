export const handlePrompts = (body, messages) => { //body => frontend, messages -> premade
    const newMessages = [...messages, ...body.messages]
    const newbody = {
        model: body.model,
        messages: newMessages
    }
    return newbody
}