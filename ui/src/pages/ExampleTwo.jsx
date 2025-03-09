import { useGlobalData } from "../context/GlobalDataProvider";



export default function ExampleTwo() {
    const { messageExTwo } = useGlobalData();

    return (
        <div>
            <p>{messageExTwo}</p>
        </div>
    );
}