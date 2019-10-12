import React from "react";
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiSpacer,
    EuiPageContentBody,
    EuiTextAlign,
    EuiTextColor,
    EuiText
  } from '@elastic/eui';
import { FiCloudLightning } from "react-icons/fi";

export default class extends React.Component {
    
    render() {
        return (
            <div>
                <EuiSpacer size="xl" />
                <EuiFlexGroup justifyContent="spaceAround">
                    <EuiFlexItem grow={false}>
                        <EuiPageContentBody>
                            <EuiText size="s">
                                <EuiTextAlign textAlign="center">
                                    <h1 className="text-weight-bold">
                                        <EuiTextColor color="warning"><FiCloudLightning /> </EuiTextColor>
                                        <EuiTextColor>Weatherly</EuiTextColor>
                                    </h1>
                                </EuiTextAlign>
                            </EuiText>
                        </EuiPageContentBody>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
        );
            
    }
}