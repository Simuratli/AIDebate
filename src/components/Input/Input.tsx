import { InputPropTypes } from "./Input.types";
import '../../style/components/input.scss'
const Input = ({ onChange, placeholder, value }: InputPropTypes) => {
    return <div className="input__container">
        <input className="input" onChange={onChange} placeholder={placeholder} value={value} />
    </div>;
};

export default Input;
