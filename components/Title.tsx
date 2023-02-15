interface TitleProps {
    text1: string;
    text2: string;
}

export default function Title({ text1, text2 }: TitleProps) {
    return (
        <h3 style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", columnGap: "14px"}}>
            <span style={{ fontSize: "35px" }}>{text1}</span>
            <span>{text2}</span>
        </h3>
    )
}