import React from 'react'

interface Props {
    formState: {};
}

const SubmittedFormPanel: React.FC<Props> = ({ formState }) => {
    return (
        <div>
            {JSON.stringify(formState)}
        </div>
    )
}

export default SubmittedFormPanel;