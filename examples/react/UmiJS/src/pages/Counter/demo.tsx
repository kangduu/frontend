import React from 'react';

interface IProps {
    name: string
}

const Demo: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = React.useState<number>(100);
    const ref = React.useRef<{ name: string } | HTMLElement | null>({ name: 'ref' })

    return <>

    </>
}
export default Demo