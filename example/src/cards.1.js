import React from 'react';
import { Card, Heading, Paragraph, Image }  from 'reakit';

export default (props) => (
    <Card>
        <Heading use="h3">{props.capital}</Heading>

        <Paragraph>{props.country}</Paragraph>
    </Card>
);