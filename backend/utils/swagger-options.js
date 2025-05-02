export const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Textie Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Textie",
                url: "http://tone-slider-text-tool.vercel.app/",
                email: "mandaladitya901@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

