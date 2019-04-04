import React from 'react';
import { Card, Heading, Paragraph, Image }  from 'reakit';

export default ({
    title,
    imgUrl,
    text
}) => (
    <Card>
        <Heading use="h3">{title}</Heading>
        <Card.Fit
            use={Image}
            src={imgUrl}
            alt="Flag"
            width={300}
            height={300}
        />
        <Paragraph>{text}</Paragraph>
    </Card>
);