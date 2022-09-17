import React from "react";
const TitleComponent = (props) => {
    let TagName = `h${ props.level || 1 }`;
    return (
        <React.Fragment>
            <TagName {...props}></TagName>
        </React.Fragment>
    )
}
export default TitleComponent;