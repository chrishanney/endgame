export default function Key(props) {
    const styles = {
        backgroundColor: props.isPressed ? "#323232" : "#FCBA29"
    }

    return (
        <button className="keyboard-key" style={styles} key={props.value} onClick={props.toggleKey}>{props.value} </button>
    )
}