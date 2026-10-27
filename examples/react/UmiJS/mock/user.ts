import mockjs from "mockjs";

export default {
    "GET /api/user": {
        code: 200,
        data: mockjs.mock({
            name: mockjs.mock("@cname()"),
            "age|20-40": 22,
            phone: mockjs.mock(/^1[3456789]\d{9}$/g),
            email: mockjs.mock('@email()'),
            avatar: mockjs.Random.image('64x64'),
        }),
        message: "success"
    }
}