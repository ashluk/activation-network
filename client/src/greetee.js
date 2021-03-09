export default function GreeTee(props) {
    //props -- info passed down from the parent will always be an object
    console.log("props in greetee", props);
    return <span>{props.name || "I AM RENDERED IF UNDEFINED"} </span>;
}
