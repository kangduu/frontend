import React from "react";

const useTogglerModel: Function = (initialState: boolean): [boolean, Function] => {
    const [value, setValue] = React.useState(initialState)
    const toggleValue = React.useCallback(() => setValue(pre => !pre), [])

    return [value, toggleValue]
}

export default useTogglerModel