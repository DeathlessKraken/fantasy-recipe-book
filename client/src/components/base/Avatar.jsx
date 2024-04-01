export default function Avatar(props) {
    const { className, width='75px', height=width, src='', alt='' } = props;

    return (
        <img 
            src={src} 
            alt={alt} 
            className={className}
            style={{
                width: width, 
                height: height,
                borderRadius: '50%',
                border: '3px solid var(--primary-color)',
            }} 
        />
    );
}