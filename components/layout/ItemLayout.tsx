interface Props {
    children: JSX.Element;
}

export default function ({ children }: Props) {
    return (
        <div style={{ width: "100%", margin: "60px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {children}
        </div>
    )
}