const Title = ({ Type = "h1", text, className }) => {
    return (
        <Type className={className}>
            {text}
        </Type>
    );
};

export default Title;