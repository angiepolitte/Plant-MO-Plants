import { useGlobalData } from "../context/GlobalDataProvider";



export default function ExampleOne() {
    const { messageExOne } = useGlobalData();

    return (
        <div>
            <p>{messageExOne}</p>
        </div>
    );

    
}