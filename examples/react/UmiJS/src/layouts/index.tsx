import React from 'react';
import { FC } from "@umijs/renderer-react/node_modules/@types/react";
import { request } from 'umi';

const url: string = 'https://hn.algolia.com/api/v1/search';

const BasicLayout: FC = () => {
    const [data, setData] = React.useState({ hits: [] })

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await request(`${url}?page=${10}`)
            const { hits } = result
            setData({ hits })
        }

        fetchData()
    }, [])

    return <ul>
        {
            data.hits.map((item: any) => (<li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
            </li>))
        }
    </ul>
}

export default BasicLayout