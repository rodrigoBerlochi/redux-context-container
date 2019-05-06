import { ExampleContainer, withExampleContext } from './container';

// presentational component
const Header = ({text}) => {
    return (
        <h1>{text}</h1>
    );
}

const Img = ({url}) => (
    <img src={url} />
);

const Text = ({text}) => (
    <p>{text}</p>
);

const Card = ({children}) => (
    <div>
        {children}
    </div>
);

const HeaderCountry = withExampleContext(Header);
const ImgCountry = withExampleContext(Img);
const TextCountry = withExampleContext(Text);

const CountryCard = () => {
    return (
        <Card>
            <HeaderCountry />
            <ImgCountry />
            <TextCountry />
        </Card>
    );
};

export default () => {
    return (
    <ExampleContainer>
        <CountryCard />
    </ExampleContainer>
    )
}