import mockjs from "mockjs";

export default {
    "GET /api/tags": mockjs.mock({
        'list|100': [{ name: "@city", 'value|1-1000': 50, 'type|0-2': 1 }]
    }),
    "/api/currentUserDetail": mockjs.mock({
        code: 200,
        loading: false,
        data: {
            name: mockjs.mock('@cname'),
            avatar: mockjs.Random.image('64x64'),
            signature: mockjs.mock('@csentence'),
            email: mockjs.mock('@email()'),
            title: mockjs.mock('@ctitle'),
            address: mockjs.mock('@city(true)'),
            'tags|5-10': [{
                key: '@id()',
                label: '@word()'
            }],
            country: "中国",
            phone: mockjs.mock(/^1[3456789]\d{9}$/g)
        },
        message: "success"
    })
}