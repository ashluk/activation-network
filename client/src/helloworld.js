import GreeTee from "./greetee";
import Counter from "./counter";
export default function HelloWorld() {
    const firstName = "Ash";

    return (
        <div className="spiced">
            <div>
                hello <GreeTee name={firstName} />
            </div>
            <div>
                hello <GreeTee name="Fennel" />
            </div>
            <div>
                hello <GreeTee />
            </div>
            <div>
                hello <Counter />
            </div>
        </div>
    );
}
