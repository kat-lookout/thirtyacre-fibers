export default function Container({ children, className }) {
    className = (className === undefined) ? '' : className;
    return <div className={`container mx-auto px-5 ${className}`}>{children}</div>
}