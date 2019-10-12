import React, { Fragment } from "react";
import { EuiEmptyPrompt } from '@elastic/eui';
import Store from "../contextStore";

export default class extends React.Component {
    static contextType = Store;

    render() {
        const { result } = this.context.state;

        if( !result || ( result && result.cod !== "404" )) return null;

        return(
            <EuiEmptyPrompt 
                iconType="editorStrike"
                title={<h2>City Not Found</h2>}
                body={
                    <Fragment>
                        <p>Try searching a different city</p>
                    </Fragment>
                }
            />
        );
    }
}