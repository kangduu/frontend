import React from "react";
export default () => {
    const [state, setState] = React.useState(0)
    return {
        state,
        setState
    }
}