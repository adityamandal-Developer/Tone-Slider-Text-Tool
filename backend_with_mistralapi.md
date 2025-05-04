# Documentation - Mistral API Integration with Prompt Engineering

## Overview

This demonstrates how i have integrate the Mistral AI API for generating responses based on user input using prompt engineering.

## Features

- **Mistral API Integration**: Communicates with the Mistral API to fetch responses based on prompts.
- **Prompt Engineering**: Custom prompts are crafted to adjust the tone and content style of the AI’s response.
- **Dynamic Message Handling**: Combines user input with pre-defined message templates for contextual responses.

## How It Works

### Mistral API Request

```javascript
export const toneChanger = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = await mistralResponse(
    handlePrompts(req.body, messagesWithTones(req.body.tone))
  );

  if (data.error || data.success == false) {
    res.status(400);
    return next(new Error("something went wrong Mistral AI"));
  }

  return res.send({ message: data.choices[0].message.content, data: data });
};
```

This function, `toneChanger`, calls the `mistralResponse` function after validating all the errors. It calls the `mistralResponse` function with the parameters returned by `handlePrompts` function, it again takes two parameters `req.body` and `messagesWithTones(req.body.tone)` now let's see what does `handlePrompts` function first do then i will explain role of `messagesWithTones(req.body.tone)`

The `handlePrompts` returns back the changed body with the premade set of messages, it takes two arguement the `body` which comes from frontend and `messages` which is a set of **PREMADE** messages to send with the `body` comming from frontend, It then _spreads_ both the messages to a new variable `newMessages`.
Then i create a new body with these `newMessages` and return back the `newbody`

```javascript
export const handlePrompts = (body, messages) => {
  //body => frontend, messages -> premade
  const newMessages = [...messages, ...body.messages];
  const newbody = {
    model: body.model,
    messages: newMessages,
  };
  return newbody;
};
```

Now what does `messagesWithTones` do? it takes one parameter which is the **tone**, and returns **PREMADE** set of messages with the **tone**, now with this changed **tone** the full propmt of the last `content` will look like for example `change the tone of this text to 40% causal 30% formal` which will later pass on in `handlePrompts` **(messages parameter)**

```javascript
export const messagesWithTones = (tone) => {
  return [
    {
      role: "user",
      content:
        "Return only the plain paragraph-formatted text, as if it's being typed directly into an email editor or .txt file. Do not return escape sequences like \n or including response like Sure, I'd be happy to help with that. Your output must be 100% directly copy-pastable into Word or email",
    },
    {
      role: "user",
      content: "do not ask for additional info",
    },
    {
      role: "user",
      content: `change the tone of this text to ${tone}`,
    },
  ];
};
```

Now from the frontend i will get respose like (for example)

```json
{
  "model": "mistral-small-latest",
  "tone": "100% professional",
  "messages": [
    {
      "role": "user",
      "content": "come to office"
    }
  ]
}
```

now with the help of `handlePrompts` function this respose will be converted to ->

```json
{
  "model": "mistral-small-latest",
  "messages": [
    {
      "role": "user",
      "content": "come to office"
    },
    {
      "role": "user",
      "content": "Return only the plain paragraph-formatted text, as if it's being typed directly into an email editor or .txt file. Do not return escape sequences like \n or including response like Sure, I'd be happy to help with that. Your output must be 100% directly copy-pastable"
    },
    {
      "role": "user",
      "content": "do not ask for additional info"
    },
    {
      "role": "user",
      "content": "change the tone of this text to 100% professional"
    }
  ]
}
```

- after getting the above from `handlePrompts` this will now pass as a `body` parameter in `mistralResponse` function.

```javascript
export const mistralResponse = async (body) => {
  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

- this `mistralResponse` function takes the body and returns back the generated respsonse from the mistral api.

```javascript
const data = await mistralResponse(
  handlePrompts(req.body, messagesWithTones(req.body.tone))
);

if (data.error || data.success == false) {
  res.status(400);
  return next(new Error("something went wrong Mistral AI"));
}

return res.send({ message: data.choices[0].message.content, data: data });
```

now the respose comming from `mistralResponse` is in the `data` variable and now we can access this and send it back to frontend

But why choose **prompt engineering** ?
it's because all the current ai orgs like bold.new, lovable.dev and etc use similer approach they have a set of premade prompts and then they append these sets of prompts to the users prompt, sends it to the ai and gets back the response, this approch is simple yet affecive

I hope these documentation helped explaning the code
