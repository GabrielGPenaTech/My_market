import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

interface Button extends TouchableOpacityProps {
    text: string
}


export function Button({ text, ...rest }: Button) {
    return (
        <TouchableOpacity 
            style={styles.container} 
            {...rest}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}