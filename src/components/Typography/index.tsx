
interface TypographyProps {
    children: React.ReactNode;
    className?: string;
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export const Typography = ({ variant, className, children }: TypographyProps) => {
    const Component = variant;
    return (
            <Component className={className}>
                {children}
            </Component>
    )
}